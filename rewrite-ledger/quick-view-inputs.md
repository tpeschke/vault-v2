# Quick view inputs (page type 1)
status: accepted   date: 2026-10-03

Decision: Phase 1 of sheet-1 play-time controls. On the v2 page-type-1 **view** (`isEditing` false), only Unspent CrP, Current Favor, the Self Doubt / Damage / Stress die rows, Die Penalty, Current Damage, and Current Stress are controls. They stay visible. Persist and the Edit visibility toggle are later phases. This is not v1 `/quickEdit`.

Why: The designer named that set and no others. v1 keeps a similar play-time subset as always-on inputs; v2 already has the controls behind `isEditing`. Phase 1 is showing them on the view.

Constraints it imposes:
- Replace only those cells. Every other stored or computed view node stays `p` / `h2` / chrome.
- Number cells: always-visible controlled `input type="number"` `character-value`, same `onChange` as the existing edit inputs (`+event.target.value`; empty → `0`). Unspent → `updateCrP(pageID, 'unspent', …)`. Current Favor → `updateFavor(pageID, { current })`. Die Penalty → `updateSelfDoubt(pageID, { diePenalty })` (Self Doubt only). Current Damage → `updateDamage(pageID, { damage })` (left of the Damage `/`). Current Stress → `updateStress(pageID, { stress })` (left of the Stress `/`).
- Die rows: keep `p` + PNG markup. Enable the existing `dieIndex` click on the view (`index + 1`; click selected → `0`). Do not wrap dice in `<input>` / `<button>`. Selected glyph filter stays `page1-view.md` / T-057. `.view-edit` **cell** tint stays edit-only.
- View die hover: `cursor: pointer` on `.die-row p`. Unselected `p:hover:not(.selected) img` uses the T-057 invert-then-tint method aimed at default teal `#ADD8E6` / `rgba(173, 216, 230)` (face near that teal, ink near-white). Do not paint hover `background` on the `<p>`. Selected hover keeps the flame filter (face is not white). Edit even/odd cell fills and edit hover `rgb(145, 181, 194)` unchanged.
- No POST, no `/quickEdit`, no `viewQuickEdit`, no sidebar change, no insert-row change, no new hooks, no v1 import, no `features/`. No view Save / Revert this phase.
- Leave-warn (T-052) runs only while `isEditing`. Dirty for `beforeunload` / `useBlocker` is `isDirty && isEditing` (`V2View.tsx`). View changes to this set do not warn. The hook’s `isDirty` (`character !== revertedCharacter`) stays. Edit-session leave still warns and still cannot persist (restore catalog, no POST).
- No owner gate this phase. Non-owners see the same view controls. Writes are local only.
- Do not add `.view-edit` or `view-quick-edit` on the view. Inputs use the global transparent / hover teal. Die **cells** stay untinted on the view; unselected **faces** tint teal only on hover (above).
- Leave Integrity Threshold, Trauma, Knock Back, Damage threshold, Stress threshold, Spent CrP, CrP to lvl, Favor max, Anointed, and divine relationship as they are.

Rejected:
- Full-sheet view inputs (the T-029 set).
- A v2 `/quickEdit` owner or “Show Quick Edit Locations.”
- Text inputs for die cells.
- Wiring persist or the Edit toggle in this phase.

Touches: `app/src/pages/v2/pageTypes/pageType1/components/GeneralInfo/GeneralInfo.tsx`; `.../Favor/Favor.tsx`; `.../Vitals/Vitals.tsx`; `.../Vitals/Vitals.css`; `app/src/pages/v2/V2View.tsx`
TODOs: T-058 (done); die hover face: T-059
