# Quick view inputs (page type 1)
status: accepted   date: 2026-10-03

Decision: Sheet-1 play-time controls on the v2 page-type-1 **view** (`isEditing` false). Phase 1: Unspent CrP, Current Favor, the Self Doubt / Damage / Stress die rows, Die Penalty, Current Damage, and Current Stress are controls and stay visible. Phase 2: every **input** on that view persists on `blur` when the viewer owns the character — column-scoped POST, not a full-character save. The Edit visibility toggle is a later phase. This is not v1 `/quickEdit`.

Why: The designer named the phase-1 set. Persist is owner-only, field-only, on blur. Sidebar loading matches v1 quick-save. Die cells are clicks, not inputs; they do not POST.

Constraints it imposes:
- Replace only the phase-1 cells. Every other stored or computed view node stays `p` / `h2` / chrome.
- Number cells: always-visible controlled `input type="number"` `character-value`, same `onChange` as the existing edit inputs (`+event.target.value`; empty → `0`). Unspent → `updateCrP(pageID, 'unspent', …)`. Current Favor → `updateFavor(pageID, { current })`. Die Penalty → `updateSelfDoubt(pageID, { diePenalty })` (Self Doubt only). Current Damage → `updateDamage(pageID, { damage })` (left of the Damage `/`). Current Stress → `updateStress(pageID, { stress })` (left of the Stress `/`).
- Die rows: keep `p` + PNG markup. Enable the existing `dieIndex` click on the view (`index + 1`; click selected → `0`). Do not wrap dice in `<input>` / `<button>`. Selected glyph filter stays `page1-view.md` / T-057. `.view-edit` **cell** tint stays edit-only. Die click does not persist (not an input).
- View die hover: `cursor: pointer` on `.die-row p`. Unselected `p:hover:not(.selected) img` uses the T-057 invert-then-tint method aimed at default teal `#ADD8E6` / `rgba(173, 216, 230)` (face near that teal, ink near-white). Do not paint hover `background` on the `<p>`. Selected hover keeps the flame filter (face is not white). Edit even/odd cell fills and edit hover `rgb(145, 181, 194)` unchanged.
- View persist (phase 2): `onBlur` on every input that is visible while `isEditing` is false. Today that is Unspent, Current Favor, Die Penalty, Current Damage, Current Stress. A later view input ships with a new allowlist attribute and column UPDATE in the same change. Do not persist on `onChange`. Do not persist while `isEditing` (v1). Non-owners keep the inputs; skip POST.
- Payload is one field: `{ pageID, attribute, value }` (`value` number). `attribute` is `'unspent' | 'currentFavor' | 'diePenalty' | 'damage' | 'stress'`. POST `editV2URL + id + '/field'` (`/v2/edit/:characterID/field`). Server owner-checks `getCharacterOwnerID` against `request.user?.id`. Known attribute → one-column UPDATE on that `pageID`. Unknown attribute → refuse, no write. Do not call `saveGeneralInfo` / `saveFavor` / `saveSelfDoubt` / `saveDamage` / `saveStress` (those write sibling columns). Do not POST the full character. No `/quickEdit`, no `viewQuickEdit`.
- Skip POST when `!ownsThisCharacter`, when `isEditing`, or when the blurred value already matches `revertedCharacter` (focus/blur no-op).
- While any view persist is in flight, the sidebar buttons are replaced by `LoadingIndicator` `secondary={true}` (v1 `isQuickSaving`). Do not `setCharacter(null)`. In-flight count if two blurs overlap. Spinner blocks Edit / Save / Revert.
- Success: toast none. Patch that field on `revertedCharacter`. `cacheCharacterV2` with `Promise.resolve` of that patched snapshot (DB truth). Do not replace live `character` from the response (field POST returns `{ success: true }`, not a sheet).
- Failure: `toast.error` (T-051). Keep local `character`. Do not patch snapshot or cache. Always clear the in-flight count so the spinner cannot stick. `query()` stays as-is; HTTP success means owner + known attribute + query invoked.
- Leave-warn (T-052) runs only while `isEditing`. Dirty for `beforeunload` / `useBlocker` is `isDirty && isEditing` (`V2View.tsx`). View changes do not warn. The hook’s `isDirty` (`character !== revertedCharacter`) stays. Edit-session Save stays the full-character POST.
- Do not add `.view-edit` or `view-quick-edit` on the view. Inputs use the global transparent / hover teal. Die **cells** stay untinted on the view; unselected **faces** tint teal only on hover (above).
- Leave Integrity Threshold, Trauma, Knock Back, Damage threshold, Stress threshold, Spent CrP, CrP to lvl, Favor max, Anointed, and divine relationship as they are. No view Save / Revert. No v1 import. No `features/`.

Rejected:
- Full-sheet view inputs (the T-029 set).
- A v2 `/quickEdit` owner or “Show Quick Edit Locations.”
- Text inputs for die cells.
- Full-character POST for a view field.
- Debounced persist (Q1: `onBlur`).
- Hiding or disabling view inputs for non-owners.
- Silent persist failure (v1).
- View persist while `isEditing`.
- Wiring the Edit visibility toggle in this phase.

Touches: `app/src/pages/v2/pageTypes/pageType1/components/GeneralInfo/GeneralInfo.tsx`; `.../Favor/Favor.tsx`; `.../Vitals/Vitals.tsx`; `.../Vitals/Vitals.css`; `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/hooks/`; `app/src/pages/v2/components/sidebar/`; `backend/server/v2/edit/`; `backend/common/interfaces/v2/`
TODOs: T-058 (done); die hover face: T-059 (done); view persist: T-060, T-061 (done)
