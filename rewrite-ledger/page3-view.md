# Page type 3 NPCs & Equipment view
status: accepted   date: 2026-10-04

Decision: The v2 page-type-3 view matches official blank page 3: Contacts | Relationships on top, Gear below. `pageTypeID` 3. Multiple instances allowed. New characters get one type-3 at `v2CharacterPages.index` 2. Existing characters are not backfilled. Gutter add label: **NPCs & Equipment** (`fa-plus` + that exact text; no tooltip). Play-time: the Contacts list, Relationships **P**, and everything under Gear (`quick-view-inputs.md`). Sheet-wide fonts, `character-value`, page box, overflow, and island: `v2-page-type.md`. Wordmark is page-1 only. Gutter: `add-page-type-1.md` / `page-reorder.md`.

Why: Designer named page type 3 from the official blank and answered Design Q1–Q14 plus Notes (2026-10-04). Official blank is the layout source. Page-type-1 / page-type-2 are the mechanical exemplars.

Constraints it imposes:
- Sheet-wide contract: `v2-page-type.md`. This file owns page-type-3 section order, labels, stores, slot keys, and exceptions.
- Official blank is letter portrait on `.page` 796×1036 (same aspect). Do not landscape-remap. Overflow past 1068 is recorded. Do not set `--mapped-row-min-height: 19.38px` on `.page-type-three`. Use the sheet-wide 15px / 17.38px box.
- No wordmark. No page-1 leftover widgets (Temperaments, Relationships, Movement, Goals). Those stay on the page-1 store. Do not migrate `v2Relationships`.
- Class root `.page-type-three`. Reuse `doubleColumn` only for the top Contacts | Relationships pair. Gear is page-local three-column CSS. Do not add `TripleColumn` under `pageTypes/components/`.
- Top labels: **Contacts, Allies, Mentors, & Enemies**; **Relationships**; **R**; **P**. Gear `h1` **Gear**. Column heads **Type (Item)**, **Size**, staff-snake icon, person-meditating icon, **W**. Section chrome: **held bag**, **Other Containers**, **Quarter Mastering**, **Tiny & Other**, **Carry**, **Coinage**, **Notes**, **Size**, `100 coins = 1s`, `x100 cc` / `x100 sc` / `x100 gc`. Worn labels stay as printed: Head, Chest, Coat, gloves, pants, shoes, Armor, L. Hand, R. Hand, Backpack, Pouch. Footnote chrome: `* Item is recorded in either clothing or other containers`. `->` and `*` are chrome.
- Contacts: `{ id, key?, value }[]`. One string per row. Cap **18**. Leftover pads to 18. `DisplaySingleArray` with `showInsert={true}` (play-time insert, same as Current Emotions).
- Relationships: `{ id, key?, value, r, p }[]`. Cap **18**. `value` is the name. `r` and `p` are `number | ''`. Page-local three-field row. Do not add a shared triple widget. **R** is edit-session only. **P** is play-time. View cannot insert a relationship row (name is edit-gated).
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
- List arrays (contacts, relationships): real rows only; leftover pads to cap; insert on blur if any stored field is non-empty; `makeTempID` for React keys; clearing stored fields removes the row. New rows `id` 0 or omitted. Contacts insert also while `!isEditing` (`showInsert`).
- Edit: stored drawn cells that are not play-time swap to controlled `character-value` inputs (relationship `value` and **R**). Chrome stays text. Play-time cells stay controls in both modes.
- Persist every type-3 field on the full Save payload. Schema: `ensureSchema` + `backupTables/page3.sql` in the same change (`schema-on-boot.md`). Tables keyed by `pageID`:
  - `v2Page3Basics` — unique `pageID`; `notes text`; `copper` `silver` `gold` `platinum` integer default 0; `copperSize` `silverSize` `goldSize` `platinumSize` varchar default `''`
  - `v2Page3Contacts` — `pageID`, `value` varchar(500), `index`
  - `v2Page3Relationships` — `pageID`, `value` varchar(500), `r` integer, `p` integer, `index`
  - `v2Page3Gear` — `pageID`, `slot` varchar, `item` varchar(500), `size` varchar(50), `staffSnake` boolean default false, `meditating` boolean default false, `w` integer, unique `(pageID, slot)`
- Create-character: insert type 1 at index 0, type 2 at index 1, type 3 at index 2. Existing characters stay without type 3 until the owner clicks **+ NPCs & Equipment** (`add-page-type-1.md`).
- Catalog identity stays the first page-type-1. Type 3 has no catalog name.
- Play-time on this type (`quick-view-inputs.md`): Contacts (whole list); Relationships **P**; every Gear item / size / flag / W; coinage amounts and sizes; Notes. Field-POST attributes ship in the same change as the controls. Flag click is the commit (no blur). Unknown attribute → refuse.
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
- Contacts as more than one string (Q8).
- Editable worn labels. Display-only **S** (Q9: stored default).
- One coinage Size for the whole block (Q11: per denomination).

Touches: `app/src/pages/v2/pageTypes/pageType3/`; `backend/common/interfaces/v2/page3/`; `backend/server/v2/{view,edit,add,delete}/`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page3.sql`; ledger front panels
TODOs: T-100–T-112 (proposed)
