# Add sheet page
status: accepted   date: 2026-10-03

Decision: A Character (v2) objective. While editing, each sheet card (type 1, 2, 3, and 4) has its own gutter disclosure. Resting shows reorder (`page-reorder.md`) and one `fa-solid fa-file-circle-plus`. Disclosed shows **+ Main Info** (always a blank page type 1), **+ Skills & Abilities** (always a blank page type 2), **+ NPCs & Equipment** (always a blank page type 3), and **+ Notes** (always a blank page type 4), then a far-right `fa-solid fa-rotate-left`. Insert after that card. Local until Save. Catalog identity stays the first page-type-1. Type 2: `page2-view.md`. Type 3: `page3-view.md`. Type 4: `page4-view.md`.

Why: The designer asked for another copy of page type 1, then a generic copy-type `+` (Q12, 2026-10-04), then two labeled buttons so a type-1-only character can add type 2 (2026-10-04). On 2026-10-30 the labeled adds, including **+ Notes**, moved behind file-circle-plus so the resting gutter is the reorder set.

Constraints it imposes:
- Edit mode only (`isEditing`). Owners reach it through the existing Edit button. No `+` on the view. No persist on click. No new HTTP route.
- Place the gutter immediately under each rendered sheet card (type 1, 2, 3, and 4), outside `.page` / `.page-type-one` / `.page-type-two` / `.page-type-three` / `.page-type-four`. Every instance, including pages added this session. Not in the sidebar. Not inside `PageType1.tsx`, `PageType2.tsx`, `PageType3.tsx`, or `PageType4.tsx`. Disclosure is per card, keyed by `pageID`. Opening or closing one card does not change the others. A card with no flag is resting.
- Resting mounts the reorder buttons (`page-reorder.md`), one icon button `fa-solid fa-file-circle-plus` with `margin-left: auto`, then the delete button (`delete-sheet-page.md`). Tooltip on existing `Tooltip id="my-tooltip"`: `Click to Add New Pages`. No text label. That click discloses this card only and does not insert a page. The labeled adds are not mounted. The file-circle-plus button uses `.bottom-buttons` (whitesmoke, orange hover), same as reorder.
- Disclosed mounts, left to right: **+ Main Info** | **+ Skills & Abilities** | **+ NPCs & Equipment** | **+ Notes** | `fa-solid fa-rotate-left`. Reorder and file-circle-plus are not mounted. The first labeled add keeps `margin-left: auto`. The rotate-left button is last, so it is the far-right control. Tooltip: `Never mind` (catalog string; set in `6b8eba5`). That click returns this card to resting. It does not call the sidebar snapshot Revert, does not remove a page, and does not persist. Its class is `primary`, the catalog revert. It does not use `.bottom-buttons`.
- Gutter buttons use a stable React `key` that differs between the resting set (`swap`, `top`, `bottom`, `disclose`, `delete`), the armed-delete set (`delete-confirm`, `delete-cancel`), and the disclosed set (`add-main`, `add-skills`, `add-npcs`, `add-notes`, `rest`). The kit nests an SVG inside `<i>` (`app/index.html`, `autoReplaceSvg: 'nest'`) and leaves that SVG when the class changes on the same node. A new key mounts a new `<i>`, so each labeled add draws `fa-plus`.
- Clicking a labeled add inserts as below, then this card returns to resting. Other cards stay as they were.
- When `isEditing` becomes false, every card is resting. That includes the Edit toggle, a successful Save, and the sidebar Revert in `V2View.tsx`.
- Labels: `+ Main Info`, `+ Skills & Abilities`, `+ NPCs & Equipment`, and `+ Notes` (`fa-plus` + that exact text). No tooltip on NPCs & Equipment or Notes. Same chrome as the live Main Info control (`.bottom-buttons.add-page`, whitesmoke, orange hover). No edit-teal fill. No scroll-into-view. `margin-left: auto` on the first labeled add so the disclosed adds sit at the right, with the rotate-left button after them.
- A character holds at most 15 sheets, types 1–4 together. The count is `character.pages.length`, including sheets added this session. The number and the sentence live once in `backend/common/interfaces/v2/sheetPageCap.ts`: `SHEET_PAGE_MAX` is 15, `SHEET_PAGE_CAP_MESSAGE` is `You can only have 15 pages per character sheet.`
- At 15 or more, file-circle-plus is native `disabled` and does not disclose. The icon stays `fa-file-circle-plus`. Key stays `disclose`. The tooltip is `SHEET_PAGE_CAP_MESSAGE`. A native disabled button does not receive that tooltip, so the attributes sit on a focusable wrapper (`tabIndex={0}`) around the button, and the button has `pointer-events: none`. The wrapper is the flex item and keeps `margin-left: auto`. Under 15, the resting tooltip stays `Click to Add New Pages` on the button itself.
- Under 15, a disclosed gutter shows `${length} / ${SHEET_PAGE_MAX}` (spaces around the slash) as its first flex child. Text, not a button, not `.bottom-buttons`. Key `page-count`. Same tooltip sentence, on that text. At 15 or more the counter is absent.
- A row already disclosed when the count reaches 15 stays disclosed until one of its labeled adds is clicked. That click, when `character.pages.length >= SHEET_PAGE_MAX`, does not insert. It returns that card to resting, which hides that card’s add buttons and the counter, and calls `toast.error(SHEET_PAGE_CAP_MESSAGE)` with no options (the default Save toast). Other cards’ disclosure flags stay. A click while the count is under 15 still inserts, then that card returns to resting, with no toast.
- Full Save: when `pages.length > 15`, respond `{ message: SHEET_PAGE_CAP_MESSAGE }` and no `pages` key, before `savePages`, and write nothing. A list of 15 still saves. A character already stored with more than 15 sheets fails this check on every full Save, including one that does not add a sheet. The client already toasts `data.message` and restores the draft (`edit-character.md`). A field write of an existing page is not this refusal.
- Notes mint (`pageID <= 0` in `savePage4Scene`): when this character already has 15 or more `v2CharacterPages` rows, refuse with `SHEET_PAGE_CAP_MESSAGE` before `shiftIndexSQL` and the insert. An update of an existing notes page (`pageID > 0`) is not this cap. Create stays four fixed inserts (`addV2Character`). Sheet delete is `delete-sheet-page.md`, not this mint.
- Resting gutter, after file-circle-plus: the delete control (`delete-sheet-page.md`). It is not mounted while that card is disclosed. The disclosed rotate-left button stays the far-right control of the disclosed row.
- **+ Main Info** always inserts `emptyPageType1`. **+ Skills & Abilities** always inserts `emptyPageType2`. **+ NPCs & Equipment** always inserts `emptyPageType3`. **+ Notes** always inserts `emptyPageType4` (`page4-view.md`). After that card (array splice). Do not copy the card’s type. Do not clone the current page. Missing `afterIndex`: no-op. Temp `pageID` is a unique number `<= 0` taken from **all** pages’ ids (`makeTempID` is a string; do not use it).
- Posted `pages` order is the stored `v2CharacterPages.index`. View assemble must `ORDER BY index`. Save writes `index` from array position for every posted persisted page. Type 1: UPDATE + `savePageType1` only when a `v2CharacterPages` row exists for that `id` **and** `characterID`; else `INSERT` + `addPageType1` + `savePageType1`. Type 2: same existence upsert via `persistPageType2` / `addPageType2` / `savePageType2` (`pageTypeID` 2). Type 3: same via `persistPageType3` / `addPageType3` / `savePageType3` (`pageTypeID` 3). Type 4: same via `persistPageType4` / `addPageType4` / `savePageType4` (`pageTypeID` 4). Temp `pageID <= 0` always takes the INSERT path. Fail closed if INSERT yields no numeric `id > 0` (throw; do not reassemble). Reuse each type’s add tree; do not copy it. Do not create a character. Do not delete unknown page types. Do not rewrite `query()`. Do not use `if (pageID)` / `if (page.pageID)` truthiness (`-1` is truthy).
- `v2CharacterPages` may have several rows per `characterID`. `id` stays the PK. Do not unique `characterid` alone. If live postgres has that unique/index, `ensureSchema` drops it and fails closed if it remains (`schema-on-boot.md`). Snapshot `backupTables/basicData.sql` already has no such unique.
- Revert drops unsaved pages (existing snapshot). Leave-warn already runs while `isEditing` and dirty. After Save, `getV2Character` reassemble stays the **success** body only when stored type-1 count `>=` posted type-1 count **and** stored type-2 count `>=` posted type-2 count **and** stored type-3 count `>=` posted type-3 count **and** stored type-4 count `>=` posted type-4 count. If any is short, send `{ message: 'Could not save all sheets' }` with **no** `pages` key so T-051 restore+toast runs. Do not send `pages: []`. `getV2Character` sends the response; the gate is `v2CharacterPages` counts after `savePages`, not a split assemble. No frontend count check. An over-cap type-4 scene is refused before `savePages` (`page4-view.md`). Omitted persisted type 1–4 rows are deleted on that Save before the comparison (`delete-sheet-page.md`). A leftover omitted id is not this short-count message.
- Catalog Name / ancestry / class / subclass / level: first page-type-1 only (`order by index`, same as `assembleV2Character` `getCharacterName`). Home list is one row per character. `updateCatalogInfo` and `character.name` do not follow later pages. Slot limit unchanged. When two or more type-1s are **persisted**, a `fa-solid fa-user` icon sits in its own slot beside the catalog name (not inside the name `<strong>`). Hover lists the other type-1 names (first omitted, `index` order), one per line, on the existing `Tooltip id="my-tooltip"`. Empty extra names display as `New Character`. Icon color/size inherit the name column. Icon click is the row click (open the character). v1: no icon. Unsaved local `+` pages do not appear. No second catalog row. No new tooltip package. No `data-tooltip-html` with unsanitized names. Extra names ride the v2 home payload as `otherPageType1Names`. `updateCatalogInfo` keeps that field when a first-page identity patch omits it. A successful full Save writes it from reassembled type-1s after the first.
- Empty-name Save gate stays the first page-type-1. A new page’s empty name still becomes `'New Character'` on persist (`saveGeneralInfo`).
- Sheet-wide card/session contract: `v2-page-type.md`. Play-time view controls: only cells that page’s topic names (`quick-view-inputs.md`). They stay skipped while `isEditing`, except the type-4 scene (`page4-view.md`). **+ Notes** still does not POST on click. The first finished stroke on a temp type-4 page mints that page.
- Do not add `features/`. Do not add a dropdown type picker. The labeled add buttons are the type choice. Sheet delete is `delete-sheet-page.md`. Reorder: `page-reorder.md`. Page type 2: `page2-view.md`. Page type 3: `page3-view.md`. Page type 4: `page4-view.md`. Type N instance add is a playbook vertical-slice row (`v2-page-type.md`). “Do not delete unknown page types” on Save — **retained**.

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

Revised 2026-10-30 (page type 4; Design label placeholder, many copies):
- Three labeled adds — **revised**: **+ Notes** to the right of NPCs & Equipment, always `emptyPageType4`.
- Save gate through type 3 — **revised**: type 4 count is gated the same way.
- Type 3 has no catalog name — **retained**. Type 4 has no catalog name.
- Create is not this control — **retained**. New characters also gain one type 4 from Create (`page4-view.md`).

Revised 2026-10-30 (notes sheet quick edit; `page4-view.md`):
- “Local until Save” / “No persist on click” — **retained** for the **+ Notes** click. **Revised**: the first finished stroke on a temp type-4 page mints it.
- “Play-time stays skipped while `isEditing`” — **retained** for types 1–3. **Revised** for the type-4 scene.

Revised 2026-10-30 (hide adds; Q1 every page type, each card; Q2 entry icon leaves; Q3 exit is far right; Q4 tooltips; Q5 add returns to resting; Q6 kit glyph unchecked):
- “Left-to-right: swap | top | bottom | **+ Main Info** | **+ Skills & Abilities** | **+ NPCs & Equipment** | **+ Notes**” — **revised**: two presentations. Resting is reorder then file-circle-plus. Disclosed is the four labeled adds then `fa-rotate-left`. Relative order inside each set stays.
- Both clusters mounted together — **rejected**.
- File-circle-plus stays mounted while disclosed — **rejected**.
- One shared flag for every card — **rejected**. Q1 is every page type, each card on its own (catalog confirm is per row).
- Disclosed gutter stays up after an add — **rejected**.
- Dropdown type picker — **retained** rejected.
- Sidebar snapshot Revert — **retained**. The gutter `fa-rotate-left` only closes disclosure.
- Exit-button class (`primary` vs `.bottom-buttons`) — **resolved**: `primary` (2026-10-30, catalog revert).

Revised 2026-10-30 (sheet cap; Q1 and Q2 tooltip `You can only have 15 pages per character sheet.`; Q3 native `disabled`; Q4 refuse every full Save of a list longer than 15; Q5 no extra close or disable of an already open row; Q6 the same sentence):
- “No cap” on the labeled adds — **revised**: 15 sheets per character, one pool. The sentence and the number live in `sheetPageCap.ts`.
- “No frontend count check” — **retained** for the save-success gate (stored type counts versus posted). The gutter count and the pre-write refusal are this cap.
- `aria-disabled` — **rejected**. Native `disabled`, tooltip on a wrapper.
- Closing every open add row, or disabling the four labeled buttons, when another card’s add reaches 15 — **rejected**. That row is left as it is.
- Allowing a full Save of a character already stored above 15 when the list does not grow — **rejected**. `pages.length > 15` refuses before `savePages`.

Revised 2026-10-30 (add click at the cap; Q1 default toast):
- “Those labeled buttons can insert past 15” — **revised**: the click checks `character.pages.length >= SHEET_PAGE_MAX` before the insert. At the cap it does not insert, returns that card to resting, and toasts `SHEET_PAGE_CAP_MESSAGE`.
- A toast that stays until dismissed — **rejected**. `toast.error` with no options, same as a failed Save.
- Closing every other open add row on that click — **retained** rejected. Only the clicked card rests. The four buttons are not disabled while the row is open.

Revised 2026-10-30 (delete the sheet above the gutter; Q1–Q3):
- “Do not add delete” — **revised**: the gutter delete is `delete-sheet-page.md`. Dropdown type picker — **retained** rejected.
- “Stored count `>=` posted count is success” — **revised**: omitted type 1–4 rows are deleted before that comparison. A leftover omitted id uses `Pages weren't able to be removed`, not `Could not save all sheets`.
- “Do not delete unknown page types” — **retained**.
- Delete to the right of **+ Notes** on the always-visible row — **revised** after disclosure landed on main: the resting row is reorder, file-circle-plus, then delete. The disclosed row does not mount delete.

Touches: `app/src/pages/v2/`; `backend/server/v2/edit/`; `backend/server/v2/add/pageType1/` (reuse); `backend/server/v2/add/pageType2/`; `backend/server/v2/add/pageType3/`; `backend/server/v2/add/pageType4/`; `backend/server/v2/view/viewV2CharacterController.ts`; `backend/server/controllers/home/v2/getCharacters.ts`; `app/src/pages/home/components/charactersRowDisplay/`; `backend/common/interfaces/characterInterfaces.ts`; unindexed `app/src/redux/slices/usersCharactersSlice.tsx`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/basicData.sql` (verify only); `00-START-HERE.yaml`; `rewrite-ledger/feature-inventory.md`; `rewrite-ledger/page2-view.md`; `rewrite-ledger/page3-view.md`; `rewrite-ledger/page4-view.md`
TODOs: T-064–T-067 (done); persist miss: T-068–T-070 (done); catalog extra names: T-071–T-073 (done); generic gutter / type 2: T-080, T-082 (done); labeled adds: T-092 (done); playbook gutter add: T-093 (done); type-3 add + Save gate: T-104, T-111 (done); type-4 gutter and count: T-136, T-137 (`page4-view.md`); notes mint on first stroke: T-141 (done; `page4-view.md`); disclosure: T-145 (done); plus glyphs: T-146 (done); sheet cap: T-147, T-148 (done); add-click guard: T-149 (done); sheet delete: T-150, T-151 (`delete-sheet-page.md`)
