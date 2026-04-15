/**
 * Smoke test — runs the DM-18 pipeline end-to-end on local SQL fixtures.
 *
 * Validates three behaviors:
 *   1. bad-migration.sql           → 1 DM-18 finding, ❌ comment with claim
 *   2. good-migration.sql          → 0 DM-18 findings, ✅ comment with claim
 *   3. bad-migration-with-ack.sql  → 0 DM-18 findings (ack suppression works)
 *
 * Case 3 is the trust test: the README promises a `-- verify: ack DM-18 <reason>`
 * suppression mechanism. If that promise is broken end-to-end through this
 * tool's pipeline, the precision claim looks weaker by association. This test
 * proves the suppression flows through parseMigration -> runSafetyGate ->
 * filtered findings as advertised.
 *
 * Run: bun test test/smoke.test.ts
 */
// DM18_SUPPRESS_AUTORUN is set by .env.test (auto-loaded by `bun test`)
// so importing ../src/index.ts does not trigger main() at module-load time.

import { test, expect } from 'bun:test';
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
import type { Schema } from '../verify/src/types-migration.ts';
import { formatDm18Comment } from '../src/dm18-comment.ts';
import { applyDm18Filter, type TaggedFinding } from '../src/index.ts';

const FIXTURES = join(import.meta.dir, 'fixtures');

function readFixture(name: string): string {
  return readFileSync(join(FIXTURES, name), 'utf-8');
}

/**
 * Run the same per-file pipeline the action uses on a single fixture file
 * and return the DM-18-filtered findings plus the rendered comment body.
 *
 * Uses `bad-not-null.sql` as the bootstrap (creates `users(id, email)`) so
 * the schema state matches what an action would see in a real PR adding a
 * new migration to an existing table.
 */
async function runFixture(newFileName: string) {
  const bootstrap = readFixture('bad-not-null.sql');
  const newSql = readFixture(newFileName);
  const filePath = `migrations/${newFileName}`;

  await loadModule();
  const schema: Schema = createEmptySchema();
  applyMigrationSQL(schema, bootstrap);

  const spec = parseMigration(newSql, filePath);
  const grounding = runGroundingGate(spec, schema);
  const safety = runSafetyGate(spec, schema);
  const all: TaggedFinding[] = [...grounding, ...safety].map((f) => ({
    ...f,
    file: filePath,
  }));
  // Use the same filter the runtime uses, so the test exercises the
  // user-visible behavior — not the upstream gate's raw output.
  const { visible: dm18, ackedCount } = applyDm18Filter(all);
  const body = formatDm18Comment(dm18, [filePath]);

  return { all, dm18, ackedCount, body };
}

test('bad migration — NOT NULL without DEFAULT — fires DM-18', async () => {
  const { dm18, body } = await runFixture('bad-migration.sql');

  expect(dm18.length).toBe(1);
  expect(body).not.toBeNull();
  expect(body!).toContain('❌');
  expect(body!).toContain('100%');
  expect(body!).toContain('19 TP');
  expect(body!).toContain('users.company');
  expect(body!).toContain('migrations/bad-migration.sql');
});

test('good migration — NOT NULL with DEFAULT — does not fire DM-18', async () => {
  const { dm18, body } = await runFixture('good-migration.sql');

  expect(dm18.length).toBe(0);
  expect(body).not.toBeNull();
  expect(body!).toContain('✅');
  expect(body!).toContain('100%');
  expect(body!).not.toContain('❌');
});

test('bad migration with ack comment — DM-18 fires but is suppressed', async () => {
  const { dm18, ackedCount, body } = await runFixture('bad-migration-with-ack.sql');

  // The README promises that `-- verify: ack DM-18 <reason>` suppresses
  // findings on that migration. If this assertion fails, the README is
  // making a claim the pipeline does not honor — fix the implementation
  // before any announcement, not the test.
  expect(dm18.length).toBe(0);
  expect(ackedCount).toBe(1);
  expect(body).not.toBeNull();
  expect(body!).toContain('✅');
});
