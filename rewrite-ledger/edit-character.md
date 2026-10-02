# Edit character sheet
status: accepted   date: 2026-10-02

Decision: v2 gets a new Edit character sheet objective. A side Edit button (owners only) toggles sheet-level `isEditing`. Designated stored value cells become inputs. Save and Revert sit on that sidebar. Persist is a new v2 edit owner, not v1 edit code.

Why: The designer asked for the v1 edit *session* (mode, owner gate, Save / Revert, full-character POST) as new architecture, not a reuse of v1 modules. v2 inventory had no edit.

Constraints it imposes:
- Do not import `app/src/pages/v1/contexts`, `app/src/pages/v1/components/sidebar`, `app/src/pages/v1/hooks`, `app/src/pages/v1/components/displayArray`, or `backend/server/v1/controllers/edit`. Do not add `features/edit-character` (`fsd-colocation.md`).
- UI lives on the v2 view slice: `EditingContext`, sidebar, hook updates, page-type-1 field swaps. Backend primary: `backend/server/v2/edit/`.
- Edit button only when `userInfo.ownsThisCharacter`. Non-owners stay view-only.
- Sidebar this slice: Edit; while editing, Save and Revert. No Download, Pregen, or Quick Edit.
- `isEditing` default false. Toggle via Edit. Save and Revert both exit edit. Page shell gets `view-edit` while editing (existing `app/src/index.css` rules).
- Local edits update character state. Snapshot for Revert is set on load and after a successful save only — not on each keystroke. v1’s `setCharacterInfo` overwrites the snapshot on every edit (`app/src/pages/v1/hooks/characterHook.tsx`); that is not copied.
- Save: POST the full `CharacterVersion2` to `/v2/edit/:characterID`, then replace local state with the reassembled response (v1 clears, posts, then `setCharacterInfo(data)`). Owner mismatch: refuse, same idea as v1.
- Persist every field on the payload, including page-type-1 values not drawn on this page (capacity, temperaments, goals, relationships, movement, defense `name`), so unshown stores are not wiped.
- Editable on page type 1: stored cells that are already drawn. Inputs keep `className="character-value"` (Kalam). Controlled values so Revert repaints.
- Edit toggle must not move sheet cells. Display `p`/`h2` and layout wrappers keep their pre-edit (T-020 / T-029) metrics. Only the replacing `input`/`textarea` is sized to that display box. Do not raise empty `p` min-height to 18px or lock column widths to make the input fit. Attack name **input** keeps Kalam and the h2 box (12px, `padding: 2px 4px 0`, `letter-spacing: 1px`, `white-space: pre`); do not copy oldClaude or `#bdbdbd`. Strip UA padding (`padding: 0`, `appearance: none` / `textfield`) via `:where` in `View.css`; do not set a global input `font-size`, `width`, or `min-height`. Empty 15px `p` is 17.38px; filled is 18px (line-height 1.2). Edit text inputs use `placeholder=" "` (invisible `::placeholder`) and `:placeholder-shown { height: 17.38px }` vs filled `height: 1.2em` so both states match. Notes textarea `height: calc(2 * 17.38px)` on the control only. Flex number inputs that would grow a row get `min-width: 0` / `overflow: hidden` on the **input**, not the wrapper. No `field-sizing: content`. No contenteditable. Sidebar Save/Revert chrome is out of this box rule.
- Not editable: computed cells (CrP `toLvl`, Emotional Capacity bands, Damage Trauma `threshold * 2`); undrawn defense `name`; Positions; wordmark; slashes; Anointed stays a clickable box, not a new chrome. Die cells: click sets `dieIndex` to `index + 1`; click selected sets `0`.
- Raw `capacity` is stored but not drawn; do not add a cell. Band values stay text.
- List arrays on page type 1 except attacks (emotions, descriptions, flaws, reputations, social-suite description rows) use the v1 edit setup, copied onto the v2 slice: array holds only real rows; view leftover empty cells pad to `max`; while editing and `length < max`, one extra unbound insert control; insert on `onBlur` if non-empty; `makeTempID()` as client `key` for React; emptying a row’s stored fields removes it from the array (v1 `alterCharacteristicArray`). Caps stay 6 / 5 / 3 / 3 / 6. Shared widgets: `app/src/pages/v2/components/displayArray/` (`DisplaySingleArray`, `DisplayPairArray`). Do not import v1 `displayArray` or v1 hooks. Attacks stay four indexed slots. Save stays v1 list SQL (already on `backend/server/v2/edit/`). New rows: `id` 0 or omitted so save inserts; React key is `key`, not `id`.
- Catalog: on general-info local change, `updateCatalogInfo` with `index: 1` (v2 slot).
- L1 route and `00-START-HERE.yaml` update in the same change that adds `backend/server/v2/edit/`.
- `frontend-config.ts` is gitignored. Add `editV2URL` beside `viewV2URL` / `editURL`. Mount `app.use('/v2/edit', …)` in `vault.ts`. Do not reuse `/edit`.

Rejected:
- Reusing v1 edit controllers, context, sidebar, or hooks.
- `app/src/features/edit-character`.
- v2 Quick Edit or PDF as part of this feature.
- Per-field click-to-edit or always-visible inputs.
- Turning computed cells into inputs.
- Drawing defense `name` or a raw capacity cell to make them editable.
- Global `.v2 input.character-value` `font-size: 15px` / `width: 100%` / `min-height: 17.38px` (fights Favor 28px/60×40, Defenses 23px, Vitals 22px, attack-name h2).
- Matching attack-name input to oldClaude or grey h2 fill.
- `field-sizing: content` or contenteditable.
- Changing view-mode `p`/`h2` or column wrappers to meet the input (T-031 min-height 18px, rank `width: 28px`, suite `p` `width: 15%`, Discount `width: 42%`).
- Always painting `max` stored `{ id: 0 }` pads for list arrays (superseded: v1 leftover pads + insert row).
- Shared list kit under `app/src/features/` or import of v1 `DisplaySingleArray` / `DisplayPairArray`.

Touches: `app/src/pages/v2/`; `backend/server/v2/edit/` (new); `backend/server/vault.ts`; gitignored `app/src/frontend-config.ts`; `00-START-HERE.yaml`; `rewrite-ledger/feature-inventory.md`
TODOs: T-027–T-034 (done)
