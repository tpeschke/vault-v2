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

Vertical slice (every new page type adds all of these):

| Surface | Exemplar (page 1) |
|---|---|
| View widgets | `app/src/pages/v2/pageTypes/pageType1/` |
| Local updates | `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; thread through `getV2Updates.ts` / `UpdateInterfaces.ts` / `characterHook` / `V2View` (`getV2Updates` today returns only `PageType1Updates`) |
| Contracts | `backend/common/interfaces/v2/page1/`; union `PageV2` in `pageTypes.ts` |
| Assemble | `backend/server/v2/view/assembleV2Character/utilities/pageType1/`; `assembleV2Character.ts` `switch` (`default` → `{ type: 404 }`) |
| Create defaults | `backend/server/v2/add/pageType1/`; `addV2CharacterController.ts` today inserts `pageTypeID` 1 only |
| Persist | `backend/server/v2/edit/utilities/pageType1/`; `savePages.ts` `switch` (`default` no-op) |
| Delete | `backend/server/v2/delete/utilities/deletePagesUtilities/pageType1/`; `deletePages.ts` `switch` (`default` true) |
| Schema snapshot | `backend/server/v2/backupTables/page1.sql` |
| Boot DDL | `backend/server/db/ensureSchema.ts` |
| Page-local decision | `page1-view.md` |

New type N uses the same slots with `pageTypeN` / `pageN`. Wire into the existing v2 view/edit/add/delete owners. Paths sit under current YAML view/edit/create/delete adjacencies. Update root L1 YAML only when indexed files are added, moved, or renamed. Do not add a user-objective key for “page type N.”

Create-character: whether a new character gains page type N is noted by the designer when that type is added. `addV2CharacterController.ts` already comments “Add page type 2” / “Add page type 3”; those lines are not approval.

How the next agent proceeds:
1. Route here. Read this contract. Do not scan `TODO.md` Done.
2. Open the exemplar trees. Copy structure and mechanics. Do not extract a `PageType` base or registry.
3. Write `pageN-view.md` from that page’s official blank. Then Order TODOs that walk the vertical slice.
4. After rename/move, grep the old path; expect zero hits.

Code verified at Order 2026-10-03:
- `V2View` `switch (page.type)` case 1; `default` empty fragment.
- No `app/src/pages/v2/pageTypes/pageType2/` (and no v2 `pageTwo` tree). Unused leftover widgets under page-type-1 (Temperaments, Relationships, Movement; Goals on the payload only) stay on the page-1 store until a later page’s topic and the designer say otherwise. Do not treat them, or v1 `pageTwo`, as page type N.
- `DisplaySingleArray` / `DisplayPairArray` exist on the v2 slice.

Rejected:
- A Cursor skill, cookiecutter, or empty `pageTypeN` stub folder.
- A shared page-type framework, registry, or schema renderer.
- Promoting page-1 widgets into `features/` or `widgets/`.
- Restating page-1’s left/right section list here.
- Treating PDF / v1 Quick Edit as required functionality.
- Extracting a shared kit before a third page type shows a stable contract.

Touches: `rewrite-ledger/v2-page-type.md`; ledger front panels; pointers on `page1-view.md`, `edit-character.md`, `quick-view-inputs.md`
TODOs: T-064 (page-2 layout; blocked on official blank)
