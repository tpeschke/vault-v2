# TODOs

status: active   date: 2026-09-30

Todo-ify writes `proposed`. Execute approval is the designer naming TODOs, not the session’s overall goal (canonical: `AGENTS.md`). Keep finished entries in Done and prune old ones so the active list stays short.

## Active

### T-012: Relabel and reorder page-type-1 social suites
status: proposed
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Sheet labels are Influence / Inform / Inspire / Intimidate. The view still draws Empathize / Lecture / Intimidate / Tempt.
scope: view character sheet adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/socialSuites/SocialSuites.tsx`. Do not rename `SocialSkillSuites` keys, `suiteID` values, or `v2*Descriptions` tables.
steps:
1. Keep payload keys `empathize`, `lecture`, `intimidate`, `tempt`. Map labels: empathize → Influence, lecture → Inform, tempt → Inspire, intimidate → Intimidate (`suiteID` 1 / 3 / 4 / 2).
2. Draw order: Influence then Inform in the first column; Inspire then Intimidate in the second (same two-column shell).
3. Leave assemble, add, and delete social-suite code unchanged.
done when: In `SocialSuites.tsx`, labels are Influence, Inform, Inspire, Intimidate in that visual order. `rg 'Empathize|Lecture|Tempt' app/src/pages/v2/pageTypes/pageType1` is 0. `characteristicsInfo.ts` still has keys `empathize`, `lecture`, `intimidate`, `tempt`.
depends on: none
open questions: none
deviations from design: none (suiteID → new-name pairing is the implied map recorded on `page1-view.md`)

### T-013: Bind Current Emotions to a new basic-characteristics string
status: proposed
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Current Emotions is three empty lines. Design: new stored field, one string.
scope: view character `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/` (`getBasicCharacteristics.ts`, `getCharacteristicsInfo.ts`); `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `assemblePageType1.ts` skeleton; view adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.tsx`; unindexed schema snapshot `backend/server/v2/backupTables/page1.sql`. Create character add path is unchanged (`insert into v2BasicCharacteristics (pageID)` relies on the column default).
steps:
1. Add `currentEmotions varchar(250) default ''` on `v2BasicCharacteristics` in `backupTables/page1.sql`. Live queries use `pageID` (the snapshot’s `characterid` on that table is inherited; do not rewrite the rest of the file). Apply the column to the live database; there is no migration runner.
2. Add `currentEmotions: string` to `Characteristics` and to `getBasicCharacteristics`’s return. Map the selected column (postgres lowercases unquoted `currentEmotions` to `currentemotions`). Default `''` when the row is missing.
3. Assign it in `getCharacteristicsInfo` and in the `assemblePageType1` skeleton.
4. In `Characteristics.tsx`, bind that one string under Current Emotions. Replace the three empty `<p>` lines. Do not bind goals or temperaments here.
done when: `Characteristics` includes `currentEmotions: string`. `getBasicCharacteristics` returns it. `Characteristics.tsx` renders `{currentEmotions}` and does not contain three empty Current Emotions `<p>` tags. `backupTables/page1.sql` defines the column. `npx tsc -p app --pretty false --noEmit` reports no errors in the files above (ignore pre-existing v1 `UpdateNotes` errors).
depends on: none
open questions: none
deviations from design: none

### T-014: Bind Descriptions to a new stored list
status: proposed
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Descriptions currently maps `convictions`. Design: a new stored field, not convictions, goals, or relationships.
scope: view character `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `getCharacteristicsInfo.ts`; new getter beside the other characteristic getters; `assemblePageType1.ts` skeleton; view adjacency `Descriptions.tsx` and `Characteristics.tsx`; delete character `backend/server/v2/delete/utilities/deletePagesUtilities/pageType1/deleteCharacteristics/`; unindexed `backend/server/v2/backupTables/page1.sql`. No v2 edit feature; no add insert (same as goals: empty until rows exist).
steps:
1. Add table `v2descriptions` (`id serial primary key`, `pageID integer`, `value varchar(500)`) to `backupTables/page1.sql` using `pageID` to match live getters. Apply `CREATE TABLE` to the live database; there is no migration runner.
2. Add `Description { id, value }` and `descriptions: Description[]` on `Characteristics`. Keep `convictions` on the payload; this page does not draw them.
3. Add `getDescriptions(pageID)` following `getFlaws` / `getGoals` (`select * from v2descriptions where pageID = $1`). Wire it in `getCharacteristicsInfo`. Default `[]` on the assemble skeleton.
4. Change `DescriptionsDisplay` to take `descriptions` and render `value` lines, still padding to 5 empty rows. `Characteristics.tsx` passes `descriptions`, not `convictions`.
5. Add `deleteDescriptions` (`delete from v2descriptions where pageID = $1`) and call it from `deleteCharacteristics`.
done when: `Descriptions.tsx` has no `convictions` prop. `getDescriptions` exists and is assigned in `getCharacteristicsInfo`. `deleteCharacteristics` deletes `v2descriptions`. `rg convictions app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/descriptions` is 0. `rg 'convictions=\{convictions\}' app/src/pages/v2/pageTypes/pageType1` is 0. `backupTables/page1.sql` has `v2descriptions`. `npx tsc -p app --pretty false --noEmit` reports no errors in the files above (ignore pre-existing v1 `UpdateNotes` errors).
depends on: none
open questions: none
deviations from design: list shape `{ id, value }[]` padded to 5 is taken from the existing Descriptions widget; Design named a new field, not the row shape.

### T-015: Draw no die selection when dieIndex is 0
status: proposed
source: rewrite-ledger/page1-view.md, 2026-10-01
why: `DieRow` treats `dieIndex` 0 as d4 (`index === dieIndex`). Design: 0 is no selection. Defaults and empty vitals already store 0.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.tsx` (`DieRow` only). Assemble defaults stay 0.
steps:
1. In `DieRow`, apply `selected` only when `dieIndex > 0 && index === dieIndex - 1` (1 = d4 … 6 = d20).
2. Do not change stored defaults, getters, or the `DICE` order.
done when: `Vitals.tsx` has no `index === dieIndex`. `dieIndex === 0` assigns no `selected` class. `dieIndex === 1` selects `d4`. `npx tsc -p app --pretty false --noEmit` reports no errors in `Vitals.tsx` (ignore pre-existing v1 `UpdateNotes` errors).
depends on: none
open questions: none
deviations from design: 1–6 → d4–d20 is the mapping that keeps every die selectable once 0 means unset.


## Done

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

