# Page reorder
status: accepted   date: 2026-10-03

Decision: While editing, a resting gutter shows swap / send-to-top / send-to-bottom to the left of `fa-file-circle-plus` (`add-page-type-1.md`). Those three are not mounted while that card is disclosed. They reorder `character.pages` locally. Persist is the existing full Save (`v2CharacterPages.index` from array position). First sheet omits send-to-top. Last sheet omits swap and send-to-bottom. Hide omitted buttons; do not disable or reserve empty slots. A sole sheet’s resting gutter is only the file-circle-plus button.

Why: The designer asked to swap a sheet with the one below it and to send a sheet to either end of the stack, without a new persist route.

Constraints it imposes:
- Edit mode only (`isEditing`). Owners reach it through the existing Edit button. No controls on the view. No persist on click. No new HTTP route.
- Same gutter as the add disclosure (`add-page-type-1.md`): immediately under each rendered sheet card, outside `.page` / `.page-type-one` / `.page-type-two` / `.page-type-three` / `.page-type-four`. Not in the sidebar. Not inside `PageType1.tsx`, `PageType2.tsx`, `PageType3.tsx`, or `PageType4.tsx`. Resting left-to-right: swap | top | bottom | file-circle-plus. A disclosed card does not mount these three. Disclosure visibility lives in `add-page-type-1.md`.
- Icons (exact): swap `fa-solid fa-arrow-up-arrow-down`; top `fa-solid fa-up-to-line`; bottom `fa-solid fa-down-to-line`. Tooltips on existing `Tooltip id="my-tooltip"`: `Swap with the sheet below`; `Move this sheet to the top`; `Move this sheet to the bottom`.
- Swap exchanges this sheet with the next (`index` ↔ `index + 1`). Send to top moves it to array slot 0. Send to bottom moves it to the last slot. First sheet: no send-to-top. Last sheet: no swap, no send-to-bottom. Sole sheet: none of the three (file-circle-plus stays; `add-page-type-1.md`). Collapse the row when a button is omitted.
- Match the live `+` chrome (`.add-page-type-1` in `V2View.css`): no edit-teal fill. After a move, keep that sheet in view (stable `pageID`, not `page-${index}`). `+` still does not scroll (`add-page-type-1.md`).
- Local until Save. Revert restores order (existing snapshot). Leave-warn already runs while `isEditing` and dirty. Save already writes `index` from array position and assemble already `ORDER BY index` (`add-page-type-1.md` T-066 / T-067). Do not add a field POST or a reorder route.
- Catalog identity stays the first page-type-1 (`add-page-type-1.md`). If reorder changes which type-1 is first, update `character.name` and `updateCatalogInfo` from that page, and pass `otherPageType1Names` from the remaining type-1s. Do not follow later pages otherwise.
- Full Save must refuse a non-owner who hits `/v2/edit/:characterID` directly. Session user is `request.user?.id` (same as field POST). Do not trust `body.userInfo.userID` alone.
- Do not add `features/`. Do not add delete, drag-and-drop, or a type picker. Page type 2: `page2-view.md`.

Rejected:
- Viewport scroll to the first/last sheet (Q1: reorder).
- Hiding swap on the first sheet (Q2: first has swap).
- Persist on click / a new reorder route (Q3: local until Save).
- Showing the controls outside `isEditing` (Q4).
- Disabled or spacer slots for omitted buttons (Q5).
- Button order other than swap | top | bottom | Main Info | Skills (Q7; Skills added 2026-10-04). Disposition 2026-10-30: the simultaneous row is **revised** (`add-page-type-1.md`). Order inside the reorder trio, and inside the labeled-add trio, stays.

Revised 2026-10-04 (page type 2; Design Q12 gutter generic):
- “under each page-type-1 card” / “Not on other page types” — **revised**: gutter under every sheet card.
- “Do not add … page type N” — **revised**: type 2 is `page2-view.md`. Dropdown type picker still rejected; labeled adds are `add-page-type-1.md`.
- Catalog first-type-1 on reorder — **retained**.

Revised 2026-10-30 (`add-page-type-1.md` disclosure):
- “to the left of the existing `+`” / simultaneous swap | top | bottom | labeled adds — **revised**: resting row ends in file-circle-plus; disclosed cards do not mount reorder.
- Omit rules, local-until-Save, no spacers — **retained**.

Touches: `app/src/pages/v2/`; `backend/server/v2/edit/editV2CharacterController.ts` (owner check only); `rewrite-ledger/add-page-type-1.md` (gutter row; reorder no longer rejected)
TODOs: T-074 (done); T-075 (done); generic gutter: T-082; disclosure: T-145 (proposed)
