# TODOs

status: active   date: 2026-09-30

Todo-ify writes `proposed`. Execute approval is the designer naming TODOs, not the session’s overall goal (canonical: `AGENTS.md`). Keep finished entries in Done and prune old ones so the active list stays short.

## Active

### T-016: Treat missing descriptions as an empty list
status: proposed
source: rewrite-ledger/page1-view.md, 2026-10-01 (view crash)
why: `DescriptionsDisplay` calls `descriptions.map`. A viewed character can omit the key (old assemble, or T-014 table never created). That throws `Cannot read properties of undefined (reading 'map')`.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/descriptions/Descriptions.tsx`.
steps:
1. Bind `const rows = descriptions ?? []` (or equivalent). Map and pad to 5 from `rows`. Do not fall back to convictions.
2. Leave the prop type as `Description[]`. Do not change assemble in this TODO.
done when: `Descriptions.tsx` does not call `.map` or `.length` on `descriptions` without a `?? []` (or local `rows`). `npx tsc -p app --pretty false --noEmit` reports no errors in that file (ignore pre-existing v1 `UpdateNotes` errors).
depends on: none
open questions: none
deviations from design: none

### T-017: Apply schema on boot and rename convictions to descriptions
status: proposed
source: rewrite-ledger/schema-on-boot.md, rewrite-ledger/page1-view.md, 2026-10-01
why: Live DB never received T-013/T-014 DDL. Descriptions is the convictions store renamed, not a second table. v2 payload should not keep `convictions`.
scope: unindexed `backend/server/db/ensureSchema.ts` (new), `backend/server/vault.ts`, `backend/server/v2/backupTables/page1.sql`; view character `characteristicsInfo.ts`, `getCharacteristicsInfo.ts`, `getDescriptions.ts`, `getConvictions.ts` (remove), `assemblePageType1.ts`; delete character `deleteCharacteristics.ts`, `deleteConvictions.ts` (remove), `deleteDescriptions.ts`. v1 convictions files stay.
steps:
1. Add `ensureSchema` using existing `query()`. Before `app.listen` in `vault.ts`, `await` it; on throw, do not listen. No new npm package.
2. Idempotent patches: `ALTER TABLE v2BasicCharacteristics ADD COLUMN IF NOT EXISTS currentEmotions varchar(250) DEFAULT ''`. If `information_schema.tables` has `v2convictions` and not `v2descriptions`, `ALTER TABLE v2convictions RENAME TO v2descriptions`. If both exist, `DROP TABLE v2descriptions` then rename `v2convictions`. Check folded lowercase names.
3. v2 `Characteristics`: keep `descriptions`, remove `convictions`. `getCharacteristicsInfo` / `assemblePageType1` assign only `descriptions` via `getDescriptions` (`select * from v2descriptions where pageID = $1`). Delete `getConvictions.ts` and `deleteConvictions.ts`. `deleteCharacteristics` calls `deleteDescriptions` only for that store.
4. Snapshot: remove the `v2convictions` create and the T-014 `v2descriptions` (pageID, value only). One `v2descriptions` create matching the renamed table (`id`, keep existing id column style, `value`, `rank`). Do not rewrite other snapshot `characterid` columns.
done when: `vault.ts` awaits `ensureSchema` before listen. `rg convictions backend/server/v2 backend/common/interfaces/v2` is 0. `getConvictions.ts` and `deleteConvictions.ts` are gone. `backupTables/page1.sql` has `v2descriptions` with `rank` and no `v2convictions`. `npx tsc -p app --pretty false --noEmit` reports no errors in the view files above (ignore v1 `UpdateNotes`).
depends on: none
open questions: none
deviations from design: none (table rename, not a column; rank kept)

### T-018: Rename v2 social-suite keys and description tables
status: proposed
source: rewrite-ledger/page1-view.md, rewrite-ledger/schema-on-boot.md, 2026-10-01
why: Labels already changed (T-012). Storage keys and description tables are still empathize / lecture / tempt.
scope: `ensureSchema.ts` (add suite renames); `backupTables/page1.sql`; `characteristicsInfo.ts` `SocialSkillSuites`; `getSocialSuites.ts`; `assemblePageType1.ts` / `getCharacteristicsInfo.ts` skeletons; `deleteSocialSuites.ts`; view adjacency `SocialSuites.tsx`. `suiteID` 1–4 and addSocialSuites inserts unchanged.
steps:
1. In `ensureSchema`, if old table exists and new does not, rename: `v2empathizedescriptions` → `v2influencedescriptions`, `v2lecturedescriptions` → `v2informdescriptions`, `v2temptdescriptions` → `v2inspiredescriptions`. Intimidate table name stays. Idempotent `information_schema` checks.
2. Payload keys: `influence`, `inform`, `inspire`, `intimidate`. Assemble / getSocialSuites `order by suiteID` still maps row 1/2/3/4 to those keys. SQL uses `v2influenceDescriptions`, `v2informDescriptions`, `v2inspireDescriptions`, `v2intimidateDescriptions`.
3. `SocialSuites.tsx` destructures the new keys; labels and draw order stay Influence, Inform, then Inspire, Intimidate.
4. Snapshot: replace empathize/lecture/tempt creates with influence/inform/inspire. Keep intimidate.
done when: `rg -i 'empathize|lecture|\\btempt\\b' backend/server/v2 app/src/pages/v2/pageTypes/pageType1 backend/common/interfaces/v2` is 0. `suiteID` inserts still 1–4. `npx tsc -p app --pretty false --noEmit` reports no errors in `SocialSuites.tsx` (ignore v1 `UpdateNotes`).
depends on: T-017
open questions: none
deviations from design: none


## Done

### T-012: Relabel and reorder page-type-1 social suites
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Sheet labels are Influence / Inform / Inspire / Intimidate. The view still draws Empathize / Lecture / Intimidate / Tempt.
scope: view character sheet adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/socialSuites/SocialSuites.tsx`. Do not rename `SocialSkillSuites` keys, `suiteID` values, or `v2*Descriptions` tables.
result: Labels are Influence / Inform then Inspire / Intimidate. Payload keys and suiteIDs unchanged.
deviations from design: none
open questions: none

### T-013: Bind Current Emotions to a new basic-characteristics string
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Current Emotions is three empty lines. Design: new stored field, one string.
scope: view character `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/` (`getBasicCharacteristics.ts`, `getCharacteristicsInfo.ts`); `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `assemblePageType1.ts` skeleton; view adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.tsx`; unindexed schema snapshot `backend/server/v2/backupTables/page1.sql`.
result: `currentEmotions` is on the interface, assemble path, and one bound line in the view. Column recorded in `backupTables/page1.sql`.
deviations from design: live ALTER not applied; this environment has no `server-config` / postgres.
open questions: none

### T-014: Bind Descriptions to a new stored list
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Descriptions currently maps `convictions`. Design: a new stored field, not convictions, goals, or relationships.
scope: view character `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `getCharacteristicsInfo.ts`; `getDescriptions.ts`; `assemblePageType1.ts`; `Descriptions.tsx`; `Characteristics.tsx`; delete character `deleteDescriptions.ts`; `backupTables/page1.sql`.
result: Descriptions bind `descriptions`. `getDescriptions` / `deleteDescriptions` added. Convictions stay on the payload and are not drawn. Table recorded in `backupTables/page1.sql`.
deviations from design: list shape `{ id, value }[]` padded to 5 taken from the existing widget. Live CREATE not applied; no postgres in this environment.
open questions: none

### T-015: Draw no die selection when dieIndex is 0
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: `DieRow` treats `dieIndex` 0 as d4 (`index === dieIndex`). Design: 0 is no selection. Defaults and empty vitals already store 0.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.tsx` (`DieRow` only).
result: `selected` only when `dieIndex > 0 && (dieIndex - 1) === index`. Defaults stay 0.
deviations from design: 1–6 → d4–d20 as recorded on `page1-view.md`.
open questions: none


### T-009: Lay out page-type-1 left column to match the blank sheet
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Left column was a partial stack (general info, stats, characteristics including Goals/Temperaments/Relationships, movement). The sheet’s left column is Name through Favor.
scope: `app/src/pages/v2/pageTypes/pageType1/` (view character sheet adjacency): `PageType1.tsx`, `GeneralInfo/`, `Stats/`, `Characteristics/` (capacity, social suites, reputation, strengthNDiscount, descriptions, flaws), `Favor/`.
result: Left column order is Name through Favor. Cultural Strength kept. Goals/Temperaments/Relationships/Movement not imported on this page. Current Emotions is empty lines; Descriptions bind to convictions. Suite names left as Empathize/Lecture/Intimidate/Tempt.
deviations from design: none (verified the premature execute against the steps)
open questions: Social suite display names; Current Emotions vs goals; Descriptions vs convictions.

### T-010: Lay out page-type-1 right column to match the blank sheet
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Right column was a placeholder (`Right`). The sheet’s right column is Positions, Self Doubt, Damage, Stress, Defenses, Attacks. The designer added a Bonfire wordmark at the top of that column, which the blank PDF does not have.
scope: `app/src/pages/v2/pageTypes/pageType1/`; `app/src/assets/images/bonfire-wordmark.png`.
result: Wordmark mounted first in the right column. Positions, vitals, defenses, and four attacks follow. Spacing tightened. Measured `.page-type-one` at 1068px (1036 content + 16px card padding); right-column content ended at ~788px, no overflow.
deviations from design: none
open questions: dieIndex 0 as d4 vs unset; whether to draw defense name/notes and attack notes.

### T-011: Assign basic characteristics onto the page-type-1 payload
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: `getCharacteristicsInfo` discarded `getBasicCharacteristics`’s return, so capacity, Cultural Strength, social skill discount, and temperaments never reached the view.
scope: `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/getCharacteristicsInfo.ts`
result: Assigns capacity, culturalStrength, socialSkillDiscount, and temperaments in place. Spread-return pattern has 0 hits.
deviations from design: none
open questions: none


### T-008: Split nested view folder into two FSD page slices
status: done
source: rewrite-ledger/fsd-colocation.md, 2026-10-01
why: Designer chose two view page slices, not one nested view folder with v1/v2 inside.
scope: former nested view folder under `app/src/pages/`; `app/src/routes/AllRoutes.tsx`; `00-START-HERE.yaml` view routing keys. Home slice and backend paths unchanged.
result: `git mv` to `app/src/pages/v1` and `app/src/pages/v2`. `View.css` is `app/src/pages/View.css`, imported by both slices. Home and create-character paths unchanged. No `app/src/app`, `widgets/`, `features/`, `entities/`, or `shared/` created. Backend unmoved.
deviations from design: Slice names `v1`/`v2` taken from observed folders because execute was ordered while names were unset. `View.css` kept as a sibling of both slices rather than creating `shared/`.
open questions: none

### T-005: Add AGENTS.md as agent entry to L1 and the ledger
status: done
source: recorded gap “no AGENTS.md”; session 2026-10-01
why: Agents must route through root panels instead of scanning.
scope: `AGENTS.md`; `00-START-HERE.md` / `.yaml`; `rewrite-ledger/00-START-HERE.md` / `.yaml`.
result: `AGENTS.md` points at L1, vocabulary, ledger, unindexed rule, and FSD-later. Gap removed.
deviations from design: AGENTS.md does not route CODE-LAYOUT-STANDARD as current tree law; designer adopted FSD for a later transformation.

### T-006: Tighten L1 from unindexed misses
status: done
source: index next-steps 2026-10-01 item 3
why: Files that implement an accepted objective were listed unindexed (home rows, header, v1 widgets, contracts, SQL).
scope: `00-START-HERE.yaml` `routing` and `unindexed`.
result: Promoted home row display, header, App login bootstrap, v1 displayArray/textArea, view/home CSS, v1/v2 interfaces, v1 dictionaries, and v1 query SQL onto existing features. Remaining unindexed is shell/machinery (38 files). Completeness still holds.
deviations from design: none

### T-007: Context-loss review for L2/L3
status: done
source: anne-index applying-to-code; session 2026-10-01 item 4
why: L2/L3 only if a miss the front panel cannot carry.
scope: `rewrite-ledger/l2-l3-deferred.md`
result: No such miss after T-006. L2/L3 not added. Format remains unset.
deviations from design: none


### T-003: Completeness pass excluding dist/
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: An unrouted source file is an index gap. Generated `dist/` is excluded by decision.
scope: `00-START-HERE.yaml` `unindexed`; source under `app/src`, `backend/`, `replaceScripts/`.
result: 372 source files are either under a routing primary/adjacent path or named in `unindexed`. Mechanisms (redux, db, vault.ts, replaceScripts, common contracts) listed unindexed; no new features invented. `dist/` is in excludes and not a routing target.
deviations from design: none
open questions: none (mechanisms listed unindexed as specified)

### T-002: Map each accepted feature to backend primary and frontend adjacency
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: Index-in-place needs current paths. Backend is primary when the feature spans surfaces.
scope: `00-START-HERE.yaml` `routing`.
result: Twelve inventory rows mapped. PDF has no backend; primary is now `app/src/pages/v1/hooks/utilities/downloadUtilities.ts` (path updated by T-008). Create character maps to `backend/server/v2/add/`.
deviations from design: download v1 PDF primary is frontend-only (no backend path).

### T-004: Remove HomeController.addCharacter
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30 (v1 create permanently excluded)
why: v1 will never add characters. `HomeController.addCharacter` inserts into `cvcharactermain` and is not mounted. It is not the v2 Create character path.
scope: `backend/server/controllers/home/HomeController.ts`; `backend/server/v1/queries/home.ts`.
result: Deleted `addCharacter` and unused imports from HomeController. Removed `insertCharacter` and `characterCount` SQL. Home GET/DELETE and v2 add path unchanged.
deviations from design: none

### T-001: Add repository front panels that own the feature index
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: L1 for the repo does not exist. The feature index lives on the root panels, not in the ledger.
scope: `00-START-HERE.md` and `00-START-HERE.yaml` at repo root (now the navigation owner).
result: Root panels added. YAML routing keys match the accepted inventory plus aliases; `primary`/`adjacent` left empty for T-002. No v1 create-character key. Vocabulary lives on the repo human panel. Ledger routes L1 to the root YAML.
deviations from design: none

