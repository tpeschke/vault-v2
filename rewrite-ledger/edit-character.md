# Edit character sheet
status: accepted   date: 2026-10-02

Decision: v2 gets a new Edit character sheet objective. A side Edit button (owners only) toggles sheet-level `isEditing`. Designated stored value cells become inputs. Save and Revert sit on that sidebar. Persist is a new v2 edit owner, not v1 edit code.

Why: The designer asked for the v1 edit *session* (mode, owner gate, Save / Revert, full-character POST) as new architecture, not a reuse of v1 modules. v2 inventory had no edit.

Constraints it imposes:
- New files. Do not import `app/src/pages/v1/contexts`, `app/src/pages/v1/components/sidebar`, `app/src/pages/v1/hooks`, or `backend/server/v1/controllers/edit`. Do not add `features/edit-character` (`fsd-colocation.md`).
- UI lives on the v2 view slice: `EditingContext`, sidebar, hook updates, page-type-1 field swaps. Backend primary: `backend/server/v2/edit/`.
- Edit button only when `userInfo.ownsThisCharacter`. Non-owners stay view-only.
- Sidebar this slice: Edit; while editing, Save and Revert. No Download, Pregen, or Quick Edit.
- `isEditing` default false. Toggle via Edit. Save and Revert both exit edit. Page shell gets `view-edit` while editing (existing `app/src/index.css` rules).
- Local edits update character state. Snapshot for Revert is set on load and after a successful save only — not on each keystroke. v1’s `setCharacterInfo` overwrites the snapshot on every edit (`app/src/pages/v1/hooks/characterHook.tsx`); that is not copied.
- Save: POST the full `CharacterVersion2` to `/v2/edit/:characterID`, then replace local state with the reassembled response (v1 clears, posts, then `setCharacterInfo(data)`). Owner mismatch: refuse, same idea as v1.
- Persist every field on the payload, including page-type-1 values not drawn on this page (capacity, temperaments, goals, relationships, movement, defense `name`), so unshown stores are not wiped.
- Editable on page type 1: stored cells that are already drawn. Inputs keep `className="character-value"` (Kalam). Controlled values so Revert repaints.
- Edit toggle must not move sheet cells. Each swapped control copies the corresponding display tag’s box: width, height, min-height, padding, font-size, line-height, letter-spacing, text-align, display. Attack name is `h2.character-value` in view; the input keeps Kalam and that h2 box (right-column h2 is 12px / `padding: 2px 4px 0`, plus `letter-spacing: 1px` and `white-space: pre`). Do not copy oldClaude or `#bdbdbd` onto the input — `.view-edit` already paints edit fill. Strip UA inner padding on text and number inputs (`padding: 0`, `appearance: none` / `textfield`). Do not set a global input `font-size`, `width`, or `min-height` in `View.css`; pair widget selectors so `p`/`h2` and `input`/`textarea` share the cell metrics. Notes textareas keep `min-height: calc(2 * 17.38px)`. No `field-sizing: content`. No contenteditable. Sidebar Save/Revert chrome is out of this box rule.
- Not editable: computed cells (CrP `toLvl`, Emotional Capacity bands, Damage Trauma `threshold * 2`); undrawn defense `name`; Positions; wordmark; slashes; Anointed stays a clickable box, not a new chrome. Die cells: click sets `dieIndex` to `index + 1`; click selected sets `0`.
- Raw `capacity` is stored but not drawn; do not add a cell. Band values stay text.
- List pads (emotions 6, descriptions 5, flaws 3, reputations 3, social-suite description rows 6) become inputs. First change on an empty pad inserts a local row (temp id). Save: delete rows not in the posted list, update rows with ids, insert the rest — v1 list save shape, new SQL keyed like current v2 view/add/delete (`pageID`, not the stale `backupTables` `characterid`).
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

Touches: `app/src/pages/v2/`; `backend/server/v2/edit/` (new); `backend/server/vault.ts`; gitignored `app/src/frontend-config.ts`; `00-START-HERE.yaml`; `rewrite-ledger/feature-inventory.md`
TODOs: T-027–T-030 (done); T-031
