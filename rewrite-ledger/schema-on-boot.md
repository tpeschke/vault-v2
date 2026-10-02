# Schema on boot
status: accepted   date: 2026-10-01

Decision: The v2 server applies a small idempotent schema script before `listen`. No new migration package. Fail closed: if the script errors, do not start the HTTP server.

Why: T-013/T-014 recorded DDL in `backupTables/page1.sql` but nothing applied it. View then crashed on a missing `descriptions` key. A boot script keeps live postgres matched to the code.

Constraints it imposes:
- One module next to the existing pool (`backend/server/db/ensureSchema.ts`). Call it from `vault.ts` before `app.listen`.
- Use the existing `query()` helper. No `node-pg-migrate` or other new dependency.
- Every statement is safe to re-run: `ADD COLUMN IF NOT EXISTS`; `CREATE TABLE IF NOT EXISTS`; table renames guarded by `information_schema` (Postgres folds unquoted names to lowercase).
- Patches this script owns: `v2currentEmotions` child table; drop `v2BasicCharacteristics.currentEmotions` after copying leftover varchar values into rank 0; `v2convictions` → `v2descriptions`; suite description tables empathize/lecture/tempt → influence/inform/inspire; `v2Favor.divineRelationship varchar(500)` (`ADD COLUMN IF NOT EXISTS`); `v2descriptions.label varchar(500)` (copy `value` into `label`, then drop `value`); `v2descriptions.attackEmotion` / `defenseEmotion` varchar(25) (`ADD COLUMN IF NOT EXISTS`).
- If both `v2convictions` and `v2descriptions` exist, drop the empty T-014 `v2descriptions`, then rename `v2convictions`.
- Keep `rank` on the renamed descriptions table (player-facing number, not list order).
- Update `backupTables/page1.sql` in the same change as each rename so the snapshot matches live names.

Rejected:
- `node-pg-migrate` / a versioned history table (four renames and one column).
- Applying DDL only by hand.

Touches: `backend/server/db/` (unindexed); `backend/server/vault.ts` (unindexed); `backend/server/v2/backupTables/page1.sql` (unindexed)
TODOs: T-017, T-018, T-022, T-036 (done); Descriptions columns: T-041
