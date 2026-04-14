/**
 * Smoke test — runs the DM-18 pipeline end-to-end on local SQL fixtures.
 *
 * Does NOT hit the GitHub API. Does NOT require GITHUB_EVENT_PATH. It
 * builds a MigrationGroup from disk and calls checkMigrations directly,
 * then post-filters to DM-18 and runs the comment formatter.
 *
 * Expected results:
 *   bad-migration.sql  → 1 DM-18 finding, comment body leads with the ❌ header
 *   good-migration.sql → 0 DM-18 findings, comment body leads with the ✅ header
 *
 * Run: bun test/smoke.test.ts
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseMigration } from '../verify/scripts/mvp-migration/spec-from-ast.ts';
import {
  createEmptySchema,
  applyMigrationSQL,
} from '../verify/scripts/mvp-migration/schema-loader.ts';
import { runGroundingGate } from '../verify/scripts/mvp-migration/grounding-gate.ts';
import { runSafetyGate } from '../verify/scripts/mvp-migration/safety-gate.ts';
import { loadModule } from 'libpg-query';
import type { MigrationFinding, Schema } from '../verify/src/types-migration.ts';
import { formatDm18Comment } from '../src/dm18-comment.ts';

type TaggedFinding = MigrationFinding & { file: string };

const FIXTURES = join(import.meta.dir, 'fixtures');

function readFixture(name: string): string {
  return readFileSync(join(FIXTURES, name), 'utf-8');
}

async function runCase(label: string, newFileName: string, expectFinding: boolean) {
  console.log(`\n── Case: ${label} ──`);

  const bootstrap = readFixture('bad-not-null.sql'); // creates users(id, email)
  const newSql = readFixture(newFileName);
  const filePath = `migrations/${newFileName}`;

  await loadModule();
  const schema: Schema = createEmptySchema();
  applyMigrationSQL(schema, bootstrap);

  const spec = parseMigration(newSql, filePath);
  const grounding = runGroundingGate(spec, schema);
  const safety = runSafetyGate(spec, schema);
  const all: TaggedFinding[] = [...grounding, ...safety].map((f) => ({ ...f, file: filePath }));
  console.log(`  Total findings (all shapes): ${all.length}`);

  const dm18 = all.filter((f) => f.shapeId === 'DM-18');
  console.log(`  DM-18 findings after filter:  ${dm18.length}`);

  if (expectFinding && dm18.length === 0) {
    console.log(`  ❌ FAIL: expected a DM-18 finding, got none`);
    process.exitCode = 1;
    return;
  }
  if (!expectFinding && dm18.length > 0) {
    console.log(`  ❌ FAIL: expected zero DM-18 findings, got ${dm18.length}`);
    for (const f of dm18) console.log(`    - ${f.message}`);
    process.exitCode = 1;
    return;
  }

  const body = formatDm18Comment(dm18, [filePath]);
  console.log(`\n  --- comment body ---`);
  console.log(body?.split('\n').map((l) => `  ${l}`).join('\n') ?? '  (null)');

  if (expectFinding && body && !body.includes('❌')) {
    console.log(`  ❌ FAIL: comment body missing ❌ header for failing case`);
    process.exitCode = 1;
    return;
  }
  if (!expectFinding && body && !body.includes('✅')) {
    console.log(`  ❌ FAIL: comment body missing ✅ header for passing case`);
    process.exitCode = 1;
    return;
  }
  if (expectFinding && body && !body.includes('100%')) {
    console.log(`  ❌ FAIL: comment body missing precision claim`);
    process.exitCode = 1;
    return;
  }
  console.log(`  ✅ ok`);
}

async function main() {
  await runCase('bad migration (NOT NULL, no default)', 'bad-migration.sql', true);
  await runCase('good migration (NOT NULL with default)', 'good-migration.sql', false);
  if (process.exitCode && process.exitCode !== 0) {
    console.log('\n❌ Smoke test FAILED');
    process.exit(process.exitCode);
  }
  console.log('\n✅ Smoke test PASSED');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
