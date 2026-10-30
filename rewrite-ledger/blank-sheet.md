# Blank character sheet
status: accepted   date: 2026-10-30

Decision: `/v/blank` is a v2 view of one page type 1, one page type 2, and one page type 3, in that order. It uses the same page components as a character view, so a layout change on those types shows here. Every `character-value` node has empty text. The sheet is read-only. Signed-out visitors can open it. `/view/blank` is the v1 blank and stays as it is.

Why: The designer asked for a blank sheet at `/v/blank` whose handwritten places are empty, then answered: signed out; read-only with Quick Edit disabled; header stays and edit controls leave the sidebar while the sidebar shell stays for later items; `/v/blank` only; the URL is enough; a new inventory feature whose layout follows the page types; numeric handwriting is empty, not `0`.

Constraints it imposes:
- Route: `v/blank` on the v2 view (`app/src/routes/AllRoutes.tsx` renders `V2View`). Do not add `view/blank`. Do not change `backend/server/v1/controllers/view/` or `assembleBlankCharacter`. Do not change `/view/:characterID`.
- No character fetch, no cache write, no create, no Save, no field POST. `id` 0, `ownsThisCharacter` false, `name` `''`. Pages come from `emptyPageType1` / `emptyPageType2` / `emptyPageType3` with three different `pageID`s. Do not mount page type 4. Do not call `emptyPageType4`.
- `getV2Character` today sends no response when the id’s uppercase form is `BLANK` (`viewV2CharacterController.ts`). Retire that branch. Any non-numeric id, including `blank`, uses the existing `{ message: 'Bad ID' }` path. Do not add `assembleBlankCharacter` on v2.
- Same components, one tree. Do not copy v1’s `if (!isBlank)` second layout. A new `character-value` on type 1, 2, or 3 renders its text through the blank ink helper so this sheet stays empty.
- Ink: when this sheet is showing, the text of every `.character-value` is empty. That includes a stored `0`, coinage size (`0` → `0s` on a real sheet), and the capacity band strings (`<0`, `≤…`, `>…`). Keep `placeholder=" "`. Boxes, min-heights, and zebra stay.
- Not ink: labels (HamletOrNot, oldClaude, Source Sans 3), the page-1 wordmark, Positions, the six unselected die images, Anointed’s empty box, static `/`, gear bars, arrows, flag boxes with no check, printed **S** (`em`, oldClaude), and the coinage chrome `100 coins = 1s`.
- Read-only: `isEditing` stays false. `viewQuickEdit` stays false, so `view-quick-edit` is not applied. Play-time inputs and textareas that stay mounted on the view are `readOnly` and empty. Insert rows that an empty view already shows stay, and their inputs are `readOnly`. Die clicks, gear flag clicks, and Anointed do not change the sheet. Persist functions return before `axios` when this sheet is showing.
- Hover stays at rest on this sheet only. No teal on a sheet `input` or `textarea`, on an unselected die face, on a gear flag box, or on the Contacts and Gear Notes washes. Die cells and flag boxes use the arrow cursor (`cursor: default`). Sheet `input` and `textarea` show no focus ring (`:focus` and `:focus-visible`). Gear arrow tooltips stay. Header and footer flame hover stay. The text caret on fields stays. The Positions Weak 1 box stays. A real character’s hover, pointer, and focus ring stay (`quick-view-inputs.md`, `page1-view.md`, `page3-view.md`).
- Sidebar: keep `.sidebar-shell`. Hide Edit, Save, Revert, and Show / Hide Quick Edit Locations. Do not hide the shell. A later control added beside those buttons is visible here.
- Header stays. The app footer stays. Do not add a home link or a PDF. Document title keeps the empty-name path (`Blank - Bonfire Character Vault`).
- No `features/`. Do not import v1 `IsBlankContext`. Do not put `isBlank` on `CharacterVersion2`. Blank state is a v2 context around this view only.
- Signed out: `App` does not redirect anonymous users. This route must not start depending on `/isLoggedIn`.

Rejected:
- A second copy of the page-type layout (v1 `IsBlankContext` branches).
- `assembleBlankCharacter` for v2. The unfinished branch sends nothing; that is not a sheet.
- Hiding handwriting with transparent color. The text is empty.
- Showing `0` or `0s` because create-empty stores zero.
- Mounting type 4 or the edit gutter (reorder, file-circle-plus, delete, disclosed adds). That gutter already mounts only while `isEditing`, which stays false.
- Treating `/v/BLANK` or `/view/blank` as this sheet.
- Changing the global `input:hover` / `textarea:hover` rules. Those are a real character’s play-time hover.
- `pointer-events: none` or `inert` on the sheet. Tooltips, labels, and find-in-page stay.
- `disabled` in place of `readOnly`.
- Putting the blank marker on the sidebar, header, or footer. A later sidebar control keeps its own cursor and focus ring.
- A catalog row, a slot, or a stored template.
- Owner-gating changes for a real character. Non-owners still keep play-time controls (`quick-view-inputs.md`). This sheet is not a non-owner.

Touches: `app/src/routes/AllRoutes.tsx`; `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/hooks/characterHook.tsx`; `app/src/pages/v2/hooks/updates/emptyPageType1.ts`; `emptyPageType2.ts`; `emptyPageType3.ts`; `app/src/pages/v2/components/sidebar/Sidebar.tsx`; `app/src/pages/v2/contexts/` (new blank context); mounted `character-value` widgets under `pageType1/`, `pageType2/`, `pageType3/`; `backend/server/v2/view/viewV2CharacterController.ts`; `00-START-HERE.yaml`; `feature-inventory.md`
TODOs: T-152, T-153 (done); hover rest: T-154 (done)

Revised 2026-10-30 (hover rest):
- Read-only meant clicks and Quick Edit only — **revised**: this URL also keeps hover at the resting paint, uses the arrow on die cells and flag boxes, and shows no focus ring on sheet fields.
- Gear arrow tooltips — **retained**.
- Header and footer flame hover — **retained**.
- Input text caret — **retained**.
- Positions Weak 1 outline — **retained** (it is not a focus ring).
