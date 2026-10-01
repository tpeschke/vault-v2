# TODOs

status: active   date: 2026-09-30

Order writes `proposed`. Execute approval is the designer naming TODOs, not the session’s overall goal (canonical: `AGENTS.md`). Keep finished entries in Done and prune old ones so the active list stays short.

## Active

### T-021: Replace Vitals Die labels with polyhedral PNGs
status: proposed
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: vitals die glyphs)
why: Self Doubt, Damage, and Stress still paint `d4`…`d20` text. Design: those six cells show the attached die PNGs.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/` (`Vitals.tsx` `DieRow`; `Vitals.css`); unindexed `app/src/assets/images/` (same slot as `bonfire-wordmark.png`). Do not change `dieIndex` storage, assemble, or v1 Integrity `d4!` copy.
steps:
1. Copy the six design-chat PNGs into `app/src/assets/images/` as `d4.png`, `d6.png`, `d8.png`, `d10.png`, `d12.png`, `d20.png`. Source order (d4 → d20): `/home/ubuntu/.cursor/projects/workspace/assets/a884b66a-8b42-4137-aa6d-fe771b10626a.png`, `f0b46028-da42-4a57-bb4e-b57b6e7b1fe8.png`, `fa602f10-b1eb-4021-ba2e-3c7c22eb6e91.png`, `0a440778-ad93-4e6f-ba3b-cd18ca4036f2.png`, `d6dedb9d-9d0f-4ae2-bf99-551a21f3bb54.png`, `657dded0-ee5d-4e55-9ec5-9c06fe0fe7e2.png`.
2. In `DieRow`, keep the six bordered `<p>` cells and the `dieIndex > 0 && (dieIndex - 1) === index` selected test. Replace the text child `{die}` with an `<img>` of the matching PNG. `alt` is `d4` / `d6` / `d8` / `d10` / `d12` / `d20` only. All six images render when `dieIndex` is 0.
3. CSS: keep `.vitals-v2 .die-row p` grey `border: 1px solid #bdbdbd`. Remove `.die-row p.selected` black fill / white text. Selected uses the Positions outline: `outline: 2px solid black; outline-offset: -1px`. Size each `img` to the cell width (`width: 100%; height: auto; display: block`). Do not set a max-height to protect `.page` height.
4. If `.page-type-one` content overflows 1036px after the three image rows, record that in the TODO result. Do not shrink the glyphs.
done when:
- `test -f app/src/assets/images/d4.png` (and d6, d8, d10, d12, d20) succeeds.
- `rg '\{die\}' app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.tsx` is 0.
- `rg 'die-row p.selected' -A3 app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css` shows outline, not `background: black`.
- `rg 'alt="d4"|alt="d6"|alt="d8"|alt="d10"|alt="d12"|alt="d20"' app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.tsx` is 6.
- `rg 'd4!' app/src/pages/v1/components/pageOne/components/leftColumn/components/characteristics/leftColumnComponents/IntegrityDisplay.tsx` still matches (v1 untouched).
depends on: none
open questions: none
deviations from design: selected outline taken from Positions (`2px solid black`, `outline-offset: -1px`) as the Design-close default. Design outline “compress if needed” dropped; Q3 (image defines row height) wins.

## Done

### T-019: Remove extra Favor boxes and Attack/Defense underlines
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Those decorations are not on the blank sheet.
scope: `Attacks.css`, `Defenses.css`, `Favor.css`
result: Attack and Defense value underlines removed. Favor number and anointed outline boxes removed. Anointed checked fill and Favor left divider kept.
deviations from design: none
open questions: none

### T-020: Give page-type-1 value cells a one-line min-height
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Empty value cells collapse. Height must come from min-height, not from T-019 chrome.
scope: page-type-1 component CSS value cells
result: Value `p`s and empty attack `h2` names use `min-height: 17.38px`. Capacity slash unset. `PageType1.css` heading `h1` still 14px.
deviations from design: unused `Relationships.css` still has `min-height: 14px` (Relationships is not on this page).
open questions: none


### T-016: Treat missing descriptions as an empty list
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (view crash)
why: `DescriptionsDisplay` calls `descriptions.map`. A viewed character can omit the key.
scope: `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/descriptions/Descriptions.tsx`
result: Maps and pads from `const rows = descriptions ?? []`. No convictions fallback.
deviations from design: none
open questions: none

### T-017: Apply schema on boot and rename convictions to descriptions
status: done
source: rewrite-ledger/schema-on-boot.md, rewrite-ledger/page1-view.md, 2026-10-01
why: Live DB never received T-013/T-014 DDL. Descriptions is the convictions store renamed.
scope: `backend/server/db/ensureSchema.ts`; `vault.ts`; `backupTables/page1.sql`; v2 characteristics assemble/delete; `characteristicsInfo.ts`.
result: `start()` awaits `ensureSchema` before listen. `currentEmotions` added if missing. `v2convictions` renamed to `v2descriptions` (drop empty T-014 table if both exist). v2 payload has `descriptions` only. `getConvictions` / `deleteConvictions` removed.
deviations from design: `query()` swallows errors; script verifies `information_schema` and throws if a patch did not land.
open questions: none

### T-018: Rename v2 social-suite keys and description tables
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/schema-on-boot.md, 2026-10-01
why: Labels already changed (T-012). Storage keys and description tables were still empathize / lecture / tempt.
scope: `ensureSchema.ts`; `getSocialSuites.ts`; `deleteSocialSuites.ts`; `SocialSuites.tsx`; assemble skeletons; `backupTables/page1.sql`.
result: Keys and tables are influence / inform / inspire / intimidate. `suiteID` 1–4 unchanged.
deviations from design: none
open questions: none


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

