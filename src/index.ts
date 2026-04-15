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

export type TaggedFinding = MigrationFinding & { file: string };

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
    // If a prior migration fails to parse or apply, the resulting schema is
    // partial and any finding (or missed finding) on subsequent files is no
    // longer backed by the calibration corpus. Surface a warning so the
    // reviewer can see the run degraded instead of silently trusting it.
    const schema: Schema = createEmptySchema();
    let priorIdx = 0;
    for (const priorSql of group.priorMigrationsSql) {
      priorIdx++;
      try {
        applyMigrationSQL(schema, priorSql);
      } catch (err: any) {
        console.log(
          `::warning::Schema bootstrap incomplete in ${group.root}: prior migration ` +
            `${priorIdx}/${group.priorMigrationsSql.length} failed to apply ` +
            `(${err?.message ?? 'unknown error'}). Findings on this group may be incomplete.`,
        );
      }
    }

    // Check each new file in order.
    for (const file of group.newFiles) {
      filesChecked.push(file.path);
      try {
        const spec = parseMigration(file.sql, file.path);
        if (spec.meta.parseErrors.length > 0) {
          console.log(
            `::warning::Could not parse ${file.path}: ${spec.meta.parseErrors[0]}. ` +
              `Skipping this file — DM-18 not checked here.`,
          );
          continue;
        }
        const grounding = runGroundingGate(spec, schema);
        const safety = runSafetyGate(spec, schema);
        for (const f of [...grounding, ...safety]) {
          findings.push({ ...f, file: file.path });
        }
        try {
          applyMigrationSQL(schema, file.sql);
        } catch (err: any) {
          console.log(
            `::warning::Schema state could not advance after ${file.path} ` +
              `(${err?.message ?? 'unknown error'}). Subsequent files in this group ` +
              `may produce incomplete findings.`,
          );
        }
      } catch (err: any) {
        console.log(
          `::warning::Failed to check ${file.path}: ${err?.message ?? 'unknown error'}. ` +
            `DM-18 not checked here.`,
        );
      }
    }
  }

  return { findings, filesChecked };
}

/**
 * Returns true if a finding has been suppressed by an in-file ack comment.
 *
 * Upstream verify (safety-gate.ts) does not delete acked findings — it
 * downgrades them to severity 'warning' and appends '[ACKED]' to the message.
 * The dm18-migration-check user contract is "ack suppresses the finding from
 * the PR comment and the merge gate," which means we filter on the [ACKED]
 * tag at this layer rather than asking upstream to change semantics.
 *
 * If upstream's ack format ever changes, this function is the single place
 * that needs to update.
 */
export function isAcked(f: MigrationFinding): boolean {
  return f.message.includes('[ACKED]');
}

/**
 * Apply the dm18-migration-check user-visible filter to a raw findings list.
 *
 * The user contract is:
 *   1. Only DM-18 findings appear in the PR comment.
 *   2. Findings suppressed by an `-- verify: ack DM-18 <reason>` comment
 *      are dropped from the comment and do not gate the merge.
 *
 * Both the runtime and the smoke test go through this function so the
 * action's user-visible behavior is tested by the same code path that
 * produces it.
 */
export function applyDm18Filter(
  taggedFindings: TaggedFinding[],
): { visible: TaggedFinding[]; ackedCount: number } {
  const dm18Raw = taggedFindings.filter((f) => f.shapeId === 'DM-18');
  const visible = dm18Raw.filter((f) => !isAcked(f));
  return { visible, ackedCount: dm18Raw.length - visible.length };
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
  // GitHub Actions converts input names to env vars by uppercasing and
  // replacing `-` with `_`, so `fail-on` becomes `INPUT_FAIL_ON`. Only
  // that form is read; do not add hyphenated fallbacks.
  const failOn = (env('INPUT_FAIL_ON') || 'error').toLowerCase();

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

  // ── Phase 3: post-filter to DM-18 only, then drop ack-suppressed ────────
  const { visible: dm18, ackedCount } = applyDm18Filter(taggedFindings);
  console.log(
    `dm18-migration-check: ${dm18.length} DM-18 finding(s) after filter` +
      (ackedCount > 0 ? ` (${ackedCount} suppressed by ack comment)` : ''),
  );

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

// Auto-run on import. The bundled dist/index.cjs is loaded by the GitHub
// Actions runner and runs main() at import time — that is the action's
// entire entry point.
//
// The smoke test imports this file too, but only to reach the exported
// helpers (applyDm18Filter, isAcked, TaggedFinding). To prevent main() from
// firing during the test import, the test sets DM18_SUPPRESS_AUTORUN via
// the bun:test --env-file mechanism BEFORE bun resolves the module graph.
// In the action runtime the env var is unset and the auto-run fires.
if (!process.env.DM18_SUPPRESS_AUTORUN) {
  run().catch((err) => {
    console.log(`::error::Unhandled: ${err?.message ?? err}`);
    if (err?.stack) console.log(err.stack);
    process.exit(1);
  });
}
