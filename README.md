# DM-18 Migration Safety Check

**A GitHub Action that catches one specific dangerous database migration pattern before it merges, with measured precision on 761 real production migrations.**

---

## The incident this tool would have caught

On April 4, 2024, the cal.com team shipped a migration that added a `guestCompany` column to the `AIPhoneCallConfiguration` table as `TEXT NOT NULL`. The migration succeeded on dev and staging — both tables were empty there — but the moment any production write tried to create a row without providing a `guestCompany`, it failed. Twenty-four hours later they shipped a second migration reverting the constraint: `ALTER COLUMN "guestCompany" DROP NOT NULL`. Both migrations are public in the cal.com repo.

The original migration is a textbook instance of a pattern that has a name in migration-safety tooling: **adding or setting NOT NULL on a column that is not provably safe against an already-populated table**. The DM-18 rule catches exactly that pattern.

## What this action does

On every pull request that touches migration files, this action:

1. Fetches the PR's changed files from the GitHub API.
2. Reconstructs the schema state from prior migrations in the PR's base branch.
3. Runs the DM-18 rule against each new migration file.
4. Posts a PR comment that **leads with the calibrated precision claim** if any finding fires.
5. Exits non-zero when a finding fires at error severity, failing the check.

When no findings fire, the comment is a short all-clear acknowledging that the tool ran. When no migration files are present in the PR, the action exits cleanly without posting anything.

## The calibration claim

**DM-18 precision: 100% (19 true positives / 0 false positives) on a public corpus of 761 production migrations.**

The corpus is the April 2026 snapshot of cal.com, formbricks, and supabase migration histories. The measurement and methodology are published at [Born14/verify's MEASURED-CLAIMS.md](https://github.com/Born14/verify/blob/main/scripts/mvp-migration/MEASURED-CLAIMS.md). The 761-migration corpus is fully reproducible: clone [Born14/verify](https://github.com/Born14/verify), run `bun scripts/mvp-migration/replay-engine.ts`, and verify the 19/0 count yourself.

This action is a thin distribution shell around verify's calibrated DM-18 rule. Verify is the source of the rule and the calibration discipline; this repo is the user-facing package.

## What this catches

DM-18 fires on these exact patterns when they appear in a migration file:

- `ALTER TABLE ... ADD COLUMN x NOT NULL` without a `DEFAULT` clause.
- `ALTER TABLE ... ALTER COLUMN x SET NOT NULL` when `x` is currently nullable and has no default.

Both are failure modes that cannot execute against any non-empty table at runtime. Neither requires a database query or row-count heuristic to detect — the signal is entirely in the migration file's SQL plus the schema state reconstructed from prior migrations.

## What this does NOT catch

To keep the precision claim narrow and defensible, this tool catches only DM-18. Specifically:

- **Not NOT NULL additions with a DEFAULT clause.** `ADD COLUMN x TEXT NOT NULL DEFAULT ''` executes cleanly against any table; DM-18 correctly does not fire.
- **Not other migration safety concerns.** This tool does not check for FK cascade behavior, narrowing type conversions, `DROP COLUMN` with live dependents, `DROP TABLE` with incoming FKs, or `DROP INDEX` on constraint-backing indexes. Those are separate rules that are not currently calibrated to a published precision number and are not part of this tool's scope.
- **Not deploy-window races.** A NOT NULL migration that succeeds at execution time can still break new writes from application code running an older revision during the deploy window between migration completion and application rollout. That is a distinct shape (DM-28 in Born14/verify's taxonomy) and is not covered here.
- **Not non-SQL migration frameworks.** The tool reads raw Postgres DDL emitted by Prisma, Supabase, or hand-written SQL migrations. It does not currently understand Django's Python migration files, Rails' ActiveRecord DSL, or Alembic's migration scripts.

If your migration contains other safety concerns — `DROP COLUMN` with FK dependents, narrowing type changes, `DROP TABLE` cascades, etc. — those are separate rules this tool does not check. For broader migration coverage, see [Born14/verify](https://github.com/Born14/verify).

## Install

Add this to `.github/workflows/dm18.yml` in your repo:

```yaml
name: DM-18 Migration Check
on:
  pull_request:
    paths:
      - '**/migrations/**/*.sql'
      - 'migrations/**/*.sql'
jobs:
  check:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: Born14/dm18-migration-check@v1
```

That is the full install. No configuration is required for the happy path. The action reads `GITHUB_TOKEN` from `github.token` automatically.

### Optional inputs

- **`fail-on`** — severity level that causes the check to fail. One of `error` (default), `warning`, or `none`. DM-18 is an error-severity rule; set this to `none` if you want the action to report findings without failing the check.
- **`comment`** — whether to post a PR comment. One of `true` (default) or `false`. When false, findings are written to the Action log but no comment is created on the PR.
- **`token`** — override the GitHub token. Defaults to `${{ github.token }}`.

## What a finding looks like

When DM-18 fires, the PR comment looks like this:

> ### ❌ DM-18: NOT NULL migration safety
>
> **This PR contains a migration that would fail against a non-empty table.**
>
> DM-18 precision: **100%** (19 TP / 0 FP on 761 public production migrations). [Methodology](https://github.com/Born14/verify/blob/main/scripts/mvp-migration/MEASURED-CLAIMS.md) · [Reproduce](https://github.com/Born14/verify/blob/main/scripts/mvp-migration/README.md)
>
> | File | Line | Finding |
> |------|------|---------|
> | `db/migrations/20260414_add_company.sql` | 1 | `users.company` NOT NULL without safe preconditions — will fail on any non-empty table |
>
> **To fix:** add a `DEFAULT` clause, or split into three steps (ADD nullable → backfill → SET NOT NULL).

## How to suppress an intentional finding

If a specific migration legitimately runs against a known-empty table and DM-18 is a false alarm for that case, suppress it with an inline SQL comment:

```sql
-- verify: ack DM-18 migration runs against empty staging table on new environments only
ALTER TABLE stage_jobs ADD COLUMN worker_id UUID NOT NULL;
```

The ack comment is parsed at check time and matches by shape ID. The suppression applies only to that migration file; it does not disable DM-18 globally.

## FAQ

**Why is this a separate tool from verify?**
Because verify catches 25 other things with varying precision, and DM-18 is the only rule in verify with a published precision number. This tool is the version of DM-18 that leads with its claim, for teams who want exactly that and nothing else. If you want broader migration coverage, install [Born14/verify](https://github.com/Born14/verify) directly — the two tools compose.

**Is this a replacement for [Squawk](https://github.com/sbdchd/squawk)?**
No. Squawk catches many patterns heuristically across Postgres DDL and is widely used. This action catches one specific pattern with a published precision number you can cite. Different tools for different needs. Install both if useful — they are not mutually exclusive.

**How do I know the precision number is real?**
Clone [Born14/verify](https://github.com/Born14/verify), run `bun scripts/mvp-migration/replay-engine.ts` against the three public repos in its `_repos/` corpus (cal.com, formbricks, supabase), and verify the 19 TP / 0 FP count yourself. The methodology is fully reproducible.

**Can I run this locally or in CI other than GitHub Actions?**
Not in this first version. The action reads the PR diff from the GitHub API and posts a comment via the same API. A standalone CLI is a plausible next version if there is demand; it is not part of the current scope.

**Who maintains this?**
[Born14](https://github.com/Born14). Issues and pull requests welcome at [the repo](https://github.com/Born14/dm18-migration-check).

## License

MIT. See [LICENSE](./LICENSE).
