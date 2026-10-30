# v2 page-type contract
status: accepted   date: 2026-10-03

Decision: Later v2 sheet pages copy page-type-1’s contract and vertical slice. Page-type-1 in the tree is the exemplar. This file owns sheet-wide formatting, session plug-in, and the surfaces every new type must add. Each page keeps its own `pageN-view.md` for section order, labels, and exceptions.

Why: A second page type must match fonts, page box, edit/persist behavior, and the add/view/edit/delete/schema trees without scanning T-009–T-063. One finished type is not enough to extract a `PageType` base, skill, or stub folder.

Constraints it imposes:

Sheet-wide formatting (every v2 sheet page):
- Official blank for *that* page is the layout source. Vault typefaces stay. Recorded name exceptions stay on that page’s topic (page 1: **Cultural Strength**).
- Form: HamletOrNot (section `h1`/`h2`), oldClaude (`em`/`strong`), Source Sans 3 (default `p`).
- Character-object values: Kalam Regular 400 via `className="character-value"` on each interpolated node. Load via the existing Google `@import` in `index.css` (`family=Kalam:wght@400`). CSS `.v2 .character-value` in `View.css`.
- Do not mark Positions, die image cells, Anointed, static `/` (`p.slash` and slash spans), v1, or home with `character-value`.
- Display `p.character-value`: 15px, `min-height: 17.38px`, unless that page’s topic records an exception (page 1: attack notes 12px; mapped leftover `p`/`input` and suite-title `em` 19.38).
- `.page` is 1036px × 796px (`View.css`). Every page card targets that height. Page 1 measured `.page-type-one` 1068 (card padding). Overflow past 1068 is **recorded**, not compressed. Do not shrink glyphs or other blocks to make notes fit.
- Island on leftover/edit controls: `padding: 2px 1px`, `border-box`, `background-clip: content-box`. Do not put that padding on suite wrappers.
- Mapped-list leftover bump is `--mapped-row-min-height: 19.38px` on the page root if that page has mapped lists. Drop the bump if the card would exceed 1068.
- Extra chrome stays off unless the blank has it. Page-1 omit list stays on `page1-view.md`.
- Bonfire wordmark is **page 1 only**. Later pages do not mount `bonfire-wordmark.png`.
- Edit toggle must not move cells. Inputs copy the display box (`edit-character.md`). `:placeholder-shown` 17.38 vs filled `1.2em`. Notes `textarea` `height: calc(2 * 17.38px)` on the control. `placeholder=" "` on swapped text inputs.

Sheet-wide session (already on the v2 slice; new pages plug in):
- `EditingContext`, sidebar Edit / Save / Revert, owner gate, `view-edit`, full-character POST, revert snapshot, toast on failed Save, unsaved warn only while `isEditing`, cache replace after successful Save. Canonical: `edit-character.md`.
- Stored drawn cells swap to controlled `character-value` inputs. Computed and static chrome stay text.
- List arrays (except fixed slot blocks): real rows only; leftover pads to cap; one insert row while editing; insert on blur; `makeTempID` for React keys; clear stored fields removes the row. Use `app/src/pages/v2/components/displayArray/` for one- or two-field rows. Do not import v1. Do not add a new shared N-field widget for a one-off shape.
- Persist every field on that page’s payload, including stores not drawn on the card.
- New tables/columns: `ensureSchema` idempotent patch + `backupTables/pageN.sql` in the same change (`schema-on-boot.md`). No new migration package.
- Play-time view controls (always-visible inputs, field POST, location highlight) are **not** automatic. Add them only when that page’s topic names the cells. Mechanics: `quick-view-inputs.md`. New allowlist attributes and column UPDATEs ship in the same change as the control.
- Two-column shell: reuse `app/src/pages/v2/pageTypes/components/doubleColumn/`. Do not add `features/`, `widgets/`, or `shared/`.
- Off-card gutter under each sheet card. Resting: reorder (`page-reorder.md`), `fa-file-circle-plus`, then delete of the sheet above (`delete-sheet-page.md`). Disclosed: **+ Main Info**, **+ Skills & Abilities**, **+ NPCs & Equipment**, and **+ Notes**, then far-right `fa-rotate-left` (`add-page-type-1.md`). Main Info inserts type 1. Skills inserts type 2. NPCs & Equipment inserts type 3. Notes inserts type 4 (`page4-view.md`). Every new type adds one labeled add to the right of the last add, inside the disclosed set, before the rotate-left button. Mechanics, including the 15-sheet cap: `add-page-type-1.md`. Do not put that cluster on the printed blank.

Vertical slice (every new page type adds all of these):

| Surface | Exemplar (page 1) |
|---|---|
| View widgets | `app/src/pages/v2/pageTypes/pageType1/` |
| Local updates | `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; thread through `getV2Updates.ts` / `UpdateInterfaces.ts` / `characterHook` / `V2View` (`getV2Updates` today returns only `PageType1Updates`) |
| Contracts | `backend/common/interfaces/v2/page1/`; union `PageV2` in `pageTypes.ts` |
| Assemble | `backend/server/v2/view/assembleV2Character/utilities/pageType1/`; `assembleV2Character.ts` `switch` (`default` → `{ type: 404 }`) |
| Create defaults | `backend/server/v2/add/pageType1/`; `addV2CharacterController.ts` today inserts `pageTypeID` 1 only |
| Gutter add | `emptyPageType1` + `addPageAfter`; type 2: `emptyPageType2` + `addPageType2After`; buttons in `V2View` (`add-page-type-1.md`). Type N: `emptyPageTypeN`, `addPageTypeNAfter`, one labeled `+ …` to the right of the last add, on every card, same chrome, insert after that card, no scroll. That label is in the disclosed set, after file-circle-plus and before the far-right `fa-rotate-left`. Label is named on `pageN-view.md`. Save count-gate includes type N. Not Create. Not a dropdown or shared add-button factory. |
| Persist | `backend/server/v2/edit/utilities/pageType1/`; `savePages.ts` `switch` (`default` no-op) |
| Delete | `backend/server/v2/delete/utilities/deletePagesUtilities/pageType1/`; `deletePages.ts` `switch` (`default` true) |
| Schema snapshot | `backend/server/v2/backupTables/page1.sql` |
| Boot DDL | `backend/server/db/ensureSchema.ts` |
| Page-local decision | `page1-view.md` (type 1); `page2-view.md` (type 2); `page3-view.md` (type 3) |

New type N uses the same slots with `pageTypeN` / `pageN`. Wire into the existing v2 view/edit/add/delete owners. Paths sit under current YAML view/edit/create/delete adjacencies. Update root L1 YAML only when indexed files are added, moved, or renamed. Do not add a user-objective key for “page type N.”

Create-character: whether a new character gains page type N is noted by the designer when that type is added. Type 2: yes, one sheet at index 1 (`page2-view.md`). Type 3: yes, one sheet at index 2 (`page3-view.md`). Type 4: yes, one sheet at index 3 (`page4-view.md`). `addV2CharacterController.ts` comments are not approval for a later type. Sheet-wide blank and font rules do not apply to type 4. Types 1, 2, and 3 keep them. `/v/blank` reuses those three types and does not add a page type (`blank-sheet.md`).

How the next agent proceeds (only when the designer names a new page type and attaches that page’s official blank):
1. Route here. Read this contract. Do not scan `TODO.md` Done.
2. Open the exemplar trees. Copy structure and mechanics. Do not extract a `PageType` base or registry.
3. Write `pageN-view.md` from that page’s official blank, including the gutter-add button label. Then Order TODOs that walk the vertical slice, including gutter add and the type-N Save count-gate.
4. After rename/move, grep the old path; expect zero hits.

This file existing is not Order or Execute for a new page type.

Another **instance** of an existing type on the same character is the labeled gutter adds (`add-page-type-1.md`). That is not a new page type.

Code verified after Execute 2026-10-04 (T-076–T-087, T-100–T-112):
- `V2View` `switch (page.type)` case 1, case 2, and case 3; `default` empty fragment. Gutter after every page; labeled adds are T-092 / T-111.
- `app/src/pages/v2/pageTypes/pageType2/` and `pageType3/` exist. Unused leftover widgets under page-type-1 (Temperaments, Relationships, Movement; Goals on the payload only) stay on the page-1 store. Do not treat them, or v1 `pageTwo`, as page type 2.
- `getV2Updates` returns `PageType1Updates`, `PageType2Updates`, `PageType3Updates`, and `PageGutterUpdates`. `savePages` / assemble / delete have `case 2` and `case 3`; `default` stays no-op / 404 / true. `addV2CharacterController` inserts type 1 at index 0, type 2 at index 1, and type 3 at index 2.
- `DisplaySingleArray` / `DisplayPairArray` exist on the v2 slice.

Order 2026-10-03 / 2026-10-04 recorded the pre-slice gap (no type-2 tree; gutter inside case 1; create inserted type 1 only).

Rejected:
- A Cursor skill, cookiecutter, or empty `pageTypeN` stub folder.
- A shared page-type framework, registry, or schema renderer.
- Promoting page-1 widgets into `features/` or `widgets/`.
- Restating page-1’s left/right section list here.
- Treating PDF / v1 Quick Edit as required functionality.
- Extracting a shared kit before a third page type shows a stable contract.
- Ordering or scaffolding a specific later page type as part of writing this playbook. (Disposition 2026-10-04: designer named type 2; Order is `page2-view.md` + T-076–T-087.)

Revised 2026-10-04 (page type 2; Design Q12):
- “Off-card gutter under each page-type-1” — **revised**: gutter under every sheet card. Copy-type `+` — **revised** again: labeled Main Info / Skills (`add-page-type-1.md`).
- Create-character note for type 2 — **recorded** on `page2-view.md` (yes, index 1).

Revised 2026-10-04 (playbook gutter add; Q1 Save-gate type N; Q2 label on pageN-view.md):
- Gutter mentioned only as today’s two buttons — **revised**: instance add is a vertical-slice surface (T-093).
- Dropdown / button registry — **retained** rejected.

Revised 2026-10-04 (page type 3; Design Q1–Q14):
- Create-character note for type 3 — **recorded** on `page3-view.md` (yes, index 2).
- Gutter two labeled adds — **revised**: third add **+ NPCs & Equipment** (`add-page-type-1.md`).
- Page-local decision list — **revised**: includes `page3-view.md`.

Revised 2026-10-30 (delete the sheet above the gutter):
- Gutter is adds plus reorder only — **revised**: delete of the sheet above is `delete-sheet-page.md`. A new type’s labeled add still sits to the right of the last add, inside the disclosed set, before `fa-rotate-left`. Delete stays on the resting row, after file-circle-plus.

Revised 2026-10-30 (blank sheet; `blank-sheet.md`):
- `/v/blank` is a view of types 1–3, not a new page type and not type 4. Layout stays on the page-type components. The edit gutter, including delete and disclosure, stays off that URL. Hover on that URL stays at rest (`blank-sheet.md`).

Revised 2026-10-30 (page type 4 general notes):
- Create-character note stopped at type 3 — **revised**: type 4 yes, index 3 (`page4-view.md`).
- Sheet-wide blank, fonts, and `character-value` on every v2 sheet page — **revised** for type 4 only. Types 1, 2, and 3 **retained**.
- “Attaches that page’s official blank” before Order — **revised** for type 4: the designer named Excalidraw and no blank. Later types still bring a blank.

Revised 2026-10-30 (gutter disclosure, `add-page-type-1.md`):
- Gutter lists both clusters as one always-visible row — **revised**: resting versus disclosed. Labeled adds, including **+ Notes**, stay the disclosed set.

Touches: `rewrite-ledger/v2-page-type.md`; ledger front panels; pointers on `page1-view.md`, `page2-view.md`, `page3-view.md`, `page4-view.md`, `edit-character.md`, `quick-view-inputs.md`, `add-page-type-1.md`, `blank-sheet.md`
TODOs: T-076–T-087 (page type 2, done); labeled adds: T-092 (done); playbook gutter add: T-093 (done); page type 3: T-100–T-112 (done); page type 4: T-134–T-140 (`page4-view.md`); disclosure: T-145 (done); sheet cap: T-147, T-148 (done); add-click guard: T-149 (done; `add-page-type-1.md`); sheet delete: T-150, T-151 (`delete-sheet-page.md`); blank sheet: T-152, T-153 (done); hover rest: T-154 (done; `blank-sheet.md`)
