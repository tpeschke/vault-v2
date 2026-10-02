# TODOs

status: active   date: 2026-09-30

Order writes `proposed`. Execute approval is the designer naming TODOs, not the session’s overall goal (canonical: `AGENTS.md`). Keep finished entries in Done and prune old ones so the active list stays short.

## Active

### T-027: Add v2 edit-mode chrome
status: proposed
source: rewrite-ledger/edit-character.md, 2026-10-02
why: v1 session starts with a side Edit button, `EditingContext`, and `view-edit`. v2 has a sidebar stub and no mode.
scope: view character adjacency `app/src/pages/v2/` (`V2View.tsx`; new `contexts/EditingContext.tsx`; new `components/sidebar/Sidebar.tsx` + `Sidebar.css`). Do not import v1 context or sidebar. Do not add `features/`.
steps:
1. Add `EditingContext` as `createContext(false)` on the v2 slice (new file, same idea as v1, not a re-export).
2. On `V2View`, hold `isEditing` (default false). `toggleIsEditing` flips it. `saveCharacter` and `revertCharacterToUnedited` call hook functions when present and set `isEditing` false. Wrap the page stack in `EditingContext` with `isEditing`.
3. Add a flex v2 view shell (new class, not `.version-one-shell`) so the sidebar sits beside the pages. While `isEditing`, add `view-edit` to the page shell.
4. New sidebar: if `ownsThisCharacter` and not editing, Edit (`fa-pen-nib`). If editing, Save (`fa-floppy-disk`) and Revert (`fa-arrow-rotate-left`). Hide Edit when `!ownsThisCharacter`. No Download / Pregen / Quick Edit. Scope CSS to the new v2 shell; copy v1 sidebar spacing/shadow visually, do not import `V1` sidebar CSS.
5. Read `ownsThisCharacter` from `character.userInfo`. If `character` is missing, render no sidebar.
done when: `npm run build` in `app/` passes. Grep `from ['\"].*pages/v1` under `app/src/pages/v2` is 0 hits. Non-owner path has no Edit button in code (`ownsThisCharacter &&` on Edit).
depends on: none
open questions: none
deviations from design: none

### T-028: Local v2 updates, revert snapshot, and save POST
status: proposed
source: rewrite-ledger/edit-character.md, 2026-10-02
why: v1 keeps a character in the hook, mutates it while editing, POSTs the whole object, and Reverts to a snapshot. v2 hook only loads.
scope: view / edit adjacency `app/src/pages/v2/hooks/characterHook.tsx`; new update helpers under `app/src/pages/v2/hooks/` (new files). Gitignored `app/src/frontend-config.ts` (`editV2URL`). Unindexed `app/src/redux/slices/usersCharactersSlice.tsx` (`updateCatalogInfo`, index `1`). Do not import v1 hooks or `getV1Updates`.
steps:
1. Add `editV2URL` in `app/src/frontend-config.ts` next to `viewV2URL`, pointing at `/v2/edit/` (same host pattern as other v2 URLs). If that file is absent, stop and report.
2. Keep a `revertedCharacter` snapshot. Set it only when loading a character and after a successful save. In-edit updates call `setCharacter` only — not the snapshot. `revertCharacter` restores the snapshot.
3. `saveCharacterToBackend`: POST `character` to `editV2URL + character.id`; then set character and snapshot from the response (v1 also `setCharacter(null)` while waiting).
4. New update helpers that immutably patch `CharacterVersion2` / page type 1. Cover every stored drawn field listed in T-029, plus pass-through of undrawn payload fields. Empty list pads: first change inserts a row with a temp id.
5. On general-info change, `dispatch(updateCatalogInfo({ info: { id, name, ancestry, class, subclass, level }, index: 1 }))`.
6. Return `updateFunctions` (`saveCharacterToBackend`, `revertCharacter`, page-type-1 updates) from the hook. Wire them through `V2View` into `PageType1`.
done when: `npm run build` in `app/` passes. Grep `getV1Updates` and `from ['\"].*pages/v1` under `app/src/pages/v2` is 0 hits. Snapshot is not written in the per-field update helpers.
depends on: T-027
open questions: none
deviations from design: none

### T-029: Swap page-type-1 stored cells to inputs
status: proposed
source: rewrite-ledger/edit-character.md, 2026-10-02
why: Edit must toggle every stored drawn cell. Computed and static chrome stay display.
scope: view character adjacency under `app/src/pages/v2/pageTypes/pageType1/` (widgets listed below). `PageType1.tsx` only as needed to pass update functions.
steps:
1. Each widget reads `EditingContext`. When `isEditing`, replace the stored drawn node with a controlled input (or the control named). Keep `character-value` on the control. `onChange` calls the T-028 helper.
2. **GeneralInfo:** name, ancestry, class, subclass, level, CrP unspent, CrP spent. Leave CrP `toLvl` as text.
3. **Stats:** str, dex, con, mem, ins, pre.
4. **Characteristics:** six Current Emotions values; each social suite stat, rank, and description value/rank (6 rows); Reputation value/rank (3); Cultural Strength; Social Skill Discount; Descriptions (5); Flaws (3). Leave Emotional Capacity band `<p>`s as text. Do not add a raw capacity cell.
5. **Favor:** current and max as inputs. Anointed box toggles `anointed` on click while editing; no new checkbox chrome.
6. **Vitals:** Self Doubt threshold, diePenalty; Damage knockback, damage, threshold; Stress stress, threshold. Trauma stays `threshold * 2` text. Die row: while editing, click a cell to set that track’s `dieIndex` to `index + 1`; click the selected cell to set `0`.
7. **Defenses:** initiative, defense, parry, flanks, cover, parryDR, dr, notes. Defense `name` stays undrawn.
8. **Attacks:** all four blocks — name, measure, attack, damage, type, recovery, notes.
9. Do not edit Positions, wordmark, slashes, or off-page widgets (Temperaments, Movement, Relationships).
done when: `npm run build` in `app/` passes. Grep in `pageType1/` for `character-value` on a `<p>` or `<h2>` that interpolates a stored drawn field: those nodes are behind `isEditing ?`. Trauma, `toLvl`, and capacity bands still have no inputs. Defense `name` still has 0 render hits.
depends on: T-027, T-028
open questions: none
deviations from design: none

### T-030: Add backend v2 edit owner and persist page type 1
status: proposed
source: rewrite-ledger/edit-character.md, 2026-10-02
why: v1 POSTs the full character to `/edit/:id`, checks owner, writes, reassembles. v2 has no edit owner. New files only.
scope: new `backend/server/v2/edit/` (primary); `backend/server/vault.ts`; view assemble `getV2Character` / `assembleV2Character` (reassemble after save, do not rewrite view); repository `00-START-HERE.yaml` routing. Do not import `backend/server/v1/controllers/edit`.
steps:
1. Add `editV2CharacterRoutes.ts` and `editV2CharacterController.ts`. POST `/:characterID`. Body is `CharacterVersion2`.
2. Owner check: compare `request.body.userInfo.userID` to the owner id from the existing owner query (`getCharacterOwnerID` or `userSQL.getCharacterUserID` as used for this character). If mismatch, send `{ message: "You don't own this character" }` like v1. If match, save then reassemble via the existing view assemble path and send the character.
3. New page-type-1 save tree under `backend/server/v2/edit/` (parallel to add/view/delete, new files). UPDATE/INSERT/DELETE with the same key those owners use (`pageID`). Ignore stale `backupTables/page1.sql` `characterid` if live SQL is `pageID`.
4. Write every payload field for page type 1, including undrawn stores (capacity, temperaments, goals, relationships, movement, defense `name`). List tables: delete rows whose ids are not in the posted list, update rows with ids, insert the rest (empty values may be omitted from insert, matching current-emotions empty-varchar habit if already recorded).
5. Attacks: UPDATE the four rows by `pageID` + `index`. Suites: UPDATE `v2SocialSkillSuites` by `pageID` + `suiteID` (map 1 influence, 2 intimidate, 3 inform, 4 inspire).
6. `app.use('/v2/edit', editV2Routes)` in `vault.ts` with the other v2 mounts. Do not mount on `/edit`.
7. In the same change, add L1 routing:
   ```
   edit character sheet / save character / edit character:
     primary: backend/server/v2/edit/
     adjacent:
       - app/src/pages/v2/
       - app/src/pages/View.css
       - backend/common/interfaces/v2/
   ```
   Keep `00-START-HERE.yaml` in this change. After any rename, grep the old path; expect 0 hits.
done when: `npm run build` in `backend/server` passes. Grep `from ['\"].*v1/controllers/edit` under `backend/server/v2/edit` is 0 hits. `00-START-HERE.yaml` has the edit-character key. `vault.ts` mounts `/v2/edit`.
depends on: none (can land before T-028; frontend save 404s until both exist)
open questions: none
deviations from design: none

## Done

### T-025: Load Kalam Regular and define `.character-value`
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: Kalam for character values)
why: Character-object fill-ins must use Kalam 400. Form chrome stays HamletOrNot / oldClaude / Source Sans 3.
scope: unindexed `app/src/index.css`; view character adjacency `app/src/pages/View.css`.
result: Google `@import` includes `family=Kalam:wght@400`. `.v2 .character-value` sets `'Kalam', cursive`. No 300/700, no Fontsource.
deviations from design: selector is `.v2 .character-value` (Order) so attack-name `h2` is not kept on oldClaude.
open questions: none

### T-026: Mark interpolated v2 sheet values with `character-value`
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: Kalam for character values)
why: Q4-B: a class on each interpolated node, not all `p`. Q1-B: every v2 sheet page, including existing off-page-1 interpolations.
scope: view character adjacency under `app/src/pages/v2/pageTypes/pageType1/`.
result: `character-value` on listed interpolations (including Temperaments, Movement speeds, Relationships). Positions, die `<img>` cells, `p.slash`, slash spans, Anointed, v1, home unmarked. GeneralInfo has 8 fields (name through toLvl). Browser: name/stat/attackName/notes `Kalam, cursive`; labels `oldClaude`; slash/Positions/dieCell Source Sans 3; `kalamLoaded=true`. `.page-type-one` height=1068 scroll=1073 `overflow=true` (5px). No compression.
deviations from design: none. Order done-check counted GeneralInfo as 7; steps listed 8 interpolations — implemented 8.
open questions: none

### T-024: Draw unlabeled two-line notes under Defense and each Attack
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: attack and defense special info)
why: `notes` is already on the payload. The view omits it. Design: unlabeled string below each block’s stats, two value-cell lines minimum, wrap and grow.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Defenses/` (`Defenses.tsx`, `Defenses.css`) and `.../Attacks/` (`Attacks.tsx`, `Attacks.css`).
result: Unlabeled `notes` under Defense and each of four Attacks. `min-height: calc(2 * 17.38px)` (browser 34.76px). Wrap and grow. Defense `name` still hidden. Empty sheet `.page-type-one` 1068px, `overflow=false`.
deviations from design: none
open questions: none

### T-022: Store Current Emotions as a six-slot child table
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/schema-on-boot.md, 2026-10-01 (design: Current Emotions six-cell grid)
why: T-013 stored one varchar on `v2BasicCharacteristics`. Design: child table of `{ id, value }` rows, old string in rank 0.
scope: view character `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `getCharacteristicsInfo.ts`; `getBasicCharacteristics.ts`; `assemblePageType1.ts` skeleton; new `getCurrentEmotions.ts` beside `getDescriptions.ts`; delete character `deleteCharacteristics.ts` + new `deleteCurrentEmotions.ts`; boot `backend/server/db/ensureSchema.ts`; unindexed `backupTables/page1.sql`.
result: Payload is `Emotion[]`. Table `v2currentEmotions`. Assemble via `getCurrentEmotions` ordered by rank. Old varchar copied to rank 0 then dropped. Delete path added. Live postgres still needs a server restart for `ensureSchema`.
deviations from design: none beyond Order (`rank` as slot; empty varchars not inserted; `pageID` not `characterid`).
open questions: none

### T-023: Draw Current Emotions as a 3×2 Social Suite–style grid
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: Current Emotions six-cell grid)
why: The view still paints one string in `.line-shell`. Design: six unlabeled cells, 3 columns × 2 rows, Social Suite grid lines.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/` (`Characteristics.tsx`, `Characteristics.css`).
result: Heading Current Emotions. Six unlabeled `p`s in `repeat(3, 1fr)`, padded from `currentEmotions ?? []`. `#bdbdbd` 1px borders, min-height 17.38px. `.line-shell` removed. Browser: empty and filled 3×2 grids; `.page-type-one` 1068px, `overflow=false`; Favor stays on the card.
deviations from design: none
open questions: none

### T-021: Replace Vitals Die labels with polyhedral PNGs
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: vitals die glyphs)
why: Self Doubt, Damage, and Stress still paint `d4`…`d20` text. Design: those six cells show the attached die PNGs.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/` (`Vitals.tsx` `DieRow`; `Vitals.css`); unindexed `app/src/assets/images/` (same slot as `bonfire-wordmark.png`). Do not change `dieIndex` storage, assemble, or v1 Integrity `d4!` copy.
result: Die cells are `d4.png`…`d20.png` with `alt` d4–d20. Grey boxes kept. Selected is Positions outline, not fill. `dieIndex` 0 still draws all six. v1 `d4!` untouched. Browser: `.page-type-one` 1068px (1036 + card padding), `overflow=false`; Attacks stay on the card.
deviations from design: none beyond Order (Positions 2px outline; no glyph shrink).
open questions: none

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

