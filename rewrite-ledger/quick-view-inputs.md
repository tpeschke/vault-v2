# Quick view inputs (page type 1)
status: accepted   date: 2026-10-04

Decision: Sheet-1 play-time controls on the v2 page-type-1 **view** (`isEditing` false). Phase 1: Unspent CrP, Current Favor, the Self Doubt / Damage / Stress die rows, Die Penalty, Current Damage, Current Stress, and Current Emotions are controls and stay visible. Phase 2: every **input** on that view persists on `blur` when the viewer owns the character — field POST, not a full-character save. Phase 3: a v1-matched sidebar button highlights those locations (`view-quick-edit`). This is not v1 `/quickEdit`.

Why: The designer named the phase-1 set, then added Current Emotions (2026-10-04). Persist is owner-only, field-only, on blur. Sidebar loading matches v1 quick-save. Die cells are clicks, not inputs; they do not POST.

Constraints it imposes:
- Later page types add play-time view controls only when that page’s topic names the cells. Type 2 names the two unlabeled leftover notes (`generalSkillNotes`, `combatSkillNotes`; `page2-view.md`). Type 3 names Contacts, Relationships **P**, and everything under Gear (`page3-view.md`). Persist and location-highlight mechanics stay here. Sheet-wide card contract: `v2-page-type.md`.
- Replace only the named play-time cells. Every other stored or computed view node stays `p` / `h2` / chrome.
- Number cells: always-visible controlled `input type="number"` `character-value`, same `onChange` as the existing edit inputs (`+event.target.value`; empty → `0`). Unspent → `updateCrP(pageID, 'unspent', …)`. Current Favor → `updateFavor(pageID, { current })`. Die Penalty → `updateSelfDoubt(pageID, { diePenalty })` (Self Doubt only). Current Damage → `updateDamage(pageID, { damage })` (left of the Damage `/`). Current Stress → `updateStress(pageID, { stress })` (left of the Stress `/`).
- Die rows: keep `p` + PNG markup. Enable the existing `dieIndex` click on the view (`index + 1`; click selected → `0`). Do not wrap dice in `<input>` / `<button>`. Selected glyph filter stays `page1-view.md` / T-057. View die click persists that `dieIndex` (including `0`) through `persistViewField`. Edit-session die click stays local until Save. Die **cell** teal fills match Edit only while locations are shown (`.view-quick-edit`). Locations off: cells stay untinted.
- View die hover: `cursor: pointer` on `.die-row p`. Unselected `p:hover:not(.selected) img` uses the T-057 invert-then-tint method aimed at default teal `#ADD8E6` / `rgba(173, 216, 230)` (face near that teal, ink near-white) **except** while locations are shown — then unselected hover does not recolor the face (`filter: none`). Do not paint hover `background` on the `<p>` unless locations are shown (then Edit even/odd cell fills and hover `rgb(145, 181, 194)`). Selected hover keeps the flame filter (face is not white). Edit-session die CSS unchanged.
- View persist (phase 2): `onBlur` on every input that is visible while `isEditing` is false. Page 1: Unspent, Current Favor, Die Penalty, Current Damage, Current Stress, Current Emotions. Page 2: the two leftover notes. Page 3: Contacts, Relationship **P**, Gear item/size/W, coinage, Notes. A later view input ships with a new allowlist attribute and its write in the same change. Do not persist on `onChange` except the Current Emotions empty-row path and the page-3 Contacts empty-row path (the input unmounts). Die click is the commit for the three `dieIndex` cells (no `onBlur` on the `<p>`). Page-3 flag click is the commit for `staffSnake` / `meditating` (Anointed-minus-border boxes; no blur). Do not persist while `isEditing` (v1; Edit Save / Revert / local die or flag click unchanged). Non-owners keep the controls; skip POST.
- Payload is one field: `{ pageID, attribute, value }`. `value` is `number` for page-1 number attributes, `string` for `'generalSkillNotes' | 'combatSkillNotes'`, and `Emotion[]` for `'currentEmotions'`. `attribute` is `'unspent' | 'currentFavor' | 'diePenalty' | 'damage' | 'stress' | 'selfDoubtDieIndex' | 'damageDieIndex' | 'stressDieIndex' | 'generalSkillNotes' | 'combatSkillNotes' | 'currentEmotions'`. `'damage'` / `'stress'` remain the current totals. POST `editV2URL + id + '/field'` (`/v2/edit/:characterID/field`). Server owner-checks `getCharacterOwnerID` against `request.user?.id`. Number and text attributes → one-column UPDATE on that `pageID`. `'currentEmotions'` → `saveCurrentEmotions` (replace-all; same SQL as full Save). Number attributes coerce with `+value`. Text attributes write the string. Do not coerce `'currentEmotions'` with `+value` (`Number([])` is `0`). Unknown attribute → refuse, no write. Do not call `saveGeneralInfo` / `saveFavor` / `saveSelfDoubt` / `saveDamage` / `saveStress` (those write sibling columns). Do not POST the full character. No `/quickEdit`. Local `viewQuickEdit` is the location-highlight flag, not a route.
- Skip POST when `!ownsThisCharacter`, when `isEditing`, or when the blurred value already matches `revertedCharacter` (focus/blur no-op). For `'currentEmotions'`, compare only the blurred cell: snapshot row at that index’s `value` versus the blurred string (`''` if the row was removed). Do not skip just because the rest of the array matches. An insert cell has no snapshot row — persist if the insert value is non-empty.
- Current Emotions view chrome: same as Edit — one insert input while `length < 9`, leftover empty `p` pads. Cap 9. `maxLength={25}` on every emotion `input`. Location highlight uses default `.view-quick-edit input` teal. Do not apply edit-session even-cell mid teal on the view. Descriptions Attack/Defense emotion cells stay edit-gated.
- Current Emotions write: refuse if more than 9 rows or any `value` longer than 25. Column stays `varchar(500)`; do not ALTER it. Insert SQL `RETURNING id`. Success body is `{ success: true, currentEmotions: Emotion[] }` with DB ids in rank order. Merge those ids onto live `character` and `revertedCharacter` by index; keep client `key`. Other attributes still return `{ success: true }` only and still do not replace live `character`.
- While any view persist is in flight, the sidebar buttons are replaced by `LoadingIndicator` `secondary={true}` (v1 `isQuickSaving`). Do not `setCharacter(null)`. In-flight count if two blurs overlap. Spinner blocks Edit / Save / Revert.
- Success: toast none. Patch that field on `revertedCharacter`. `cacheCharacterV2` with `Promise.resolve` of that patched snapshot (DB truth). Number/text attributes: do not replace live `character` from the response. `'currentEmotions'`: merge returned ids onto live `character` and the snapshot (full Save would re-insert `id: 0` rows and delete the persisted ones).
- Failure: `toast.error` (T-051). Keep local `character`. Do not patch snapshot or cache. Always clear the in-flight count so the spinner cannot stick. `query()` stays as-is; HTTP success means owner + known attribute + query invoked.
- Leave-warn (T-052) runs only while `isEditing`. Dirty for `beforeunload` / `useBlocker` is `isDirty && isEditing` (`V2View.tsx`). View changes do not warn. The hook’s `isDirty` (`character !== revertedCharacter`) stays. Edit-session Save stays the full-character POST.
- Location highlight (phase 3): local `viewQuickEdit` default `false` (session `useState` only). Sidebar button under Edit, exact v1 copy and icons (`fa-eye` / `fa-eye-slash`, Show / Hide Quick Edit Locations). Who sees it: as v1 — anyone on the view, not owner-gated. Hidden while `isEditing` and while `isViewSaving`. No blank gate this phase. Highlight only: put `view-quick-edit` on `page-shell` when `viewQuickEdit && !isEditing`. Do not put `view-edit` on the view for this toggle. Inputs keep the global transparent / hover teal until that class is on; then they use the existing `.view-quick-edit input` Edit fill. Do not swap `p`↔`input`.
- Leave Integrity Threshold, Trauma, Knock Back, Damage threshold, Stress threshold, Spent CrP, CrP to lvl, Favor max, Anointed, and divine relationship as they are. No view Save / Revert. No v1 import. No `features/`.

Rejected:
- Full-sheet view inputs (the T-029 set).
- A v2 `/quickEdit` **owner** or route. (Revised: the v1 **button copy** “Show / Hide Quick Edit Locations” is required. Local `viewQuickEdit` is the highlight flag.)
- Text inputs for die cells.
- Full-character POST for a view field.
- Debounced persist (Q1: `onBlur`).
- Hiding or disabling view inputs for non-owners.
- Silent persist failure (v1).
- View persist while `isEditing`.
- Hiding view widgets until the location button is on.
- Persisting the location flag across reload.
- Blank-sheet hide for the location button (later).
- Owner-gating the location button.

Revised 2026-10-04 (type-2 leftover notes):
- “Later page types add play-time only when named” — **retained**. Type 2 names the two leftover notes.
- Payload `value` number only — **revised**: `number | string`; text attributes write the string.

Revised 2026-10-04 (Current Emotions):
- Phase-1 set — **revised**: includes Current Emotions.
- “Replace only the phase-1 cells” / “later view input is a column UPDATE” — **revised**: this attribute is a child-table replace-all via `saveCurrentEmotions`, not one column.
- Payload `value` `number | string` — **revised**: `Emotion[]` for `'currentEmotions'`.
- Skip POST when the blurred value matches the snapshot field — **revised** for this attribute: compare only the blurred cell.
- “Do not replace live `character` from the response” — **revised** for this attribute: merge returned ids onto live and snapshot.
- Location highlight default `.view-quick-edit input` teal — **retained** (not edit even-cell mid teal).
- Always-visible play-time inputs; no `/quickEdit` route — **retained**.

Revised 2026-10-04 (page type 3 play-time; Design Contacts / P / Gear):
- Later pages add play-time only when named — **retained**. Type 3 names Contacts, Relationship P, and Gear.
- Die click is the only non-blur commit — **revised**: type-3 flag clicks also persist immediately.
- Contacts follow the Current Emotions replace-all + id-merge path (`'page3Contacts'`). Gear/coinage/notes/P are allowlisted in the same `/field` owner (`page3-view.md`, T-110).

Touches: `app/src/pages/v2/pageTypes/pageType1/components/GeneralInfo/GeneralInfo.tsx`; `.../Favor/Favor.tsx`; `.../Vitals/Vitals.tsx`; `.../Vitals/Vitals.css`; `.../Characteristics/`; `app/src/pages/v2/components/displayArray/DisplaySingleArray.tsx`; `app/src/pages/v2/pageTypes/pageType2/components/GeneralSkills/`; `.../CombatSkills/`; `app/src/pages/v2/pageTypes/pageType3/`; `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/hooks/`; `app/src/pages/v2/components/sidebar/`; `backend/server/v2/edit/`; `backend/common/interfaces/v2/`
TODOs: T-058 (done); die hover face: T-059 (done); view persist: T-060, T-061 (done); die persist: T-062 (done); location highlight: T-063 (done); type-2 leftover notes: T-094–T-096 (done); Current Emotions: T-097–T-099; type-3 play-time: T-110 (done)
