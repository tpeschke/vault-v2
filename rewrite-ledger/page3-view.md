# Page type 3 NPCs & Equipment view
status: accepted   date: 2026-10-04

Decision: The v2 page-type-3 view matches official blank page 3: Contacts | Relationships on top, Gear below. `pageTypeID` 3. Multiple instances allowed. New characters get one type-3 at `v2CharacterPages.index` 2. Existing characters are not backfilled. Gutter add label: **NPCs & Equipment** (`fa-plus` + that exact text; no tooltip). Contacts is one edit-session text box (Save only), the same control family as page-type-2 Abilities. Play-time: Relationships **P** and everything under Gear (`quick-view-inputs.md`). Sheet-wide fonts, `character-value`, page box, overflow, and island: `v2-page-type.md`. Wordmark is page-1 only. Gutter: `add-page-type-1.md` / `page-reorder.md`.

Why: Designer named page type 3 from the official blank and answered Design Q1–Q14 plus Notes (2026-10-04). Official blank is the layout source. Page-type-1 / page-type-2 are the mechanical exemplars. 2026-10-28: Contacts follows Abilities (Save only, view `p`), the box is 18 × 17.38px, and existing contact rows are joined into that string. Same day: Contacts and Relationships rows line up; each kind of measure matches Abilities (band to band, text line to text line). 15px under that pair, above Gear.

Constraints it imposes:
- Sheet-wide contract: `v2-page-type.md`. This file owns page-type-3 section order, labels, stores, slot keys, and exceptions.
- Official blank is letter portrait on `.page` 796×1036 (same aspect). Do not landscape-remap. Overflow past 1068 is recorded. Do not set `--mapped-row-min-height: 19.38px` on `.page-type-three`. Use the sheet-wide 15px / 17.38px box.
- No wordmark. No page-1 leftover widgets (Temperaments, Relationships, Movement, Goals). Those stay on the page-1 store. Do not migrate `v2Relationships`.
- Class root `.page-type-three`. Reuse `doubleColumn` only for the top Contacts | Relationships pair. Gear is page-local three-column CSS. Do not add `TripleColumn` under `pageTypes/components/`.
- Top labels: **Contacts, Allies, Mentors, & Enemies**; **Relationships**; **R**; **P**. Gear `h1` **Gear**. Column heads **Type (Item)**, **Size**, staff-snake icon, person-meditating icon, **W**. Section chrome: **held bag**, **Other Containers**, **Quarter Mastering**, **Tiny & Other**, **Carry**, **Coinage**, **Notes**, **Size**, `100 coins = 1s`, `x100 cc` / `x100 sc` / `x100 gc`. Worn labels stay as printed: Head, Chest, Coat, gloves, pants, shoes, Armor, L. Hand, R. Hand, Backpack, Pouch. Footnote chrome: `* Item is recorded in either clothing or other containers`. `->` and `*` are chrome.
- Contacts: one `text` string (`contacts` on `v2Page3Basics`). Heading stays **Contacts, Allies, Mentors, & Enemies**. Page-local pane under that heading. Do not import page-type-2 `NotesPanes`. Edit: `textarea.character-value`. View: `p.character-value`. `white-space: pre-wrap`. Min-height `calc(18 * 17.38px)` on both (18 bands, the Relationships row count). Painted band matches Abilities: pitch **17.38px**, first band white, `#fff` / `#f3f3f3`, `repeating-linear-gradient`, `background-attachment: local`. Text line matches Abilities: `font-size: 15px`, `line-height: 1.2` (the `View.css` textarea and the `index.css` `p`). Do not set `line-height` to 17.38. Do not add `field-sizing`. Overflow past 18 lines is recorded. In `.view-edit`, teal wash at rest `rgba(173, 216, 230, 0.35)` and hover `rgba(145, 181, 194, 0.35)` over that zebra. Beat `index.css` solid `.view-edit textarea` teal. View `p` is zebra only. Not play-time. No cap, no insert row, no `DisplaySingleArray`. Local until full Save. The heading bar’s border-box matches the Relationships header bar (below).
- Relationships: `{ id, key?, value, r, p }[]`. Cap **18**. `value` is the name. `r` and `p` are `number | ''`. Page-local three-field row. Do not add a shared triple widget. **R** is edit-session only. **P** is play-time. View cannot insert a relationship row (name is edit-gated). Each list row’s border-box is **17.38px** in view and in edit (`height` and `min-height`), the same painted band as Contacts and Abilities. `padding: 2px 1px` stays inside that box. It must not add height. Child `min-height: 17.38px` (this file and `index.css` `p`) must not grow the span. Text line stays `font-size: 15px`, `line-height: 1.2`. Beat `View.css` filled-input `height: 1.2em` and `padding: 0` so a filled `input` cannot grow the row. The header `h1`s (Relationships / **R** / **P**) and the Contacts `h1` share one border-box (`height` / `min-height` `calc(16px + 8px)`, `line-height: 16px`; `.v2 h1` padding stays inside) so row 1 starts on the same line. The headers row is that same height. Contacts may keep `font-size: 13px` and `nowrap` inside that bar.
- **15px** under the Contacts | Relationships `double-column`, above the Gear `h1`. Scope it to `.page-type-three`. Do not put it on shared `DoubleColumn.css`. Do not change Gear rows.
- Gear cells sit on **fixed slots** (the blank is not a free list). Each slot: `{ slot, item, size, staffSnake, meditating, w }`. `item` string; `size` string; flags boolean; `w` is `number | ''`. Unique `(pageID, slot)`.
- Default `size` `'S'` only where the blank prints S: `leftS1`–`leftS15`, `midS1`–`midS6`, `carryM4`–`carryP5`. All other slots default `size` `''`. Flags default false. `w` default `''`.
- Slot keys (left 28, then middle 21, then right 20):

  Left: `head` `chest` `coat` `gloves` `pants` `shoes` `armor` `lHand` `rHand` `backpack` `leftS1`–`leftS9` `pouch1` `leftS10` `leftS11` `pouch2` `leftS12` `leftS13` `pouch3` `leftS14` `leftS15`

  Middle: `heldBag1` `midS1` `midS2` `midS3` `heldBag2` `midS4` `midS5` `midS6` `other1` `other2` `other3` `carryM4` `carryM3` `carryM2` `carryM1` `carry0` `carryP1` `carryP2` `carryP3` `carryP4` `carryP5`

  Right: `qm1`–`qm10` `tiny1`–`tiny10`

- Worn / Backpack / Pouch / held bag labels and Carry **−4 Str** … **5 Str** / QM numbers are chrome. Type (Item) is the writable remainder of that track.
- Flag columns: boolean. Mimic Anointed’s check box (`Favor.tsx` / `Favor.css`: 12×12, `fa-solid fa-check` when true, edit teal / hover / checked-black) **without** `border`. Do not reuse `.anointed-box`. Page-local class. Do not mark `character-value`. Play-time: clickable on the view; persist on click (die-click pattern). Edit-session click stays local until Save.
- Icons: `fa-solid fa-staff-snake` and `fa-solid fa-person-meditating` from the existing kit (`app/index.html`). Header icons replace the blank’s bandage / heart emoji.
- Coinage: `cc` / `sc` / `gc` / `pc` amounts (`number`, empty → `0`) **and** a Size string per denomination. Play-time.
- Notes: one wrap/grow `text` string (`notes`). Favor `divineRelationship` box: `min-height: calc(2 * 17.38px)`, wrap and grow, textarea in edit, always-visible textarea or input on the view (play-time). Overflow recorded. Not one string per printed Notes line.
- Do not compute encumbrance. Carry bands are written slots, not v1 S/M/L totals.
- Relationships list: real rows only; leftover pads to cap 18; insert on blur if any stored field is non-empty; `makeTempID` for React keys; clearing stored fields removes the row. New rows `id` 0 or omitted. Insert only while editing.
- Edit: Contacts swaps to the textarea above. Relationship `value` and **R** swap to controlled `character-value` inputs. Chrome stays text. Play-time cells stay controls in both modes.
- Persist every type-3 field on the full Save payload. Schema: `ensureSchema` + `backupTables/page3.sql` in the same change (`schema-on-boot.md`). Tables keyed by `pageID`:
  - `v2Page3Basics` — unique `pageID`; `contacts text` default `''`; `notes text`; `copper` `silver` `gold` `platinum` integer default 0; `copperSize` `silverSize` `goldSize` `platinumSize` varchar default `''`
  - `v2Page3Relationships` — `pageID`, `value` varchar(500), `r` integer, `p` integer, `index`
  - `v2Page3Gear` — `pageID`, `slot` varchar, `item` varchar(500), `size` varchar(50), `staffSnake` boolean default false, `meditating` boolean default false, `w` integer, unique `(pageID, slot)`
- Create-character: insert type 1 at index 0, type 2 at index 1, type 3 at index 2. Existing characters stay without type 3 until the owner clicks **+ NPCs & Equipment** (`add-page-type-1.md`).
- Catalog identity stays the first page-type-1. Type 3 has no catalog name.
- Existing `v2Page3Contacts` rows: non-empty `value`s joined with newlines in `index`, `id` order into `contacts` where that column is null or `''`, including a basics row when contact rows exist and basics does not. Then drop `v2Page3Contacts`. Do not recreate it. Do not overwrite a non-empty `contacts` string.
- Play-time on this type (`quick-view-inputs.md`): Relationships **P**; every Gear item / size / flag / W; coinage amounts and sizes; Notes. Field-POST attributes ship in the same change as the controls. Flag click is the commit (no blur). Unknown attribute → refuse. Contacts is not a field-POST attribute.
- Vertical slice paths: `v2-page-type.md` (`pageType3` / `page3`). Gutter add: `emptyPageType3` + `addPageType3After`. Save count-gate includes type 3.

Rejected:
- Boot-insert type 3 onto existing characters (Q4: button only).
- Flattened v1 Gear & Loot item+size grid or computed encumbrance.
- Foundry paper-doll / spatial inventory.
- Migrating page-1 `relationships` onto this page (Q12: leave).
- Shared triple-array widget or `TripleColumn`.
- The 19.38 leftover bump on this card (Q13).
- Tooltip on the add button (Q14: visible label only).
- Anointed gray border on the flag boxes.
- Wordmark on type 3.
- Importing v1 gear / pageTwo modules.
- A new L1 user-objective key for “page type 3.”
- One stored Notes string per printed line (Q10: one wrap).
- W / R / P as text (Q6–Q7: number).
- Contacts as more than one string per row (Q8). Superseded 2026-10-28: the row list itself is rejected (one pane string).
- Contacts as an 18-row list, `DisplaySingleArray`, or a play-time insert (2026-10-28: one Save-only text box).
- `field-sizing` on the Contacts pane.
- Importing page-type-2 `NotesPanes`.
- Sizing the Contacts box to the padded relationship span. The box is 18 × 17.38px.
- Editable worn labels. Display-only **S** (Q9: stored default).
- One coinage Size for the whole block (Q11: per denomination).

Revised 2026-10-28 (row alignment; band matches band, text line matches text line; 15px above Gear):
- Contacts min-height `18 × 17.38` and band pitch 17.38 — **retained**.
- “The box is not the padded relationship span” (T-113) — **revised**: each Relationships row border-box is 17.38px, padding inside, so the painted row matches the Contacts band.
- Setting Contacts `line-height` to 17.38 so text sits in the band — **rejected**. Text line stays Abilities’ `15px` / `1.2`.
- No space between the double column and Gear — **revised**: `margin-bottom: 15px` on `.page-type-three .double-column`, above the Gear `h1`.

Revised 2026-10-28 (Contacts text box; Design answers: follow Abilities; height matches Relationships at 18 × 17.38; join existing rows):
- Play-time includes the Contacts list — **revised**: Contacts is edit-session. Save writes the string. View is `p`.
- `{ id, key?, value }[]`, cap 18, leftover pads, `DisplaySingleArray`, `showInsert` — **rejected**.
- “Contacts as more than one string (Q8)” — **revised**: that rejected extra columns on a row. The row list is now rejected. One `text` string for the pane.
- `v2Page3Contacts` (`value varchar(500)`, `index`) — **revised**: copy non-empty values (newline join, `index`, `id` order) into `v2Page3Basics.contacts` when that column is empty, then drop the table.
- List-array rules applied to contacts, including view insert — **revised**: relationships stay a list. Contacts is not a list.
- `'page3Contacts'` field POST — **rejected**.

Touches: `app/src/pages/v2/pageTypes/pageType3/`; `backend/common/interfaces/v2/page3/`; `backend/server/v2/{view,edit,add,delete}/`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page3.sql`; ledger front panels
TODOs: T-100–T-112 (done); contacts text box: T-113 (done); row alignment and 15px above Gear: T-114 (proposed)
