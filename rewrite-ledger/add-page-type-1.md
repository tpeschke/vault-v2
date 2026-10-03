# Add page-type-1 sheet
status: accepted   date: 2026-10-03

Decision: A new Character (v2) objective. While editing, a `+` under each page-type-1 card inserts another blank page-type-1 after that card. The extra page is local until Save. Catalog identity stays the first page-type-1.

Why: The designer asked for another copy of page type 1 on the same character, not a new page type (`v2-page-type.md`) and not Create character.

Constraints it imposes:
- Edit mode only (`isEditing`). Owners reach it through the existing Edit button. No `+` on the view. No persist on click. No new HTTP route.
- Place the `+` immediately under each rendered page-type-1 card, outside `.page` / `.page-type-one`. One control per type-1 instance, including pages added this session. Not in the sidebar. Not inside `PageType1.tsx`. Not on other page types.
- Label `+`. Color `#bdbdbd`. No edit-teal fill (override `.view-edit button` in `index.css`). No sidebar box-shadow. No scroll-into-view. No cap.
- Insert a blank page-type-1 after the clicked card (array splice). Skeleton matches `assemblePageType1` empty defaults. Do not clone the current page. Temp `pageID` is a unique number `<= 0` (`makeTempID` is a string; do not use it).
- Posted `pages` order is the stored `v2CharacterPages.index`. View assemble must `ORDER BY index`. Save writes `index` from array position for every posted type-1 page. UPDATE + `savePageType1` only when a `v2CharacterPages` row exists for that `id` **and** `characterID`. Otherwise `INSERT v2CharacterPages` + existing `addPageType1` + `savePageType1`. Temp `pageID <= 0` always takes the INSERT path. Fail closed if INSERT yields no numeric `id > 0` (throw; do not reassemble). Reuse `backend/server/v2/add/pageType1/`; do not copy that tree. Do not create a character. Do not delete unknown page types. Do not rewrite `query()`. Do not use `if (pageID)` / `if (page.pageID)` truthiness (`-1` is truthy).
- `v2CharacterPages` may have several rows per `characterID`. `id` stays the PK. Do not unique `characterid` alone. If live postgres has that unique/index, `ensureSchema` drops it and fails closed if it remains (`schema-on-boot.md`). Snapshot `backupTables/basicData.sql` already has no such unique.
- Revert drops unsaved pages (existing snapshot). Leave-warn already runs while `isEditing` and dirty. After Save, `getV2Character` reassemble stays the **success** body only when stored type-1 row count `>=` posted type-1 count. If stored count is lower, send `{ message: 'Could not save all sheets' }` with **no** `pages` key so T-051 restore+toast runs. Do not send `pages: []`. `getV2Character` sends the response; the gate is a `v2CharacterPages` type-1 count after `savePages`, not a split assemble. No frontend count check.
- Catalog Name / ancestry / class / subclass / level: first page-type-1 only (`order by index`, same as `assembleV2Character` `getCharacterName`). Home list is one row per character. `updateCatalogInfo` and `character.name` do not follow later pages. Slot limit unchanged. When two or more type-1s are **persisted**, a `fa-solid fa-user` icon sits in its own slot beside the catalog name (not inside the name `<strong>`). Hover lists the other type-1 names (first omitted, `index` order), one per line, on the existing `Tooltip id="my-tooltip"`. Empty extra names display as `New Character`. Icon color/size inherit the name column. Icon click is the row click (open the character). v1: no icon. Unsaved local `+` pages do not appear. No second catalog row. No new tooltip package. No `data-tooltip-html` with unsanitized names. Extra names ride the v2 home payload as `otherPageType1Names`. `updateCatalogInfo` keeps that field when a first-page identity patch omits it. A successful full Save writes it from reassembled type-1s after the first.
- Empty-name Save gate stays the first page-type-1. A new page’s empty name still becomes `'New Character'` on persist (`saveGeneralInfo`).
- Sheet-wide card/session contract: `v2-page-type.md`. Play-time view controls on each instance: `quick-view-inputs.md` (they stay skipped while `isEditing`).
- Do not add `features/`. Do not add delete, reorder, type picker, or page type N.

Rejected:
- Persist on click / a new add-page route.
- Tabs, repeating-section rows, or a second catalog character.
- Cloning the clicked page.
- Folding this into Create character or into “page type N.”
- A new inventory row for the catalog icon (Q1: fold into List characters / this file).
- Rewriting `query()` so INSERT errors surface globally.
- A frontend type-1 count check (Q3 unanswered).
- Treating a unique `characterid` as the live miss (Q1 extra cards gone + Q2 no server errors: Save 200 + shorter `pages`).

Revised 2026-10-03 (new sheets not saved; Q1 extras gone after Save; Q2 no server errors):
- “Save inserts new type-1 rows (`pageID <= 0`)” — **revised**: INSERT when no row exists for that `id`+`characterID` (T-055 existence upsert). `pageID <= 0` is still always new. A `pageID > 0` UPDATE that matches zero rows is not success.
- “After Save, `getV2Character` reassemble stays the response” — **revised**: success body only. A shorter stored type-1 list is `{ message }` without `pages`.

Revised 2026-10-03 (catalog extra-name icon; Q1 fold; Q2 separate slot; Q3 inherit; Q4 empty → `New Character`; Q5 one line each; Q6 reuse `my-tooltip`; Q7 row click; Q8 keep extras on the cached row):
- “Home list is one row per character” — **retained**. Extra type-1 names are a tooltip on that row, not a second character.

Touches: `app/src/pages/v2/`; `backend/server/v2/edit/`; `backend/server/v2/add/pageType1/` (reuse); `backend/server/v2/view/viewV2CharacterController.ts`; `backend/server/controllers/home/v2/getCharacters.ts`; `app/src/pages/home/components/charactersRowDisplay/`; `backend/common/interfaces/characterInterfaces.ts`; unindexed `app/src/redux/slices/usersCharactersSlice.tsx`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/basicData.sql` (verify only); `00-START-HERE.yaml`; `rewrite-ledger/feature-inventory.md`
TODOs: T-064–T-067 (done); persist miss: T-068–T-070 (done); catalog extra names: T-071–T-073
