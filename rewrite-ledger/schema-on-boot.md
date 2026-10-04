# Schema on boot
status: accepted   date: 2026-10-03

Decision: The v2 server applies a small idempotent schema script before `listen`. No new migration package. Fail closed: if the script errors, do not start the HTTP server.

Why: T-013/T-014 recorded DDL in `backupTables/page1.sql` but nothing applied it. View then crashed on a missing `descriptions` key. A boot script keeps live postgres matched to the code.

Constraints it imposes:
- One module next to the existing pool (`backend/server/db/ensureSchema.ts`). Call it from `vault.ts` before `app.listen`.
- Use the existing `query()` helper. No `node-pg-migrate` or other new dependency.
- Every statement is safe to re-run: `ADD COLUMN IF NOT EXISTS`; `CREATE TABLE IF NOT EXISTS`; table renames guarded by `information_schema` (Postgres folds unquoted names to lowercase).
- Patches this script owns: `v2currentEmotions` child table; drop `v2BasicCharacteristics.currentEmotions` after copying leftover varchar values into rank 0; `v2convictions` → `v2descriptions`; suite description tables empathize/lecture/tempt → influence/inform/inspire; `v2Favor.divineRelationship varchar(500)` (`ADD COLUMN IF NOT EXISTS`); `v2descriptions.label varchar(500)` (copy `value` into `label`, then drop `value`); `v2descriptions.attackEmotion` / `defenseEmotion` varchar(25) (`ADD COLUMN IF NOT EXISTS`); `v2BasicCharacteristics.pageID` (`ADD COLUMN IF NOT EXISTS`; copy `characterid` into `pageID` where `pageID` is null; unique on `pageID`; insert a default row for each page-type-1 `v2CharacterPages.id` that has none). Fail closed if `pageID` is still missing after the patch. Drop a unique constraint or unique index that is **only** `v2CharacterPages.characterid` (several type-1 pages per character; `add-page-type-1.md`). Do not drop `id` PK or a composite unique. Fail closed if a characterid-only unique remains. Snapshot `backupTables/basicData.sql` already has no such unique. Page-type-2 tables (`v2Page2Basics`, `v2GeneralSkillSuites`, `v2AdvancedGeneralSkills`, `v2CombatSkillSuites`, `v2AdvancedCombatSkills`) via `CREATE TABLE IF NOT EXISTS` plus `backupTables/page2.sql` in the same change (`page2-view.md`). `v2Page2Basics.generalSkillNotes` / `combatSkillNotes` `text` (`ADD COLUMN IF NOT EXISTS`). Do not insert `v2CharacterPages` type-2 rows for existing characters.
- If both `v2convictions` and `v2descriptions` exist, drop the empty T-014 `v2descriptions`, then rename `v2convictions`.
- Keep `rank` on the renamed descriptions table (player-facing number, not list order).
- Update `backupTables/page1.sql` in the same change as each page-1 rename so the snapshot matches live names. Page-type-2 snapshot is `backupTables/page2.sql` (`page2-view.md`).

Rejected:
- `node-pg-migrate` / a versioned history table (four renames and one column).
- Applying DDL only by hand.

Touches: `backend/server/db/` (unindexed); `backend/server/vault.ts` (unindexed); `backend/server/v2/backupTables/page1.sql` (unindexed); `backend/server/v2/backupTables/page2.sql`
TODOs: T-017, T-018, T-022, T-036 (done); Descriptions columns: T-041 (done); basics pageID: T-055 (done); pages characterid unique: T-068 (done); page type 2 tables: T-077 (done); leftover notes columns: T-094 (done)
