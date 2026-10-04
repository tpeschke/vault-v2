# TODOs

status: active   date: 2026-09-30

Order writes `proposed`. Execute approval is the designer naming TODOs, not the session’s overall goal (canonical: `AGENTS.md`). Keep finished entries in Done and prune old ones so the active list stays short.

## Active

none

## Done

### T-092: Add + Skills & Abilities; make + Main Info always type 1
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-04 (Q1 every card; Q2 insert after this card; Q3 Main Info always type 1; Q4 no scroll; Q5 same chrome)
why: Existing type-1-only characters cannot add a type-2 sheet because `addPageAfter` copies the card’s type. The designer wants two labeled inserts in the gutter.
scope: view/edit adjacency `app/src/pages/v2/V2View.tsx` (gutter only), `app/src/pages/v2/hooks/updates/pageType1Updates.ts`, `app/src/pages/v2/hooks/updates/getV2Updates.ts`, `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`. Do not change persist, Create, `PageType1.tsx`, `PageType2.tsx`, or `index.css`. Do not add `features/`. Do not add a route or persist-on-click.
result: `addPageAfter` always inserts type 1. `addPageType2After` inserts type 2. Skills button sits to the right of Main Info on every card. Sibling CSS keeps `margin-left: auto` on Main Info only.
depends on: T-080, T-082 (done)
deviations from design: none. Two labeled buttons, not a dropdown. Chrome matches live Main Info (whitesmoke / orange hover), not the older ledger `#bdbdbd` + bare `+`.


### T-091: Wash default teal over note textareas while edit is on
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (Q1 default teal; Q2 darker hover; Q3 view `p` zebra; Q4 wash)
why: T-089 hid edit teal so only hover showed a wash. Designer wants the rest state teal too, without a solid fill that hides the leftover zebra.
scope: view/edit adjacency `app/src/pages/v2/pageTypes/pageType2/components/NotesPanes/NotesPanes.css`. Do not change `index.css`, `View.css`, Favor, page-1 notes, skill tables, or JSX. Do not add `features/`.
result: `.view-edit` textareas stack `rgba(173, 216, 230, 0.35)` over leftover zebra at rest and `rgba(145, 181, 194, 0.35)` on hover. View `p` stays zebra. Dropped leftover `.view-quick-edit` selectors.
depends on: T-089 (done)
deviations from design: none. Rest/hover wash alpha is the existing T-089 hover `0.35`; only the rest color is new.


### T-090: Make each suites-col row the same height in view and edit
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (screenshot clarify: one row height in both modes; Q1 every first-column row; Q2 empty-edit 17.38)
why: View Athletics→Weirdcraft and Armor→Unarmed are taller than the same rows in edit. `suites-col` has `min-height` only. View `p` keeps island padding and `line-height: 1.2`; edit `input` uses View.css `padding: 0` and filled `height: 1.2em`. Native Language wrapping the name under the label already matches across modes — that is not the bug.
scope: view/edit adjacency `app/src/pages/v2/pageTypes/pageType2/components/GeneralSkills/GeneralSkills.css` and `.../CombatSkills/CombatSkills.css` (`suites-col` cells only). Do not change `View.css`, `index.css`, Adv Skills wrap heights, NotesPanes, page type 1, or JSX unless a selector cannot reach the cell. Do not add `features/`. Do not set `--mapped-row-min-height` on `.page-type-two`.
result: Locked `em`/`p`/`input`/discount `h2` in both suites-cols to `height` + `min-height` 17.38. Suites-col `input.character-value` restates island padding so View.css `padding: 0` / filled `1.2em` cannot shrink or grow the row. Header `h2` and Adv Skills wrap left as-is.
depends on: T-083, T-084, T-086 (done)
deviations from design: none. Tightened after screenshots: the done-check is same row height, not “17.38 somewhere.”


### T-089: Paint leftover zebra behind the note panes
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (Q1 zebra; Q2 17.38; Q3 white first; Q4 visible in edit; Q5 tile on grow)
why: Official blank is lined. These panes are textareas, so leftover `nth-child` zebra does not apply. The designer wants `#f3f3f3` / white bands behind the text.
scope: view/edit adjacency `app/src/pages/v2/pageTypes/pageType2/components/NotesPanes/NotesPanes.css` (and `NotesPanes.tsx` only if a wrapper is required). Do not change `index.css`. Do not change Favor or page-1 notes. Do not convert to leftover list rows. Do not add a shared widget.
result: `repeating-linear-gradient` white then `#f3f3f3` at 17.38px on view `p` and textarea. Vertical padding dropped so the first white band is a full 17.38. Widget `!important` beats edit teal; hover is a 0.35 teal wash over the same zebra.
deviations from design: none
open questions: none

### T-088: Put 15px between Abilities and Burdens & Injuries
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (note gap; Design Q answered)
why: The two note panes sit in `DoubleColumn` at 50% / 50% with no space between them. The designer named 15px between the stacks.
scope: view adjacency `app/src/pages/v2/pageTypes/pageType2/PageType2.css` (column widths / `.page-type-two .double-column` only). Do not change `app/src/pages/v2/pageTypes/components/doubleColumn/DoubleColumn.css` or `DoubleColumn.tsx`. Do not change page type 1. Do not add `features/`.
result: `.page-type-two .double-column` `gap: 15px`. Columns `calc(50% - 7.5px)`. Shared `DoubleColumn` unchanged.
deviations from design: none
open questions: none


### T-087: Index page-type-2 paths on existing L1 keys
status: done
source: rewrite-ledger/v2-page-type.md; rewrite-ledger/feature-index.md, 2026-10-04
why: Indexed files added under view/edit/create/delete must update root YAML in the same body of work. No new user-objective key for “page type 2.”
scope: repository `00-START-HERE.yaml` `routing` adjacencies for view / edit / create / delete / add sheet page only. Do not add a `page type 2` L1 key.
result: New trees listed on create / view / edit / add-sheet / delete `adjacent`. No `page type 2` L1 key. `v2-page-type.md` verification updated after Execute.
deviations from design: none
open questions: none

### T-086: Swap page-type-2 stored cells to edit controls
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/edit-character.md, 2026-10-04
why: Type-2 view cells must become inputs in the existing `isEditing` session without moving boxes.
scope: `app/src/pages/v2/pageTypes/pageType2/` widgets from T-083–T-085. Do not change sidebar, Save POST, or page-1 widgets. No view persist.
result: Stored cells swap to controlled `character-value` inputs / textareas in the same widgets. Leftover + insert on blur. `persistViewField` 0 hits under pageType2.
deviations from design: none
open questions: none

### T-085: Draw Abilities | Burdens & Injuries textareas
status: done
source: rewrite-ledger/page2-view.md (Q6 textarea; Q7 Injuries), 2026-10-04
why: Bottom pair on the official blank is two lined panes, not leftover lists.
scope: `app/src/pages/v2/pageTypes/pageType2/` Abilities / Burdens widgets; reuse `app/src/pages/v2/pageTypes/components/doubleColumn/`. Favor notes are the textarea analog (`Favor.tsx` / `Favor.css`), not a copy-import of Favor.
result: `NotesPanes` in `DoubleColumn` under Combat Skills. Headings Abilities and Burdens & Injuries. `Injures` 0 hits.
deviations from design: none
open questions: none

### T-084: Draw Combat Skills
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04
why: Combat Skills is the second stacked block on the official blank.
scope: `app/src/pages/v2/pageTypes/pageType2/` Combat Skills widgets. Do not change page type 1.
result: Five chrome suites + Combat Skill Discount. Adv combat uses v2 `DisplayPairArray` (`name` as `value`), cap 20, wrap height `calc(10 * 17.38px)`.
deviations from design: none
open questions: none

### T-083: Draw General Skills
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04
why: Type 2 has no widgets. Official blank page 2 starts with the General Skills block.
scope: new `app/src/pages/v2/pageTypes/pageType2/` (`PageType2.tsx`, `PageType2.css`, General Skills widgets). View adjacency `app/src/pages/v2/V2View.tsx` (`case 2` mount only; gutter is T-082). Reuse `doubleColumn` only later (T-085). Do not add `features/`. Do not mount the wordmark.
result: `PageType2` root `.page.card.page-type-two`. Seven suites + Native Language + two discounts. Adv general local 3-field leftover/insert, cap 36, wrap height `calc(18 * 17.38px)`. No wordmark. `V2View` case 2.
deviations from design: none
open questions: none

### T-082: Make the page gutter generic
status: done
source: rewrite-ledger/add-page-type-1.md; rewrite-ledger/page-reorder.md; Design Q12, 2026-10-04
why: Gutter JSX and `addPageType1After` live only on type 1. Type 2 needs the same `+` / reorder. `+` must insert the **clicked card’s type**. Temp ids must consider every page.
scope: `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/V2View.css`; `app/src/pages/v2/hooks/updates/pageType1Updates.ts` (`addPageType1After` / reorder only); `getV2Updates.ts`; `UpdateInterfaces.ts`; `characterHook.tsx`. Do not change `PageType1.tsx`. Do not persist on click.
result: Gutter after every page. `addPageAfter` copies type 1 or 2. Temp id from all pages that have `pageID` (404 has none). Helpers on `pageGutterUpdates`. CSS `.add-page`. Old class 0 hits in `app/src/pages/v2/`.
deviations from design: none
open questions: none

### T-081: Thread pageType2Updates through the v2 hook
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/v2-page-type.md, 2026-10-04
why: `getV2Updates` returns only `PageType1Updates`. Type-2 cells have no local writers.
scope: view/edit adjacency `app/src/pages/v2/hooks/updates/pageType2Updates.ts`; `getV2Updates.ts`; `UpdateInterfaces.ts`; `characterHook.tsx`. Do not import v1. Do not add play-time persist attributes.
result: `PageType2Updates` + `mapPage2` writers (caps 36/20). `getV2Updates` returns type-1, type-2, and gutter. `characterHook` exposes `pageType2Updates`.
deviations from design: none
open questions: none

### T-080: Persist and delete page type 2; gate Save on type-2 count
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/add-page-type-1.md, 2026-10-04
why: `savePages` `default` is a no-op. `deletePages` `default` is true. The Save gate counts type 1 only.
scope: edit primary `backend/server/v2/edit/utilities/savePages.ts`; new `backend/server/v2/edit/utilities/persistPageType2.ts` and `backend/server/v2/edit/utilities/pageType2/`; `backend/server/v2/edit/editV2CharacterController.ts` (count gate only); delete `backend/server/v2/delete/utilities/deletePages.ts`; new `backend/server/v2/delete/utilities/deletePagesUtilities/pageType2/`. Copy `persistPageType1` / `savePageType1` / `deletePageType1`. Reuse `backend/server/v2/add/pageType2/`. Do not rewrite `query()`. Do not change `/v2/edit/:characterID/field`.
result: `savePages` / `deletePages` case 2. Basics upsert on unique `pageID`; suites SELECT then UPDATE/INSERT (`query()` hides rowCount). Adv lists delete-not-in + update/insert. Save refuses if stored type-1 or type-2 count is short.
deviations from design: done-when `grep case 2` on `editV2CharacterController.ts` is 0; the gate is a type-2 count SQL as the steps named, not a switch.
open questions: none

### T-079: Insert one page-type-2 on Create character
status: done
source: rewrite-ledger/page2-view.md (Q2 yes), 2026-10-04
why: `addV2CharacterController` inserts `pageTypeID` 1 only. Comments about type 2 are not approval; this TODO is.
scope: create primary `backend/server/v2/add/addV2CharacterController.ts`; new `backend/server/v2/add/pageType2/` (mirror `addPageType1`: insert default basics + seven general suite rows + five combat suite rows). Do not backfill existing characters. Do not change home slot limits.
result: Create inserts type 1 at index 0 then type 2 at index 1. `addPageType2` writes basics + suites 1–7 and 1–5. Stale “Add page type 2” comment removed. Type-3 comment left.
deviations from design: none
open questions: none

### T-078: Assemble page type 2 and empty defaults
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/v2-page-type.md, 2026-10-04
why: `assembleV2Character` `default` returns `{ type: 404 }`. `getCharacterPages` already loads every `v2CharacterPages` row.
scope: view primary `backend/server/v2/view/assembleV2Character/assembleV2Character.ts` (`switch` only); new `backend/server/v2/view/assembleV2Character/utilities/pageType2/`; view adjacency `app/src/pages/v2/hooks/updates/emptyPageType2.ts`. Copy structure from `assemblePageType1` / `emptyPageType1`. Do not change `getCharacterName` (still first type-1).
result: `assemblePageType2` fills a full `Page2` from the five tables. `assembleV2Character` case 2. `emptyPageType2` matches the skeleton. `getCharacterName` still first type-1.
deviations from design: none
open questions: none

### T-077: Create page-type-2 tables on boot
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/schema-on-boot.md, 2026-10-04
why: Live postgres has no type-2 stores. Snapshot and `ensureSchema` must match.
scope: unindexed `backend/server/db/ensureSchema.ts`; new `backend/server/v2/backupTables/page2.sql`. Do not change `page1.sql`. Do not insert `v2CharacterPages` type-2 rows.
result: Five tables in `page2.sql` and `ensureSchema`. Unique on `v2Page2Basics.pageID`. Fail closed if any table is missing. No type-2 page backfill (`pageTypeID = 2` 0 hits in `ensureSchema`).
deviations from design: none
open questions: none

### T-076: Add Page2 contract and union member
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04
why: Assemble, persist, and the view switch need a `type: 2` payload. `PageV2` is only `Page404Error | Page1`.
scope: contracts `backend/common/interfaces/v2/pageTypes.ts`; new `backend/common/interfaces/v2/page2/` (basics, general suites, combat suites, adv-skill rows). Do not change page-1 interfaces. Do not add `features/`.
result: `Page2` with the `page2-view.md` stores. `PageV2` is `Page404Error | Page1 | Page2`. `npx tsc --noEmit -p backend/common` succeeds.
deviations from design: none
open questions: none

### T-075: Refuse full Save unless `request.user` is the owner
status: done
source: rewrite-ledger/page-reorder.md, 2026-10-03 (Q4 API-direct saves); rewrite-ledger/edit-character.md (owner check revised)
why: `editV2Character` compares `ownerID` to `body.userInfo.userID`. Field POST already uses `request.user?.id`. A forged body can persist a reorder (and the rest of the sheet).
scope: edit character primary `backend/server/v2/edit/editV2CharacterController.ts` (`editV2Character` owner `if` only). Do not change `savePages`, `persistPageType1`, the type-1 count gate, or `/v2/edit/:characterID/field`. Do not change v1 edit.
result: Owner `if` is `ownerID === request.user?.id`. Posted `userInfo.userID` is unused. Refuse message unchanged.
deviations from design: none
open questions: none

### T-074: Add edit-only swap / top / bottom left of `+`
status: done
source: rewrite-ledger/page-reorder.md, 2026-10-03 (Q1 reorder; Q2 first has swap; Q3 local until Save; Q4 isEditing; Q5 no empty slots; Q6 tooltip drafts; Q7 swap | top | bottom | add)
why: Extra page-type-1 sheets can be added but not reordered. Save already writes `v2CharacterPages.index` from array order. The designer wants the three controls on the existing gutter row.
scope: view/edit adjacency `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/V2View.css`; `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`. Do not change `PageType1.tsx`. Do not change `persistPageType1` / `savePages` / `getCharacterPages`. Do not implement add-page. Do not import v1. Do not add `features/`.
result: Gutter row is swap | top | bottom | `+`. Helpers no-op at the ends. First-type-1 change updates `character.name` and catalog extras. Scroll uses `sheet-${pageID}`.
deviations from design: 8px gap between gutter buttons so shadows do not stack.
open questions: none

### T-073: Keep extra names on catalog cache; write them on Save
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (Q8 confirm)
why: Home uses redux and skips GET when the cache exists. `updateCatalogInfo` replaces the whole `CharacterHomeInfo`, so a first-page name patch drops extras and hides the icon.
scope: unindexed `app/src/redux/slices/usersCharactersSlice.tsx` (`updateCatalogInfo`); edit adjacency `app/src/pages/v2/hooks/characterHook.tsx` (`saveCharacterToBackend` success only). Optional helper next to `firstPage1` in `app/src/pages/v2/hooks/updates/pageType1Updates.ts` (export; do not invent a new owner). Do not change `dispatchCatalog` / `restoreCatalogFromSnapshot` payloads beyond what the reducer merge covers. Do not write extras on keystroke or Revert. Do not refetch `/allOfUsersCharacter` on Save. Do not add `features/`.
result: `updateCatalogInfo` keeps extras when the key is omitted. Successful Save writes `otherPageType1Names` from type-1s after the first. `otherPageType1Names()` exported next to `firstPage1`.
deviations from design: none
open questions: none

### T-072: Catalog `fa-user` slot and extra-name tooltip
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (Q2 separate slot; Q3 inherit; Q4 empty → New Character; Q5 one line; Q6 reuse `my-tooltip`; Q7 row click)
why: Extra names are on the payload. The row still shows only the first name.
scope: list adjacency `app/src/pages/home/components/charactersRowDisplay/component/CharacterRow.tsx`; `.../charactersRowDisplay/CharacterRowsDisplay.css`. Unindexed `app/src/App.tsx` only if the shared `Tooltip` needs `white-space: pre-line` so `\n` breaks. Do not add a tooltip package. Do not add a Font Awesome kit. Do not change v1 display except that shared `CharacterRow` stays quiet when the array is missing/empty. Do not add `features/`.
result: Name+icon share the 25% name column. `fa-user` only when extras exist. `my-tooltip` lists extras, `\n` + `pre-line` on the shared Tooltip. Empty → `New Character`.
deviations from design: none beyond Order (shared 25% column).
open questions: none

### T-071: Put extra type-1 names on the v2 home list payload
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (catalog icon; Q1 fold)
why: Home SQL returns only the first type-1. The catalog icon needs the other names without a sheet GET.
scope: list-characters primary `backend/server/controllers/home/v2/getCharacters.ts`; list adjacency `backend/common/interfaces/characterInterfaces.ts` (`CharacterHomeInfo`). Do not change v1 `getCharacters` or `HomeController` assembly. Do not add a route. Do not add `features/`.
result: `CharacterHomeInfo.otherPageType1Names` optional. v2 SQL `array_agg` of later type-1 names, quoted alias, `'{}'` when none. v1 SQL unchanged.
deviations from design: none
open questions: none


### T-070: Refuse Save 200 when stored type-1 count is short
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (persist miss; do not 200 a shorter list)
why: Client `captureLoaded`s any 200 that has `pages`. A silent missed INSERT looks like a successful Save and drops the extra cards.
scope: edit character primary `backend/server/v2/edit/editV2CharacterController.ts` (`editV2Character` after `savePages`). Existing `checkForContentTypeBeforeSending`. Do not change `getV2Character` / `assembleV2Character` to return-without-send. Do not change `characterHook` or add a frontend count check.
result: After `savePages`, stored type-1 count vs posted type-1 count. Short → `{ message: 'Could not save all sheets' }` with no `pages`. Else `getV2Character`.
deviations from design: stored row count, not a split reassemble (Order).
open questions: none

### T-069: Persist page-type-1 by row existence; fail closed on mint
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (persist miss; Q1 extras gone, Q2 no server errors)
why: `persistPageType1` UPDATEs whenever `pageID > 0`. UPDATE of a missing id writes nothing. `query()` hides `rowCount`. Save then 200s the old one-page assemble.
scope: edit character primary `backend/server/v2/edit/utilities/persistPageType1.ts`. Same T-055 pattern as `saveBasicCharacteristics` (SELECT then UPDATE or INSERT). Do not change `savePages` switch, `addV2CharacterController`, `/v2/edit/:characterID/field`, or `query()`.
result: SELECT `id`+`characterID` before UPDATE. No row or `pageID <= 0` → INSERT. Throw if minted id is not a number `> 0`.
deviations from design: none
open questions: none

### T-068: Allow several v2CharacterPages rows per character
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (persist miss; Q1+Q2 landmine, not the live miss)
why: A unique on `v2CharacterPages.characterid` alone would block a second sheet. Snapshot `basicData.sql` has `id` PK only. Live postgres is not in this repo.
scope: unindexed `backend/server/db/ensureSchema.ts`. Verify `backend/server/v2/backupTables/basicData.sql` (`v2characterpages` only). Do not change `page1.sql`. Do not unique `(characterid, index)`. Do not rewrite `query()`.
result: `ensureSchema` drops characterid-only uniques/indexes on `v2characterpages` and throws if one remains. `basicData.sql` left unchanged (no unique `characterid`). Restart to apply.
deviations from design: none
open questions: none


### T-067: Insert new page-type-1 rows on Save
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (design Q1: persist on character Save)
why: `savePages` / `savePageType1` / `saveGeneralInfo` only UPDATE by `pageID`. A temp `pageID <= 0` writes nothing. There is no `v2CharacterPages` insert on edit.
scope: edit character primary `backend/server/v2/edit/editV2CharacterController.ts`; `backend/server/v2/edit/utilities/savePages.ts`; new helper under `backend/server/v2/edit/utilities/` (name as needed). Reuse `backend/server/v2/add/pageType1/addPageType1.ts`. Do not add a route. Do not change `addV2CharacterController` or `/v2/edit/:characterID/field`.
result: `savePages(characterID, pages)` walks array order. Existing type-1: update `index` then `savePageType1`. `pageID <= 0`: INSERT `v2CharacterPages`, `addPageType1`, then save. No new route.
deviations from design: none
open questions: none

### T-066: Assemble v2 pages in stored index order
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (design Q8: page order is stored)
why: `v2CharacterPages.index` exists and create writes `0`. `getCharacterPages` is `select *` with no `ORDER BY`, so insert-after cannot round-trip.
scope: view character primary `backend/server/v2/view/viewV2CharacterController.ts` (`getCharacterPages`). Do not change assemble mapping or `CharacterPageReturns` unless a new column is read.
result: `getCharacterPages` is `select * from v2CharacterPages where characterID = $1 order by index`.
deviations from design: none
open questions: none

### T-065: Keep catalog identity on the first page-type-1
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (design Q4 first page only)
why: `getV2Characters` joins every `v2GeneralInfo` row. A second page-type-1 would list the same character twice. `updateGeneralInfoField` also writes `character.name` and `dispatchCatalog` from any page.
scope: list-characters primary `backend/server/controllers/home/v2/getCharacters.ts`; edit adjacency `app/src/pages/v2/hooks/updates/getV2Updates.ts` (`dispatchCatalog`); `app/src/pages/v2/hooks/updates/pageType1Updates.ts` (`updateGeneralInfoField` `character.name` write). Do not change `restoreCatalogFromSnapshot` / `sheetName` (already `firstPage1`). Do not change create-character slot limit.
result: Home SQL keeps one row per character (lowest type-1 `index`). `dispatchCatalog` and `character.name` only follow the first type-1 in `pages`.
deviations from design: none beyond Order (home SQL).
open questions: none

### T-064: Insert a blank page-type-1 locally from an edit-only +
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (design Q1 local-until-Save; Q3 edit-only; Q5 `+` quieter; Q6 unbounded; Q7 no scroll)
why: V2View already maps every page. There is no control to add another type-1 instance. The add must stay local so Revert and leave-warn match the edit session.
scope: view/edit adjacency `app/src/pages/v2/V2View.tsx`; new `app/src/pages/v2/V2View.css` (or equivalent view-slice chrome CSS — not `PageType1.css`, not `index.css`); `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`. New helper on the v2 slice for the empty `Page1` skeleton and `addPageType1After` (e.g. next to `pageType1Updates.ts`). Do not change `PageType1.tsx`. Do not import v1. Do not add `features/`. Same change: root `00-START-HERE.yaml` routing key for this objective (primary `backend/server/v2/edit/`; adjacent `app/src/pages/v2/`, `backend/server/v2/add/pageType1/`, `backend/common/interfaces/v2/`, `backend/server/controllers/home/v2/getCharacters.ts`).
result: Edit-only `+` under each type-1 card. `addPageType1After` splices `emptyPageType1` with a unique `pageID <= 0`. L1 key added. Revert still drops unsaved pages.
deviations from design: none
open questions: none



### T-063: Reveal view-input locations (v1 eye button)
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design: location highlight; Q1 exact v1 copy; Q2 as v1 who-sees; Q3 no blank gate; Q4 default off; Q5 highlight; Q6 face hover off only while shown; Q7 die cell teal fills; Q8 session-only; Q9 selected flame stays)
why: Phase-1 inputs are always on the view and transparent. v1 shows where they are with a sidebar eye button and `view-quick-edit`. The designer wants that working on v2, under Edit.
scope: edit adjacency `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/components/sidebar/Sidebar.tsx`; `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css`.
result: Session `viewQuickEdit` default off. Sidebar eye button under Edit, exact v1 copy, not owner-gated. `view-quick-edit` on `page-shell` when on and not editing. Die cells get Edit teal fills; unselected hover face filter is none. T-059 rule and selected flame unchanged.
deviations from design: `view-quick-edit` is applied only when `!isEditing` (v1 can set both classes). Local state is named `viewQuickEdit` to match v1; that is not a `/quickEdit` route.
open questions: none



### T-062: Persist Self Doubt / Damage / Stress dieIndex on click
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design: selected dice must persist; Q1 persist clear-to-0; Q2 Edit session unchanged)
why: T-061 persists view inputs on blur. Die cells are `<p>` clicks, so `dieIndex` stays local. The designer wants the selected die written too.
scope: edit primary `backend/common/interfaces/v2/page1/viewPersist.ts`; `backend/server/v2/edit/editV2FieldController.ts`; `.../utilities/pageType1/utilities/saveViewField.ts`; edit adjacency `app/src/pages/v2/hooks/characterHook.tsx` (`viewFieldValue`, `patchViewField` only); `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.tsx` (the three `DieRow` `onSelect`s).
result: Allowlist adds `selfDoubtDieIndex` / `damageDieIndex` / `stressDieIndex`. One-column `dieIndex` UPDATEs. DieRow `onSelect` calls `persistViewField` with the next index including `0`. Edit session still skips POST. No DieRow markup or CSS change.
deviations from design: Attribute names locked at Order so they do not collide with current-total `'damage'` / `'stress'`.
open questions: none



### T-061: Blur view inputs to persist; spinner on the sidebar
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design phase 2; Q1–Q8)
why: Persist is on blur of view inputs, owner-only. v1 replaces sidebar buttons with `LoadingIndicator` `secondary` while that POST is in flight. Full `saveCharacterToBackend` nulls the sheet.
scope: edit adjacency `app/src/pages/v2/hooks/characterHook.tsx`; `.../hooks/interfaces/UpdateInterfaces.ts`; `.../V2View.tsx`; `.../components/sidebar/Sidebar.tsx`; view widgets `.../pageType1/components/GeneralInfo/GeneralInfo.tsx` (Unspent only); `.../Favor/Favor.tsx` (Current Favor only); `.../Vitals/Vitals.tsx` (Die Penalty, Current Damage, Current Stress). Unindexed `app/src/components/loading/components/LoadingIndicator.tsx` (reuse).
result: `persistViewField` on the five view-input `onBlur`s. No-op when editing, non-owner, or snapshot already matches. In-flight count drives `isViewSaving`; sidebar shows `LoadingIndicator` `secondary`. Success patches snapshot + cache. Failure toasts. `setCharacter(null)` still only on full Save. Die click unchanged.
deviations from design: Die rows are not inputs; no persist (Q7). Skip POST when the blurred value equals the snapshot. Overlapping blurs patch through `revertedRef` so the second success does not wipe the first.
open questions: none

### T-060: Persist one view-input column under `/v2/edit/:characterID/field`
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design phase 2; Q1 onBlur; Q2 field-only; Q3 skip non-owner POST; Q4 toast on client)
why: View play-time inputs are local only. A full-character POST would rewrite sibling columns. v1 `/quickEdit` is rejected as a v2 route.
scope: edit character primary `backend/server/v2/edit/editV2CharacterRoutes.ts`; new `backend/server/v2/edit/editV2FieldController.ts`; new `.../utilities/pageType1/utilities/saveViewField.ts`; new `backend/common/interfaces/v2/page1/viewPersist.ts`.
result: `POST /:characterID/field` on the existing router. Owner is `request.user?.id`. One-column UPDATEs for `unspent` / `currentFavor` / `diePenalty` / `damage` / `stress`. Unknown attribute and non-owner refuse with no write. Existing full-row savers unchanged. No `/quickEdit`.
deviations from design: none
open questions: none


### T-059: Teal-tint unselected die faces on hover
status: done
source: rewrite-ledger/quick-view-inputs.md, rewrite-ledger/page1-view.md, 2026-10-03 (design: hover teal + cursor; Q1 default teal on the white face)
why: T-058 made die cells clickable on the view. Hover teal and `cursor: pointer` exist only under `.view-edit`, and that paints the **cell**. The designer wants the **white face** tinted default teal and the cursor changed.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css` (`.die-row p` and `img` only). Do not change `Vitals.tsx`, die PNGs, `dieIndex` click, Anointed, `index.css`, selected T-057 filter, or `.view-edit` cell fills / hover.
result: View `.die-row p` is `cursor: pointer`. Unselected hover `img` uses `invert(1) invert(30%) sepia(1) saturate(0.8) hue-rotate(165deg) brightness(2.2) contrast(1)` (face near `#ADD8E6`, ink near-white). Selected hover stays the T-057 flame string. View cell hover background stays transparent. Edit even/odd fills and `rgb(145, 181, 194)` hover unchanged. No `mix-blend-mode`. No TSX change.
deviations from design: Face is near `#ADD8E6` (sampled ~`#b1d2ec`); exact hex not required. Chrome serializes `invert(25%)` as `invert(0.25)`.
open questions: none


### T-058: Show page-type-1 quick view inputs
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design: phase 1 inputs only; named set)
why: Those play-time cells already swap behind `isEditing`. The view (`isEditing` false) still shows `p`, and die clicks are gated. Phase 1 is the view controls. No persist, no Edit toggle.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/GeneralInfo/GeneralInfo.tsx` (Unspent CrP only); `.../Favor/Favor.tsx` (Current Favor only); `.../Vitals/Vitals.tsx` (`DieRow` click, Die Penalty, Current Damage, Current Stress); `app/src/pages/v2/V2View.tsx` (`beforeunload` / `useBlocker` gate only). Do not change `characterHook` `isDirty`. Do not change CSS, sidebar, backend, or any other widget. Do not import v1. Do not add `features/`.
result: Unspent, Current Favor, Die Penalty, Current Damage, and Current Stress are always the existing number inputs. DieRow click is ungated and no longer reads `isEditing`. `V2View` leave-warn is `isDirty && isEditing`. Spent / max / thresholds stay gated. No POST.
deviations from design: none beyond Order (Q4/Q5 readings already on the TODO).
open questions: none

### T-057: Recolor selected die face to flame; ink white
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-03 (design: drop outline; Q1 white face → orange, black → white)
why: Selected is `outline: 2px solid black` on the cell. Designer wants CSS-only glyph recolor: face `#b45f06` (vault flame / `index.css`), ink white. Cell grey / edit teal stay.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css` (`.die-row p.selected` and `img`). Do not change `Vitals.tsx`, die PNGs, `dieIndex` click, Anointed, `index.css`, or unselected dice.
result: Outline removed. `.die-row p.selected img` uses `invert(1) invert(25%) sepia(1) saturate(2) hue-rotate(-10deg) brightness(1.6) contrast(1.3)`. Cell fills unchanged.
deviations from design: Black-to-`#b45f06` after `invert(1)` needs a partial second invert; without it the face stays black. Face is near-flame, ink near-white.
open questions: none

### T-056: Replace v2 sheet cache after successful Save
status: done
source: rewrite-ledger/edit-character.md, 2026-10-03 (design Q2: other fields persist; Redux cache must update)
why: `characterCache[2][id]` keeps the first view GET. Save only `captureLoaded`s. Home hover skips GET when the slot exists, so a revisit shows the pre-Save sheet.
scope: edit adjacency `app/src/pages/v2/hooks/characterHook.tsx` (`saveCharacterToBackend`). Existing `cacheCharacterV2` in `app/src/redux/slices/characterCacheSlice.tsx`. Do not add a reducer. Do not write the cache on keystroke. Do not change `updateCatalogInfo`. Do not import v1 hooks. Do not change v1 cache.
result: T-051 already dispatches `cacheCharacterV2` with `Promise.resolve(data)` after successful Save. Empty-name and failed POST do not. No second dispatch added.
deviations from design: none (step 2 skip).
open questions: none

### T-055: Upsert v2BasicCharacteristics by pageID
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/schema-on-boot.md, 2026-10-03 (design: Yb / Cultural Strength / Discount not saving; Q3 upsert only)
why: Those three drawn fields live only on `v2BasicCharacteristics`. Add/get/save/delete use `pageID`. The snapshot still has `characterid`. `ensureSchema` never adds `pageID`. Save is UPDATE only. `query()` swallows errors and hides `rowCount`, so a missing column or row looks like success and assemble returns `0` / `''` / `0`.
scope: unindexed `backend/server/db/ensureSchema.ts`; unindexed `backend/server/v2/backupTables/page1.sql` (`v2BasicCharacteristics` only); edit primary `backend/server/v2/edit/utilities/pageType1/utilities/saveCharacteristics/utilities/saveBasicCharacteristics.ts`. Do not change `query()`. Do not change frontend updates, Capacity, StrengthNDiscount, or other tables’ `characterid` snapshot columns. Do not fail Save on a missed write.
result: `ensureSchema` adds `pageID`, backfills from `characterid`, unique index, inserts missing page-type-1 rows, fail-closed. Save SELECTs then UPDATE or INSERT. `page1.sql` `v2BasicCharacteristics` uses `pageID`.
deviations from design: none
open questions: none

### T-054: Set attack notes to 12px
status: done
source: rewrite-ledger/page1-view.md, 2026-10-03 (design: Attack Info same size as name input; Q3 font only; Q4 keep box)
why: Notes use the global 15px `character-value`. The attack-name input is 12px. Designer wants Info text at that size only.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Attacks/Attacks.css` (`.attack-notes p` and `textarea`). Do not change `Attacks.tsx`, name input letter-spacing/padding, notes `min-height`/`height` `calc(2 * 17.38px)`, Defenses notes, or `View.css`.
result: `.attacks-v2 .attack-notes p` and `textarea` `font-size: 12px`. Two-line box kept.
deviations from design: none
open questions: none

### T-053: Move attack Damage value onto the Type/Rec row
status: done
source: rewrite-ledger/page1-view.md, 2026-10-03 (design: Damage value down; Q1 label stays; Q2 leftover on Type/Rec row)
why: Row 1 is Meas/Atk/Damage. Row 2 is Type/Rec plus an empty 33%. The designer wants only the Damage value on that leftover. The **Damage** `em` stays on row 1. Meas/Atk stay 33%.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Attacks/Attacks.tsx` and `Attacks.css`. Do not change hooks, payload, `varchar`, notes (T-054), name, Defenses, or `index.css` / `View.css`.
result: First `.attack-row` Damage is `<em>` only. Value `p`/`input` sit in `.attack-damage-value` on the Type/Rec row (`flex: 1; min-width: 0`).
deviations from design: none
open questions: none

### T-052: Warn before leaving unsaved edits
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design Q3)
why: Catalog already updates on general-info keystroke. Leaving without Save would keep that draft name in redux while the DB is old. Warn, then restore catalog from the snapshot if they still leave.
scope: edit adjacency `app/src/pages/v2/V2View.tsx` and/or `app/src/pages/v2/hooks/characterHook.tsx`. Catalog reducer already exists (`updateCatalogInfo`, `index: 1`). Do not add a custom modal. Do not warn on Revert.
result: Dirty is `character !== revertedCharacter`. `beforeunload` while dirty. `useBlocker` + `window.confirm`; confirm restores catalog from the revert snapshot (`index: 1`) then proceeds. Revert does not warn.
deviations from design: `app/src/main.tsx` uses `createBrowserRouter` (`path: '*'`) instead of `BrowserRouter` so `useBlocker` has a data router. Nested `AllRoutes` unchanged.
open questions: none

### T-051: Toast failed or blocked Save; restore draft
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design Q2, Q5)
why: Save click currently sets `isEditing` false and `character` null before POST. Empty name still posts. A thrown axios error leaves the sheet on loading. Failed save is a toast.
scope: root `package.json` (`react-toastify`, same slot as `react-tooltip`); unindexed `app/src/App.tsx` (and `main.tsx` only if CSS import belongs there); edit adjacency `app/src/pages/v2/hooks/characterHook.tsx`; `app/src/pages/v2/V2View.tsx`. Do not change the sidebar button enablement (Q4: v1 — Save stays clickable while editing). Do not add `features/`.
result: `react-toastify` ^11.1.0; `ToastContainer` in `App.tsx`. Empty/whitespace name: no POST, `Name cannot be empty`, stay in edit. POST `data.message` without `pages`, or throw: restore draft, toast, stay in edit. Success: `captureLoaded`, replace v2 `characterCache`, exit edit.
deviations from design: none beyond Order (await success before exiting edit).
open questions: none

### T-050: Coerce empty name to New Character on persist
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design Q2)
why: Empty name is blocked on the client. If a request still arrives with missing or whitespace name, persist `'New Character'` (same string as `v2GeneralInfo.name` default).
scope: edit character primary `backend/server/v2/edit/utilities/pageType1/utilities/saveGeneralInfo.ts` (`saveGeneralInfo`).
result: `name?.trim() ? name : 'New Character'` before the existing `pageID` UPDATE. Ancestry/class/subclass unchanged.
deviations from design: none
open questions: none

### T-049: Lock attack-row view p to empty-edit 17.38
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: shrink view Meas/RI and Type rows to edit; Q1 all five values; Q2 empty-edit 17.38; Q3 keep island; Q4 name and notes stay)
why: T-045 island on `.attack-row p` is `min-height: 17.38` only. Filled 15px `p` line-height 1.2 (18px) plus `padding: 2px` grows the box to ~22px. Empty edit input is `:placeholder-shown { height: 17.38px }`. Designer wants the view row to match that empty-edit box. Do not change the input (filled stays `1.2em` / 18).
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Attacks/Attacks.css` (`.attack-row p` only). Do not change TSX, `View.css`, `index.css`, attack **name**, notes, `.attack-row input`, Defenses, mapped lists.
result: `.attack-row p { height: 17.38px }` only. Island kept. Inputs have no widget height. Browser: view p 17.375; empty edit input 17.375 (delta 0); filled edit 18; name `padding: 2px 4px 0`; notes 34.75. `.page-type-one` offsetHeight and scrollHeight 1068 view and edit.
deviations from design: none beyond Order.
open questions: none


### T-048: Mapped leftover p/input min-height 19.38 via custom property
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: a little height on mapped p/input; Q1 +2px → 19.38; Q2 lists only; Q3 custom property; Q4 stop if 1068 exceeded; Q5 suite-title em matches; revision: attack inputs stay T-045)
why: T-045 locked leftover `p`/`input` at 17.38 border-box. Designer wants +2px on list leftover controls. Attack Meas/Atk/Damage/Type/Rec stay 17.38. View.css `:placeholder-shown { height: 17.38px }` keeps empty insert short unless the widget restates height.
scope: `PageType1.css` (define `--mapped-row-min-height`); `Descriptions.css`; `Flaws.css`; `ReputationDisplay.css`; `Characteristics.css` (emotions); `SocialSuites.css` (`p`/`input`/`em`, not header `h2`). Do not change TSX, `View.css`, `index.css`, Stats, dice, `Attacks.css`, Capacity.
result: `--mapped-row-min-height: 19.38px` on `.page-type-one`. List leftover `p`/`input` and suite-title `em` compute 19.375 (island kept). Leftover p vs insert input delta 0. Header h2 still padding 4px / 21px. `Attacks.css` unchanged (row min 17.38, notes 34.75, name `padding: 2px 4px 0`). Browser: `.page-type-one` offsetHeight 1068 view and edit. View scrollHeight 1084 (16px into card padding); edit scroll 1068.
deviations from design: none beyond Order. 1068 stop is offsetHeight; it stayed 1068 so the bump was kept.
open questions: none



### T-047: Current Emotions cells fill the heading; restore grid lines
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: gaps look terrible; Q1 Current Emotions only; Q3 drop -8px and restore `#bdbdbd` lines; Q4 keep inset)
why: Emotion cells are `width: calc(33.33% - 8px)` in a column-wrap flex with no borders. The heading is full width; leftover cells are invisible white; the T-045 island sits as a short teal chip. T-023 was `repeat(3, 1fr)` with `#bdbdbd` 1px lines.
scope: view character adjacency `Characteristics.css` only. Do not change TSX. Do not change Social Suites, Descriptions, Flaws, Reputation, Attacks, Capacity, `index.css`, `View.css`.
result: `repeat(3, 1fr)` and `#bdbdbd` on cell spans. Island kept on `p`/`input`. Browser view and edit: three cells match Current Emotions `h2` within 1px; leftover borders `rgb(189, 189, 189)` 1px; insert input padding 2px 1px and `content-box` clip; `.page-type-one` 1068.
deviations from design: none beyond Order.
open questions: none



### T-046: Social Suites Stat/Rank tracks and solid header bar
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: Stat/Rank headers misaligned; heading gap not solid; Q1 both header-to-values and left-pane-to-right-pane; Q2 no island on header h2s; Q3 restore h2 padding 4px; Q4 suite-title em keep island; Q5 widen Rank a bit)
why: Header Stat/Rank use `span *` `min-width: 15%` with no `width`, so “Rank” grows and misses the 15% value cells. Left pane `width: 50%` + `border-right: 1px` is content-box, so left/right 15% tracks miss. T-045 `span *` `padding: 2px 1px` + `background-clip: content-box` punches the `#bdbdbd` header bar.
scope: view character adjacency `SocialSuites.css` only. Do not change TSX. Do not change Descriptions, Capacity, Flaws, Reputation, Emotions, Attacks, `index.css`, `View.css`. Do not add a class or shared heading widget.
result: Panes 50% border-box. Tracks 67/15/18 (description 82/18). Header h2 padding 4px, background-clip border-box. Browser view and edit: header Stat/Rank vs title and description Rank within 1px; left Stat/Rank widths match right within 1px; header cells abut; leftover island kept; `.page-type-one` 1068.
deviations from design: none beyond Order (`min-width: 0` on `span *` so 18% Rank is not a floor of 15%).
open questions: none



### T-045: Flush suite borders; island on the control; slim leftover p
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: remove T-044 overflow; Q1 everywhere T-044 applied; Q2 gap between input fill and zebra, no gaps between borders; Q3 keep gap between inputs; Q4/Q5 slim leftover p bloat, Descriptions inner padding consistent)
why: T-044 put `padding: 2px 1px` and `gap: 1px` on the **wrapper**. Suite leftover rows show holes in `#bdbdbd` verticals (padding/gap sit outside the bordered children). Wrapper padding plus child `padding: 4px 4px 0` / Descriptions `padding: 4px` adds to `min-height: 17.38px` (content-box) and overflows `.page-type-one` 1068.
scope: view character adjacency `Characteristics.css` (emotions); `Descriptions.css`; `Flaws.css`; `ReputationDisplay.css`; `SocialSuites.css`; `Attacks.css`. Do not change TSX. Do not change Stats, dice, attack **name**, Capacity, `index.css`, `View.css`. Do not add a shared class.
result: Wrapper padding removed. Island is `padding: 2px 1px` + `background-clip: content-box` (restated `!important` next to mid-teal `background`) on leftover `p`/`input`/`textarea`. Suite `gap` gone; Descriptions/Reputation keep `gap: 1px`. Browser: leftover desc p/input width 168.58, height 17.38 vs 18; suite cells abut; odd-suite clip content-box; attack name `padding: 2px 4px 0` / 326.31 (`calc(100% - 8px)`); `.page-type-one` 1068 view and edit.
deviations from design: none beyond Order (`background-clip: content-box !important` on restated teal so the fill shorthand does not reset clip).
open questions: none



### T-044: Inset mapped and attack non-name controls 2px / 1px
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: Stats-style island; Q1 2px top/bottom 1px sides; Q2 wrapper in view and edit so p and input match; Q3 attack notes inset; Q4 wrap emotions; Q5 suite title inset; Q6 keep suite grid lines; Q7 leftover p too)
why: Mapped list inputs and attack Meas/Atk/Damage/Type/Rec fill the zebra so teal abuts and hides the stripe. Stats already frames the control with wrapper padding. Emotions paint the stripe on the control itself.
scope: view character adjacency `Characteristics.tsx`/`Characteristics.css` (emotion wrap); `Descriptions.css`; `Flaws.css`; `ReputationDisplay.css`; `SocialSuites.css`; `Attacks.tsx`/`Attacks.css` (notes wrap). Stats, dice, attack name unchanged.
result: Wrapper `padding: 2px 1px` and multi-cell `gap: 1px` on maps, leftover `p`, suite title, attack-row, and notes wrap. Emotions cells wrapped in `span`; even-span mid teal. Attack name still `calc(100% - 8px)`. Browser: 2px/1px computed on all listed wrappers; description sibling gaps 1px; leftover desc p/input width 167.80; `.page-type-one` 1068. Superseded for wrapper vs control island and suite `gap` by T-045.
deviations from design: none beyond Order.
open questions: none



### T-043: Descriptions heading as Capacity-at-h2 with matching column widths
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: Descriptions heading like Characteristics but h2; inputs match heading widths; Q1 Descriptions `h2` + Attack/Defense/Rank `h2.minor-heading`; Q2 10px; Q3 first 38%, remaining split equally; Q4 center minors; Q5 copy Capacity flex + % widths; Q6 keep h2 padding 4px and match it on value cells)
why: T-042 header is `h2` Descriptions plus `em` Attack/Defense/Rank with `flex: 1` / `6em` / `28px`. Grey bar eats the Label slot; column labels are not heading cells; value `p`/`input` do not share those tracks (UA input min-width and `width: auto` on the first data cell).
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/descriptions/Descriptions.tsx`; `.../descriptions/Descriptions.css`. Do not change hooks, payload, cap, insert/remove, leftover count, or zebra selector. Do not import `Capacity.css` or Capacity classes. Do not add a global `h2.minor-heading`. Do not change `index.css` or `View.css`. Do not change Flaws, Reputation, Social Suites, Current Emotions, Attacks, or Capacity.
result: Header is `h2` Descriptions plus `h2.minor-heading` Attack/Defense/Rank (10px, centered grey bars). Flex tracks 38/20.6/20.6/20.6; heading vs first leftover/data cell widths match within 0px in view and edit. Odd-span inputs mid teal; `.page-type-one` 1068.
deviations from design: none beyond Order (value-cell padding 4px + border-box; written 20.6%; no row padding).
open questions: none



### T-042: Draw and edit four-field Description rows
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: Q5 header Descriptions | Attack | Defense | Rank; Q6 one line; Q7 insert on any field; Q9 cap 5; Q10 record overflow)
why: Descriptions is one `value` cell via `DisplaySingleArray`. That widget cannot draft four fields. Header is a lone `h2`.
scope: `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`; `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/descriptions/Descriptions.tsx`; `.../descriptions/Descriptions.css`. Do not change `DisplaySingleArray` / `DisplayPairArray`. Do not add a new shared array widget. Do not import v1 `displayArray`. Do not change Flaws, Current Emotions, Reputation, or social-suite rows. Do not change `index.css`.
result: Header Descriptions | Attack | Defense | Rank. One line of four cells; leftover + insert in `Descriptions.tsx`. Insert from any field; clear all four removes the row. Odd-span inputs mid teal; even default. Browser: empty 5 leftovers; insert label and attack; Revert restores; `.page-type-one` 1068.
deviations from design: none
open questions: none

### T-041: Persist Description label, emotions, and player rank
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/schema-on-boot.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: Descriptions four fields; Q1 names `label` / `attackEmotion` / `defenseEmotion` / `rank`; Q2 copy `value` → `label`; Q3 player-facing rank; Q4/Q8 emotions varchar(25) free text; label varchar(500))
why: `Description` is `{ id, value }`. `saveDescriptions` writes the array index into `rank`. The row is four stored fields; `rank` is the drawn number.
scope: `backend/common/interfaces/v2/page1/characteristicsInfo.ts` (`Description`); `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page1.sql`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/utilities/getDescriptions.ts`; `backend/server/v2/edit/utilities/pageType1/utilities/saveCharacteristics/utilities/saveDescriptions.ts`. Do not change `addCharacteristics` (no description rows on create). Do not change delete. Do not change Current Emotions, suite description tables, Flaws, or v1 `cvdescriptions`. Path sits under existing YAML view/edit adjacent `backend/common/interfaces/v2/` and unindexed `ensureSchema` / `backupTables`; no new routing key.
result: `Description` is `label` / `attackEmotion` / `defenseEmotion` / `rank`. `ensureSchema` copies `value` → `label` then drops `value`; emotions varchar(25). get maps pg lowercase; save writes player rank (empty → NULL), never the array index.
deviations from design: Drop `value` after copy (same pattern as `currentEmotions` on basic characteristics). Empty rank persists as NULL, not 0.
open questions: none

### T-040: Stripe odd die cells with the darker teal
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: Q6 stripe die color, do not touch Anointed)
why: T-035 filled every edit die `<p>` with the same teal. Odd dice should use the darker mid teal; even dice stay default.
scope: `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css` (existing `.v2 .view-edit .vitals-v2 .die-row p`). Do not change `Vitals.tsx`, die PNGs, `dieIndex` click, selected outline. Do not change `Favor.css` / Anointed. Do not add selectors to `index.css`.
result: Odd die `p:nth-of-type(odd)` rest `rgb(159, 199, 212)`; even keep default teal; hover on all `rgb(145, 181, 194)`. Anointed CSS unchanged. Browser: 9/9 odd/even split; hover both `rgb(145, 181, 194)`; Anointed default teal; view dice untinted; die-row tops unchanged.
deviations from design: `nth-of-type(odd)` instead of `nth-child(odd)` because the Die h2 is the first child.
open questions: none

### T-039: Darker teal on attack name and striped map inputs
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: darker attack-name and odd-row fills; Q1 mid teal `rgb(159, 199, 212)`; Q2 all maps; Q3 include emotions even; Q4 attack name only; Q5 even-row default teal stays)
why: Global `.view-edit input` teal `rgba(173, 216, 230)` is too light on the attack-name slot and on `#f3f3f3` zebra rows.
scope: view character adjacency, widget CSS only: `app/src/pages/v2/pageTypes/pageType1/components/Attacks/Attacks.css`; `.../descriptions/Descriptions.css`; `.../flaws/Flaws.css`; `.../reputation/ReputationDisplay.css`; `.../socialSuites/SocialSuites.css`; `.../Stats/Stats.css`; `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.css` (emotions). Do not change TSX. Do not change `index.css`. Do not change view `#f3f3f3` / `#bdbdbd`. Do not restyle attack Meas/Atk/Damage/Type/Rec/notes. Do not touch Anointed or die CSS (T-040).
result: Attack name and `#f3f3f3` map-slot inputs rest `rgb(159, 199, 212)` with hover restated `rgb(145, 181, 194)`. Even/white-row inputs stay default teal. Attack non-name fields untouched. Browser: four attack names mid; 20 attack-row inputs default; descriptions/stats/emotions grey slots mid; name hover `rgb(145, 181, 194)`; view `#f3f3f3` unchanged.
deviations from design: none (parity follows live `#f3f3f3` selectors, including h2 offset).
open questions: none


### T-038: Edit Emotional Capacity through the Yb cell
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: edit Yb; Q1 value only; Q2 `≤` stays chrome; Q3 empty → 0)
why: Yb is `≤${capacity}` — the stored number. Bands were all text; there is no `updateCapacity`.
scope: `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/capacity/Capacity.tsx`; `Capacity.css`; `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.tsx` (pass `pageID` / `updates`); `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `getV2Updates.ts`; `hooks/interfaces/UpdateInterfaces.ts`. Do not change `saveBasicCharacteristics.ts` (already writes `capacity`). Do not swap Na / N / Nb / Y / Ya. Do not add a raw capacity label. Do not edit Trauma or CrP `toLvl`.
result: `updateCapacity` writes `characteristicsInfo.capacity`. Edit Yb is `≤` chrome plus a number input; view stays one `p` `≤${capacity}`. Empty/invalid → 0. Na/N/Nb/Y/Ya stay text. Browser: 8→10 updates Nb/Y/Ya (≤5 / ≤15 / >15), Na stays `<0`; clear → 0; Revert restores ≤8; capacity row height unchanged.
deviations from design: none
open questions: none

### T-037: Draw defense name in the empty header h2 slot
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: name under Input; Q7 replace empty h2; Q8 keep header height)
why: `Defense.name` is assembled and saved (`saveDefenses` already `set name = $1`) but `Defenses.tsx` omits it. The left header span is `<h1>Defenses</h1><h2></h2>`.
scope: `app/src/pages/v2/pageTypes/pageType1/components/Defenses/Defenses.tsx`; `Defenses.css`. Do not change `saveDefenses.ts`. Do not add a third header row or a visible **Input** `em`. Do not change notes.
result: Empty `<h2>` replaced with name `p`/`input`. Initiative 23px/border rules narrowed to `span:last-child`. Name 15px Kalam, 17.38px, no extra border. `saveDefenses` unchanged. Browser: name under **Defenses**; header height 43.59 view and edit; Initiative 23px; Revert restores `''`.
deviations from design: the word **Input** is not drawn as a caption (Q7+Q8: name fills the existing slot, no extra line).
open questions: none

### T-036: Persist and draw Favor divineRelationship
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/schema-on-boot.md, 2026-10-02 (design: string under Divine prompt; Q4 `divineRelationship`; Q5 varchar 500; Q6 like notes)
why: The prompt is chrome. There is no stored answer. Favor is `{ anointed, current, max }` only.
scope: `backend/common/interfaces/v2/page1/favor.ts`; `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page1.sql`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getFavor.ts`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/assemblePageType1.ts` (skeleton default); `backend/server/v2/edit/utilities/pageType1/utilities/saveFavor.ts`; `app/src/pages/v2/pageTypes/pageType1/components/Favor/` (`Favor.tsx`, `Favor.css`). `updateFavor` already takes `Partial<Favor>` — no new hook function. Do not change `addFavor` insert beyond table default. Do not reuse relationships / descriptions / notes. Path sits under existing YAML adjacent `app/src/pages/v2/` and unindexed `ensureSchema` / `backupTables`; no new routing key.
result: `Favor.divineRelationship` string; `ensureSchema` `ADD COLUMN IF NOT EXISTS` varchar(500) fail-closed on `divinerelationship`; `getFavor` maps pg lowercase; `saveFavor` writes it. Left column: italic prompt plus notes-style `p`/`textarea`. Browser: empty cell is two lines (34.76px); typed text wraps; Revert restores `''`. `.page-type-one` stayed 1068.
deviations from design: none
open questions: none

### T-035: Teal-tint die cells and Anointed in edit
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: edit teal; Q1 all dice; Q2 darker hover; Q3 Anointed same teal)
why: `.view-edit` fills `input` / `textarea` / `button` / `.fake-button` with `rgba(173, 216, 230)` and hover `rgb(145, 181, 194)`. Die cells are `<p>` and Anointed is a `<span>`, so they stay grey.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css` (existing `.v2 .view-edit .vitals-v2 .die-row p`); `.../Favor/Favor.css` (existing `.v2 .view-edit .favor-v2 .anointed-box`). Do not change `Vitals.tsx` / `Favor.tsx` structure, die PNGs, `dieIndex` click, or Anointed click. Do not add `fake-button`. Do not wrap dice in `<input>` or `<button>`. Do not `filter` the PNGs. Do not add selectors to `index.css`.
result: `.view-edit` die `<p>` and unchecked Anointed use teal `rgba(173, 216, 230)` and hover `rgb(145, 181, 194)` with `!important`. Checked Anointed stays black including hover. No `fake-button`. Cursor rules kept. Browser: 18 die cells teal in edit, transparent in view; selected outline `2px solid black`; die-row tops unchanged on toggle.
deviations from design: none
open questions: none

### T-034: Insert, update, and clear list rows; wire the widgets
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: v1 array edit; Q1–Q6)
why: `padTo` + `[...Array(max)]` writes empty `{ id: 0 }` rows. v1 keeps only real rows, inserts on blur, removes a row whose fields are cleared.
scope: `backend/common/interfaces/v2/page1/characteristicsInfo.ts` (`Emotion`, `Description`, `Flaw`, `CharacteristicPair`); `backend/common/interfaces/v2/pairInterfaces.ts` (`SkillPair`); `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`; `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.tsx` (emotions); `.../descriptions/Descriptions.tsx`; `.../flaws/Flaws.tsx`; `.../reputation/ReputationDisplay.tsx`; `.../socialSuites/components/SocialSuite.tsx`. Do not change Attacks. Do not change backend save SQL (already delete-not-in-ids / update-if-id / insert-if-falsy-id). Caps: emotions 6, descriptions 5, flaws 3, reputations 3, suite description rows 6.
result: `padTo` gone. Five `insert*` append `{ id: 0, key }`. `update*` maps by index and filters empty rows. Call sites pass stored arrays into T-033 widgets. Attacks still four indexed slots. Caps 6/5/3/3/6.
deviations from design: `SkillPair.rank` is `number | ''` so an empty number input is not stored as `0`. Pair `updateReputation` / `updateSocialSuiteDescription` take the full next row (one `apply` per keystroke) instead of `(index, field, value)`.
open questions: none

### T-033: Add v2 DisplaySingleArray and DisplayPairArray
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: v1 array edit; Q1 everything but attacks; Q7 shared widget)
why: v1 list edit is leftover pads plus one extra insert row. v2 always maps `[...Array(max)]`. The shared widgets belong on the v2 view slice, not a new feature folder and not an import of v1.
scope: new `app/src/pages/v2/components/displayArray/` (`DisplaySingleArray.tsx`, `DisplayPairArray.tsx`; optional small CSS only if a class the call site does not already own is required). Do not add files under `app/src/pages/v1/` or `app/src/features/`. Do not import `app/src/pages/v1/components/displayArray`. Path sits under existing YAML adjacent `app/src/pages/v2/`; no new routing key.
result: Widgets on the v2 slice copy leftover + insert-row mechanics, read v2 `EditingContext`, use `makeTempID` for insert keys, and return a fragment. Call sites supply chrome via render props. Wired in the same Execute as T-034.
deviations from design: leftover cells are call-site chrome (empty `span` / `p` / `span.description-row`), not v1’s bare leftover `<p>`, so suite grid lines and emotion 3×2 cells stay. Pair insert remounts via `insertReset` so both uncontrolled fields clear.
open questions: none


### T-032: Restore view boxes; size edit controls only
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: revert T-031 display-side metrics; Q1 empty/filled match via `:placeholder-shown`)
why: T-031 changed view `p`/`h2` and column wrappers (min-height 18px, rank width 28px, suite `p` width 15%, Discount width 42%) so inputs would match. Display must stay at T-029/T-020. Only the control is adjusted. Empty 15px `p` is 17.38px and filled is 18px; a single input `height` cannot match both.
scope: view character adjacency `app/src/pages/View.css`; page-type-1 widget CSS under `app/src/pages/v2/pageTypes/pageType1/` (Attacks, Defenses, Vitals, Favor, GeneralInfo, Stats, Characteristics, SocialSuites, Reputation, Descriptions, Flaws, StrengthNDiscount); swapped `input`/`textarea` in those widgets’ TSX (`placeholder=" "` only). Do not change `index.css` `p` / `p.border`. View-mode baseline for widget CSS is commit `b86b4c6` (T-029, before T-031).
result: Display CSS restored to T-029. `:where` keeps UA reset; filled 15px inputs `height: 1.2em`, empty `:placeholder-shown` `17.38px`, `placeholder=" "` on swapped controls. Input-only copies for attack-name, notes, rank, suites, Flaws, Strength/Discount. `.page-type-one` 1068 both sides. Attack-name input Kalam 12px, not `#bdbdbd`.
deviations from design: Strength/Discount inputs use `width: 0` plus the existing pair `min-width` (not `min-width: 0` / `flex: 1`) so the number cannot grow the row. Discount number is ~4px left / 1px narrower than the overflowing view `p`. Flaws `p` stays shrink-to-content; input is `width: 100%` (step 3) so width cannot match. `:where` also sets `font-size: 15px` / `line-height: 1.2` so `1.2em` is 18px.
open questions: none

### T-031: Match edit inputs to display-tag boxes
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: inputs match display tags; Q1 everything / no move on toggle; Q2 attack name Kalam; Q3 strip number UA padding)
why: T-029 swapped stored cells to inputs. Global `.v2 input.character-value` `font-size: 15px`, `width: 100%`, `min-height: 17.38px` plus UA input padding reflow the sheet on Edit.
scope: view character adjacency `app/src/pages/View.css`; page-type-1 widget CSS under `app/src/pages/v2/pageTypes/pageType1/` that sizes swapped `p`/`h2` (Attacks, Defenses, Vitals, Favor, GeneralInfo, Stats, Characteristics, SocialSuites, Reputation, Descriptions, Flaws, StrengthNDiscount). Do not change TSX structure, computed cells, or `index.css` `p` / `p.border` display metrics.
result: View.css input UA reset via `:where` (no global 15px/100%/17.38px). Widget pairs copy display boxes. Attack name Kalam 12px, not grey fill. 144 `.character-value` rects match within 1px on Edit; `.page-type-one` height 1068 both sides.
deviations from design: Empty 15px pads use min-height 18px (line-height 1.2) so empty `p` matches the input line box. Notes textarea sets `height: calc(2 * 17.38px)` to crush UA `rows`. Discount column width 42% so number min-content cannot grow the row.
open questions: none

### T-027: Add v2 edit-mode chrome
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02
why: v1 session starts with a side Edit button, `EditingContext`, and `view-edit`. v2 has a sidebar stub and no mode.
scope: view character adjacency `app/src/pages/v2/` (`V2View.tsx`; new `contexts/EditingContext.tsx`; new `components/sidebar/Sidebar.tsx` + `Sidebar.css`).
result: v2 `EditingContext`, `.version-two-shell` flex sidebar, Edit gated on `ownsThisCharacter`, Save/Revert while editing, `view-edit` on the page shell. No Download/Pregen/Quick Edit.
deviations from design: none
open questions: none

### T-028: Local v2 updates, revert snapshot, and save POST
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02
why: v1 keeps a character in the hook, mutates it while editing, POSTs the whole object, and Reverts to a snapshot. v2 hook only loads.
scope: `app/src/pages/v2/hooks/characterHook.tsx`; new helpers under `app/src/pages/v2/hooks/`. Gitignored `frontend-config.ts` (`editV2URL`).
result: Snapshot set only in `captureLoaded` (load + after save). Field helpers call `setCharacter` only. POST `editV2URL + id`. Catalog `index: 1` on general-info change. New list rows use `id: 0`.
deviations from design: `frontend-config.ts` was absent here. A local gitignored stub with `editV2URL` was created so tsc could run. The real config still needs `export const editV2URL` beside `viewV2URL`.
open questions: none

### T-029: Swap page-type-1 stored cells to inputs
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02
why: Edit must toggle every stored drawn cell. Computed and static chrome stay display.
scope: view character adjacency under `app/src/pages/v2/pageTypes/pageType1/`.
result: Stored drawn cells swap to controlled `character-value` inputs (notes: textarea). Anointed click-toggles. Die click sets `dieIndex` to `index+1` or `0`. `toLvl`, Trauma, capacity bands stay text. Defense `name` undrawn.
deviations from design: none
open questions: none

### T-030: Add backend v2 edit owner and persist page type 1
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02
why: v1 POSTs the full character to `/edit/:id`, checks owner, writes, reassembles. v2 has no edit owner. New files only.
scope: new `backend/server/v2/edit/`; `backend/server/vault.ts`; `00-START-HERE.yaml`.
result: POST `/v2/edit/:characterID`. Owner check via `getCharacterOwnerID`. Page-type-1 save tree keyed by `pageID`. L1 route added. Reassemble through existing `getV2Character`.
deviations from design: none
open questions: none

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

