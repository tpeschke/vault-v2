# Delete the sheet above the gutter
status: accepted   date: 2026-10-30

Decision: While editing, the resting gutter under each sheet card has a delete button to the right of `fa-file-circle-plus`. It is not mounted while that card’s adds are disclosed. It removes the sheet above it from the local `pages` array. Save deletes the persisted rows that array no longer includes. The uppermost Main Info sheet cannot be removed. Catalog extra names change only on a successful Save.

Why: The designer asked for the catalog’s two-step delete, on the gutter, red before confirm, with the other gutter buttons hidden while it is armed, and not permanent until Save. The uppermost Main Info sheet stays. A demoted Main Info sheet may be deleted (Q1). Extra names wait for Save (Q2). A removal that does not stick toasts `Pages weren't able to be removed` (Q3).

Constraints it imposes:
- Edit mode only (`isEditing`). No control on the view. No request on click. No new route. No `features/` slice. Not inside `PageType1.tsx`, `PageType2.tsx`, `PageType3.tsx`, or `PageType4.tsx`. Same gutter as the adds (`add-page-type-1.md`).
- Resting left-to-right: swap | top | bottom | `fa-file-circle-plus` | delete (`add-page-type-1.md`, `page-reorder.md`). The disclosed row is the four labeled adds then far-right `fa-rotate-left` and does not mount delete. Armed delete is a third mode of that gutter: only the confirm pair. Reorder rules stay `page-reorder.md`. The idle delete button is not an add and does not take `margin-left: auto`. The confirm button does, so the pair stays right.
- Idle: `fa-trash`, gutter shadow and metrics, warn red `#990000` at rest and `#5a0000` on hover. Not whitesmoke. Not the orange gutter hover. Not `transparent-warn`. Tooltip exact: `This deletes the page above this button`. The click only arms that gutter.
- Armed, that gutter only: reorder, file-circle-plus, and the disclosed adds are not rendered. Right-aligned pair, catalog order: `fa-trash-check` (same warn red) then `fa-rotate-left` (primary `#06465b`, hover `#032530`, gutter shadow). Check tooltip exact: `This deletes the page above this button. This delete isn't permanent until you save the sheet`. Rotate-left tooltip exact: `Never mind`. The check splices that index out of `pages`. Never mind disarms. No timeout, no click-outside, no modal, no scroll, no success toast. Other gutters stay as they are. Arming state lives in `V2View` keyed by `page.pageID`, same as disclosure, not by index. Arming also returns that card to resting so disclosure and delete-confirm are not both up.
- Uppermost Main Info means the first `type === 1` in `pages` (lowest index), including when another type sits above it. That gutter’s delete does not arm and does not splice. Other Main Info sheets, and every type 2, 3, and 4 sheet, use the idle/armed flow. After reorder, protection moves with whichever type 1 is now first. The demoted sheet may be deleted.
- The protected control still shows `fa-trash` in that slot. It uses the `button.disabled` look (gray icon, `not-allowed`, whitesmoke, no orange hover). Do not set the HTML `disabled` attribute. Set `aria-disabled="true"` and a click that returns. Tooltip exact: `You can never remove this page.`
- The local splice does not dispatch `updateCatalogInfo` and does not change `character.name`. Reorder’s catalog write when the first type 1 changes stays `page-reorder.md`. Extra type-1 names on the catalog icon change only when a successful full Save rewrites them (`add-page-type-1.md`). `removePageAt` no-ops when the index is the first type 1 or is out of range.
- Save, after the posted sheets are written and only on that success path: delete each stored `v2CharacterPages` row of this character whose id was already stored before that write, is absent from the posted ids `> 0`, and has `pageTypeID` 1, 2, 3, or 4. Child rows go through the existing `deletePageTypeN`. Then delete that one page row `where id` and `characterID`. Do not call `deleteFromCharacterPages`. Do not delete a sheet this Save just inserted. Do not delete an unknown `pageTypeID`. A type 4 sheet minted by the first-stroke insert is a stored id; omit it from the post and this Save deletes it. Ids `<= 0` are not stored rows. No new transaction and no rewrite of `query()`.
- Refuse a posted list with no type 1 before `savePages`, with no delete and no reassemble. If an omitted id of type 1–4 is still stored after the delete attempt, do the same. Both send `{ message: "Pages weren't able to be removed" }` and no `pages` key. The short-count sentence `Could not save all sheets` stays the insert failure (`add-page-type-1.md`). The existing client branch toasts `data.message` and puts the draft back. Do not add a client string.
- Do not add an L1 objective or an inventory feature. This is the edit gutter.

Rejected:
- Calling the catalog delete-character route on click.
- A native `disabled` button (the tooltip would not show).
- Locking one page id forever after it is reordered below another Main Info sheet (Q1).
- Refreshing catalog extra names on the local splice (Q2).
- Reusing `Could not save all sheets` for a missed removal (Q3).
- Deleting stored ids by “not in the posted list” after `savePages` (that set includes sheets this Save just inserted).
- Mounting delete on the disclosed add row, or restoring the always-visible four labeled adds so delete can sit to the right of **+ Notes**.

Revised 2026-10-30 (disclosure on main, during Execute):
- “to the right of **+ Notes**” / “Left-to-right stays swap | top | bottom | **+ Main Info** | **+ Skills & Abilities** | **+ NPCs & Equipment** | **+ Notes** | delete” — **revised**: resting row is reorder, file-circle-plus, then delete. The disclosed row does not mount delete. Its `fa-rotate-left` stays the far-right control.
- TODOs T-145, T-146 — **revised**: those numbers are the disclosure and glyph work. This decision is T-150, T-151.

Touches: `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/V2View.css`; `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`; `backend/server/v2/edit/editV2CharacterController.ts`; `backend/server/v2/edit/utilities/`; `backend/server/v2/delete/utilities/deletePagesUtilities/` (reuse only)
TODOs: T-150, T-151
