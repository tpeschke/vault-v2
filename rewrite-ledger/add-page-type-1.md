# Add sheet page
status: accepted   date: 2026-10-03

Decision: A Character (v2) objective. While editing, the gutter under each rendered sheet card has three labeled adds: **+ Main Info** (always a blank page type 1), **+ Skills & Abilities** (always a blank page type 2), and **+ NPCs & Equipment** (always a blank page type 3). Insert after that card. Local until Save. Catalog identity stays the first page-type-1. Type 2: `page2-view.md`. Type 3: `page3-view.md`.

Why: The designer asked for another copy of page type 1, then a generic copy-type `+` (Q12, 2026-10-04), then two labeled buttons so a type-1-only character can add type 2 (2026-10-04).

Constraints it imposes:
- Edit mode only (`isEditing`). Owners reach it through the existing Edit button. No `+` on the view. No persist on click. No new HTTP route.
- Place the add buttons immediately under each rendered sheet card (type 1, 2, and 3), outside `.page` / `.page-type-one` / `.page-type-two` / `.page-type-three`. All on every instance, including pages added this session. Not in the sidebar. Not inside `PageType1.tsx`, `PageType2.tsx`, or `PageType3.tsx`. Left-to-right: swap | top | bottom | **+ Main Info** | **+ Skills & Abilities** | **+ NPCs & Equipment**. Reorder sits to the left (`page-reorder.md`).
- Labels: `+ Main Info`, `+ Skills & Abilities`, and `+ NPCs & Equipment` (`fa-plus` + that exact text). No tooltip on NPCs & Equipment. Same chrome as the live Main Info control (`.bottom-buttons.add-page`, whitesmoke, orange hover). No edit-teal fill. No scroll-into-view. No cap. `margin-left: auto` on Main Info so the adds sit at the right.
- **+ Main Info** always inserts `emptyPageType1`. **+ Skills & Abilities** always inserts `emptyPageType2`. **+ NPCs & Equipment** always inserts `emptyPageType3`. After that card (array splice). Do not copy the card’s type. Do not clone the current page. Missing `afterIndex`: no-op. Temp `pageID` is a unique number `<= 0` taken from **all** pages’ ids (`makeTempID` is a string; do not use it).
- Posted `pages` order is the stored `v2CharacterPages.index`. View assemble must `ORDER BY index`. Save writes `index` from array position for every posted persisted page. Type 1: UPDATE + `savePageType1` only when a `v2CharacterPages` row exists for that `id` **and** `characterID`; else `INSERT` + `addPageType1` + `savePageType1`. Type 2: same existence upsert via `persistPageType2` / `addPageType2` / `savePageType2` (`pageTypeID` 2). Type 3: same via `persistPageType3` / `addPageType3` / `savePageType3` (`pageTypeID` 3). Temp `pageID <= 0` always takes the INSERT path. Fail closed if INSERT yields no numeric `id > 0` (throw; do not reassemble). Reuse each type’s add tree; do not copy it. Do not create a character. Do not delete unknown page types. Do not rewrite `query()`. Do not use `if (pageID)` / `if (page.pageID)` truthiness (`-1` is truthy).
- `v2CharacterPages` may have several rows per `characterID`. `id` stays the PK. Do not unique `characterid` alone. If live postgres has that unique/index, `ensureSchema` drops it and fails closed if it remains (`schema-on-boot.md`). Snapshot `backupTables/basicData.sql` already has no such unique.
- Revert drops unsaved pages (existing snapshot). Leave-warn already runs while `isEditing` and dirty. After Save, `getV2Character` reassemble stays the **success** body only when stored type-1 count `>=` posted type-1 count **and** stored type-2 count `>=` posted type-2 count **and** stored type-3 count `>=` posted type-3 count. If any is short, send `{ message: 'Could not save all sheets' }` with **no** `pages` key so T-051 restore+toast runs. Do not send `pages: []`. `getV2Character` sends the response; the gate is `v2CharacterPages` counts after `savePages`, not a split assemble. No frontend count check.
- Catalog Name / ancestry / class / subclass / level: first page-type-1 only (`order by index`, same as `assembleV2Character` `getCharacterName`). Home list is one row per character. `updateCatalogInfo` and `character.name` do not follow later pages. Slot limit unchanged. When two or more type-1s are **persisted**, a `fa-solid fa-user` icon sits in its own slot beside the catalog name (not inside the name `<strong>`). Hover lists the other type-1 names (first omitted, `index` order), one per line, on the existing `Tooltip id="my-tooltip"`. Empty extra names display as `New Character`. Icon color/size inherit the name column. Icon click is the row click (open the character). v1: no icon. Unsaved local `+` pages do not appear. No second catalog row. No new tooltip package. No `data-tooltip-html` with unsanitized names. Extra names ride the v2 home payload as `otherPageType1Names`. `updateCatalogInfo` keeps that field when a first-page identity patch omits it. A successful full Save writes it from reassembled type-1s after the first.
- Empty-name Save gate stays the first page-type-1. A new page’s empty name still becomes `'New Character'` on persist (`saveGeneralInfo`).
- Sheet-wide card/session contract: `v2-page-type.md`. Play-time view controls: only cells that page’s topic names (`quick-view-inputs.md`). They stay skipped while `isEditing`.
- Do not add `features/`. Do not add delete or a dropdown type picker. The labeled add buttons are the type choice. Reorder: `page-reorder.md`. Page type 2: `page2-view.md`. Page type 3: `page3-view.md`. Type N instance add is a playbook vertical-slice row (`v2-page-type.md`).

Rejected:
- Persist on click / a new add-page route.
- Tabs, repeating-section rows, or a second catalog character.
- Cloning the clicked page.
- Folding this into Create character. (Revised 2026-10-04: page type N is a separate topic; this gutter now inserts that type when the card is type N.)
- A new inventory row for the catalog icon (Q1: fold into List characters / this file).
- Rewriting `query()` so INSERT errors surface globally.
- A frontend type-1 count check (Q3 unanswered).
- Treating a unique `characterid` as the live miss (Q1 extra cards gone + Q2 no server errors: Save 200 + shorter `pages`).

Revised 2026-10-03 (new sheets not saved; Q1 extras gone after Save; Q2 no server errors):
- “Save inserts new type-1 rows (`pageID <= 0`)” — **revised**: INSERT when no row exists for that `id`+`characterID` (T-055 existence upsert). `pageID <= 0` is still always new. A `pageID > 0` UPDATE that matches zero rows is not success.
- “After Save, `getV2Character` reassemble stays the response” — **revised**: success body only. A shorter stored type-1 list is `{ message }` without `pages`.

Revised 2026-10-03 (catalog extra-name icon; Q1 fold; Q2 separate slot; Q3 inherit; Q4 empty → `New Character`; Q5 one line each; Q6 reuse `my-tooltip`; Q7 row click; Q8 keep extras on the cached row):
- “Home list is one row per character” — **retained**. Extra type-1 names are a tooltip on that row, not a second character.

Revised 2026-10-03 (`page-reorder.md`):
- “Do not add delete, reorder, type picker, or page type N” — **revised**: reorder is `page-reorder.md`. Delete and type picker stay rejected. Page type N is `v2-page-type.md` / `page2-view.md`.
- “Place the `+` immediately under each rendered page-type-1 card” — **revised**: add controls stay at the right of that gutter row.

Revised 2026-10-04 (page type 2; Design Q10 multiple; Q12 gutter generic):
- “`+` under each page-type-1 card inserts another blank page-type-1” — **revised** then: `+` under each card inserts another blank of **that card’s type**.
- “Not on other page types” — **revised**: gutter is generic (`v2-page-type.md`).
- “Temp `pageID` from type-1 ids” — **revised**: min over **all** `page.pageID`.
- “Save gate is type-1 count only” — **revised**: type 1 and type 2 both gated.
- “Do not add … page type N” — **revised**: type 2 is `page2-view.md`.
- Catalog first-type-1 / extra type-1 names — **retained**. Type 2 has no catalog name.
- Create character is not this `+` — **retained**. New characters still gain one type 2 from Create (`page2-view.md`), not from this control.

Revised 2026-10-04 (labeled adds; Q1 every card; Q2 after this card; Q3 Main Info always type 1; Q4 no scroll; Q5 same chrome):
- “`+` copies that card’s type” — **revised**: two labeled buttons. Main Info → type 1. Skills & Abilities → type 2.
- “Type picker still rejected” — **revised**: dropdown / chooser still rejected. Two labeled buttons are the type choice.
- Label bare `+` / `#bdbdbd` — **revised**: live chrome is plus + text, whitesmoke / orange hover.

Revised 2026-10-04 (page type 3; Design Q2 analog, Q3 multiples, Q4 button only, Q14 exact label):
- Two labeled adds — **revised**: third **+ NPCs & Equipment** → type 3, every card, right of Skills.
- Save gate type 1 and type 2 — **revised**: type 3 counted too.
- Type 2 has no catalog name — **retained**. Type 3 has no catalog name.
- Create is not this control — **retained**. New characters gain one type 3 from Create (`page3-view.md`).

Touches: `app/src/pages/v2/`; `backend/server/v2/edit/`; `backend/server/v2/add/pageType1/` (reuse); `backend/server/v2/add/pageType2/`; `backend/server/v2/add/pageType3/`; `backend/server/v2/view/viewV2CharacterController.ts`; `backend/server/controllers/home/v2/getCharacters.ts`; `app/src/pages/home/components/charactersRowDisplay/`; `backend/common/interfaces/characterInterfaces.ts`; unindexed `app/src/redux/slices/usersCharactersSlice.tsx`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/basicData.sql` (verify only); `00-START-HERE.yaml`; `rewrite-ledger/feature-inventory.md`; `rewrite-ledger/page2-view.md`; `rewrite-ledger/page3-view.md`
TODOs: T-064–T-067 (done); persist miss: T-068–T-070 (done); catalog extra names: T-071–T-073 (done); generic gutter / type 2: T-080, T-082 (done); labeled adds: T-092 (done); playbook gutter add: T-093 (done); type-3 add + Save gate: T-104, T-111 (done)
