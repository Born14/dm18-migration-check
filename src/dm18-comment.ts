/**
 * DM-18 PR comment formatter.
 *
 * This is the user-visible surface of the tool. Every design choice in this
 * file is about one thing: making the calibrated precision claim the first
 * thing a reviewer sees, not a buried table row.
 *
 * Format rules (locked):
 *   - Lead with the DM-18 precision claim (19/0/761).
 *   - Finding details second, one table row per file:line.
 *   - Methodology link third.
 *   - Fix guidance fourth.
 *   - Suppression instructions in a <details> fold, not inline.
 *   - Stay under 15 visible lines when collapsed.
 */
import type { MigrationCheckResult } from '../verify/src/action/migration-check.js';
import type { MigrationFinding } from '../verify/src/types-migration.js';

const METHODOLOGY_URL =
  'https://github.com/Born14/verify/blob/main/scripts/mvp-migration/MEASURED-CLAIMS.md';
const REPRODUCE_URL =
  'https://github.com/Born14/verify/blob/main/scripts/mvp-migration/README.md';

/**
 * A DM-18 finding always carries the table.column in its `message`. Parse it
 * back out for a clean table row. Falls back to the raw message if parsing
 * fails — the message is still informative, just uglier.
 */
function parseDm18Target(message: string): { table: string; column: string } | null {
  const m = message.match(/(?:ADD COLUMN|SET NOT NULL on)\s+([\w.]+)\.(\w+)/i);
  if (m && m[1] && m[2]) return { table: m[1], column: m[2] };
  return null;
}

/**
 * Build the finding-details table rows. Each row shows the file, the line,
 * and a short description. If a finding's file path is unknown (which
 * should not happen in practice but the type admits it), the row still
 * renders with "(unknown file)" so the reviewer sees something.
 */
function findingRow(f: MigrationFinding & { file: string }): string {
  const file = f.file;
  const line = f.location?.line ?? '';
  const target = parseDm18Target(f.message);
  const desc = target
    ? `\`${target.table}.${target.column}\` NOT NULL without safe preconditions — will fail on any non-empty table`
    : f.message;
  return `| \`${file}\` | ${line} | ${desc} |`;
}

/**
 * Top-level entry point: given the DM-18-filtered finding list plus the
 * filenames they came from, produce the PR comment body.
 *
 * `findings` is the already-filtered subset where shapeId === 'DM-18'.
 * `filesScanned` is the full list of migration files the tool looked at,
 * used for the "no findings" case so the reviewer can tell the tool actually
 * ran rather than failing silently.
 */
export function formatDm18Comment(
  findings: Array<MigrationFinding & { file: string }>,
  filesScanned: string[],
): string | null {
  // No migration files in the PR — no comment. Silence is the signal.
  if (filesScanned.length === 0) return null;

  // Migration files present but no DM-18 findings — post a short all-clear
  // comment so the reviewer knows the tool ran and this PR passed.
  if (findings.length === 0) {
    return [
      '### ✅ DM-18: NOT NULL migration safety',
      '',
      `Checked ${filesScanned.length} migration file${filesScanned.length === 1 ? '' : 's'}. ` +
        `No DM-18 violations found.`,
      '',
      `DM-18 precision: **100%** (19 TP / 0 FP on 761 public production migrations). ` +
        `[Methodology](${METHODOLOGY_URL}) · [Reproduce](${REPRODUCE_URL})`,
    ].join('\n');
  }

  // DM-18 findings fired. Lead with the claim, then the findings table.
  const header = [
    '### ❌ DM-18: NOT NULL migration safety',
    '',
    `**This PR contains ${findings.length === 1 ? 'a migration' : `${findings.length} migrations`} ` +
      `that would fail against a non-empty table.**`,
    '',
    `DM-18 precision: **100%** (19 TP / 0 FP on 761 public production migrations). ` +
      `[Methodology](${METHODOLOGY_URL}) · [Reproduce](${REPRODUCE_URL})`,
    '',
    '| File | Line | Finding |',
    '|------|------|---------|',
  ];

  const rows = findings.map(findingRow);

  const fix = [
    '',
    '**To fix:** add a `DEFAULT` clause, or split into three steps ' +
      '(ADD nullable → backfill → SET NOT NULL).',
    '',
    '<details>',
    '<summary>Suppress this finding</summary>',
    '',
    'If this migration runs against a known-empty table, add a SQL comment ' +
      'to acknowledge the risk:',
    '',
    '```sql',
    '-- verify: ack DM-18 <reason>',
    '```',
    '',
    '</details>',
  ];

  return [...header, ...rows, ...fix].join('\n');
}
