/**
 * dm18-migration-check — GitHub Action entry point.
 *
 * Runs verify's existing migration pipeline against a PR's changed files,
 * post-filters findings to DM-18 only, and posts a PR comment that leads
 * with the calibrated precision claim.
 *
 * This file is a thin distribution shell around verify/src/action/migration-check.
 * Do not reimplement DM-18 here. Do not carve DM-18 out of the gate's internal
 * logic. The post-filter is the correct integration point: verify's gate runs
 * all safety checks, we read the ones tagged shapeId === 'DM-18', and the rest
 * are silently dropped because that is this tool's scope.
 */
import { detectMigrationFiles } from '../verify/src/action/migration-check.js';
import type { MigrationGroup } from '../verify/src/action/migration-check.js';
import {
  getPRFiles,
  getPRMetadata,
  getFileContent,
  postPRComment,
} from '../verify/src/action/github.js';
import { parseMigration } from '../verify/scripts/mvp-migration/spec-from-ast.js';
import {
  createEmptySchema,
  applyMigrationSQL,
} from '../verify/scripts/mvp-migration/schema-loader.js';
import { runGroundingGate } from '../verify/scripts/mvp-migration/grounding-gate.js';
import { runSafetyGate } from '../verify/scripts/mvp-migration/safety-gate.js';
import { loadModule } from 'libpg-query';
import type { MigrationFinding, Schema } from '../verify/src/types-migration.js';
import { formatDm18Comment } from './dm18-comment.js';

type TaggedFinding = MigrationFinding & { file: string };

/**
 * Thin re-implementation of verify's per-file check loop. Upstream's
 * checkMigrations flattens findings across all files without preserving
 * the originating file path on each finding. For the standalone tool's
 * PR comment we need file per finding, so we run the same helpers
 * (parseMigration / runGroundingGate / runSafetyGate / applyMigrationSQL)
 * directly and tag each emitted finding with its source file as we go.
 *
 * The gate/rule behavior is identical to upstream — we are not forking
 * the rules. We are only attaching the per-finding file provenance.
 */
async function runDm18OnGroups(groups: MigrationGroup[]): Promise<{
  findings: TaggedFinding[];
  filesChecked: string[];
}> {
  await loadModule();
  const findings: TaggedFinding[] = [];
  const filesChecked: string[] = [];

  for (const group of groups) {
    // Bootstrap schema from prior migrations in this root.
    const schema: Schema = createEmptySchema();
    for (const priorSql of group.priorMigrationsSql) {
      try {
        applyMigrationSQL(schema, priorSql);
      } catch {
        /* bootstrap errors are recoverable — continue with whatever we have */
      }
    }

    // Check each new file in order.
    for (const file of group.newFiles) {
      filesChecked.push(file.path);
      try {
        const spec = parseMigration(file.sql, file.path);
        if (spec.meta.parseErrors.length > 0) continue;
        const grounding = runGroundingGate(spec, schema);
        const safety = runSafetyGate(spec, schema);
        for (const f of [...grounding, ...safety]) {
          findings.push({ ...f, file: file.path });
        }
        try {
          applyMigrationSQL(schema, file.sql);
        } catch {
          /* advance errors do not block later files */
        }
      } catch {
        /* skip unparseable file */
      }
    }
  }

  return { findings, filesChecked };
}

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

function env(name: string, fallback = ''): string {
  return process.env[name] ?? fallback;
}

function boolEnv(name: string, fallback: boolean): boolean {
  const v = process.env[name];
  if (v === undefined) return fallback;
  return v === 'true' || v === '1';
}

// ---------------------------------------------------------------------------
// Migration root computation — matches verify/src/action/index.ts exactly
// so the two tools produce the same grouping for the same PR.
// ---------------------------------------------------------------------------

function migrationRoot(p: string): { root: string; isPrisma: boolean } {
  if (/\/migration\.sql$/i.test(p)) {
    return { root: p.replace(/\/[^/]+\/migration\.sql$/i, ''), isPrisma: true };
  }
  return { root: p.replace(/\/[^/]+$/, ''), isPrisma: false };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run(): Promise<void> {
  const token =
    env('GITHUB_TOKEN') || env('INPUT_TOKEN') || '';
  const commentEnabled = boolEnv('INPUT_COMMENT', true);
  const failOn = (env('INPUT_FAIL_ON') || env('INPUT_FAIL-ON') || 'error').toLowerCase();

  const eventPath = env('GITHUB_EVENT_PATH');
  if (!eventPath) {
    console.log('::error::Not running in GitHub Actions context (GITHUB_EVENT_PATH not set)');
    process.exit(1);
  }

  const { readFileSync } = await import('node:fs');
  const event = JSON.parse(readFileSync(eventPath, 'utf-8'));
  const prNumber: number | undefined = event.pull_request?.number ?? event.number;
  const [owner, repo] = (env('GITHUB_REPOSITORY') || '').split('/');

  if (!prNumber || !owner || !repo) {
    console.log('::error::Could not determine PR number or repository');
    process.exit(1);
  }
  if (!token) {
    console.log(
      '::error::No GitHub token provided. Set GITHUB_TOKEN or use permissions: pull-requests: write, contents: read',
    );
    process.exit(1);
  }

  console.log(`dm18-migration-check: PR #${prNumber} in ${owner}/${repo}`);

  // ── Phase 1: detect migration files in the PR ────────────────────────────
  let migrationPaths: string[] = [];
  try {
    const prFiles = await getPRFiles(token, owner, repo, prNumber);
    migrationPaths = detectMigrationFiles(prFiles.map((f) => f.filename));
  } catch (err: any) {
    console.log(`::error::Could not list PR files: ${err.message}`);
    process.exit(1);
  }

  if (migrationPaths.length === 0) {
    console.log('No migration files in this PR. Nothing to check.');
    return;
  }

  console.log(`Found ${migrationPaths.length} migration file(s)`);

  // ── Phase 2: build groups + bootstrap from base SHA ──────────────────────
  let taggedFindings: TaggedFinding[] = [];
  try {
    const metadata = await getPRMetadata(token, owner, repo, prNumber);
    const baseRef = metadata.baseSha || metadata.baseBranch;
    console.log(
      `Schema pin: ${
        metadata.baseSha ? `base SHA ${metadata.baseSha.slice(0, 7)}` : `base branch ${metadata.baseBranch}`
      }`,
    );

    type RootInfo = { isPrisma: boolean; paths: string[] };
    const rootMap = new Map<string, RootInfo>();
    for (const p of migrationPaths) {
      const { root, isPrisma } = migrationRoot(p);
      const existing = rootMap.get(root);
      if (existing) existing.paths.push(p);
      else rootMap.set(root, { isPrisma, paths: [p] });
    }

    console.log(`Detected ${rootMap.size} migration root(s)`);

    const groups: MigrationGroup[] = [];
    for (const [root, info] of rootMap) {
      const priorSql: string[] = [];
      try {
        const dirRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(root)}?ref=${baseRef}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github.v3+json',
            },
          },
        );
        if (dirRes.ok) {
          const dirContents = (await dirRes.json()) as any[];
          if (info.isPrisma) {
            const priorDirs = dirContents
              .filter((f: any) => f.type === 'dir')
              .map((f: any) => f.path)
              .sort();
            for (const subdir of priorDirs) {
              const sqlPath = `${subdir}/migration.sql`;
              if (info.paths.includes(sqlPath)) continue;
              const sql = await getFileContent(token, owner, repo, sqlPath, baseRef);
              if (sql) priorSql.push(sql);
            }
          } else {
            const priorFiles = dirContents
              .filter((f: any) => f.name.endsWith('.sql') && f.type === 'file')
              .map((f: any) => f.path)
              .filter((p: string) => !info.paths.includes(p))
              .sort();
            for (const pf of priorFiles) {
              const sql = await getFileContent(token, owner, repo, pf, baseRef);
              if (sql) priorSql.push(sql);
            }
          }
        }
      } catch {
        /* directory listing failed — group bootstraps from empty schema */
      }

      const sortedPaths = [...info.paths].sort();
      const newFiles: Array<{ path: string; sql: string }> = [];
      for (const path of sortedPaths) {
        const content = await getFileContent(token, owner, repo, path, metadata.headSha);
        if (content) newFiles.push({ path, sql: content });
      }

      groups.push({ root, priorMigrationsSql: priorSql, newFiles });
      console.log(`  ${root}: ${priorSql.length} prior migration(s) for bootstrap`);
    }

    const runResult = await runDm18OnGroups(groups);
    taggedFindings = runResult.findings;
    console.log(
      `Gate run: ${taggedFindings.length} total finding(s) across all shapes`,
    );
  } catch (err: any) {
    // System-level error: the verifier could not run. Fail closed.
    console.log(`::error::Migration verifier failed to run: ${err.message}`);
    if (err.stack) console.log(err.stack);
    process.exit(1);
  }

  // ── Phase 3: post-filter to DM-18 only ──────────────────────────────────
  const dm18: TaggedFinding[] = taggedFindings.filter((f) => f.shapeId === 'DM-18');
  console.log(`dm18-migration-check: ${dm18.length} DM-18 finding(s) after filter`);

  // ── Phase 4: post comment ───────────────────────────────────────────────
  if (commentEnabled) {
    const body = formatDm18Comment(dm18, migrationPaths);
    if (body) {
      try {
        await postPRComment(token, owner, repo, prNumber, body);
        console.log('Comment posted.');
      } catch (err: any) {
        console.log(`::warning::Could not post PR comment: ${err.message}`);
      }
    }
  }

  // ── Phase 5: exit code ──────────────────────────────────────────────────
  if (failOn === 'none') {
    process.exit(0);
  }
  const hasError = dm18.some((f) => f.severity === 'error');
  const hasWarning = dm18.some((f) => f.severity === 'warning');
  if (failOn === 'error' && hasError) {
    console.log('::error::DM-18 error-severity findings present — failing check');
    process.exit(1);
  }
  if (failOn === 'warning' && (hasError || hasWarning)) {
    console.log('::error::DM-18 findings present — failing check (fail-on: warning)');
    process.exit(1);
  }
  process.exit(0);
}

run().catch((err) => {
  console.log(`::error::Unhandled: ${err?.message ?? err}`);
  if (err?.stack) console.log(err.stack);
  process.exit(1);
});
