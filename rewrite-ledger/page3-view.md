# Page type 3 NPCs & Equipment view
status: accepted   date: 2026-10-04

Decision: The v2 page-type-3 view matches official blank page 3: Contacts | Relationships on top, Gear below. `pageTypeID` 3. Multiple instances allowed. New characters get one type-3 at `v2CharacterPages.index` 2. Existing characters are not backfilled. Gutter add label: **NPCs & Equipment** (`fa-plus` + that exact text; no tooltip). Contacts is one string, the same control family as page-type-2 Abilities, and it is play-time. Play-time also includes the relationship name, **R**, and **P**, and Gear except the printed-S size cells, which are text (`quick-view-inputs.md`). Sheet-wide fonts, `character-value`, page box, overflow, and island: `v2-page-type.md`. Wordmark is page-1 only. Gutter: `add-page-type-1.md` / `page-reorder.md`.

Why: Designer named page type 3 from the official blank and answered Design Q1–Q14 plus Notes (2026-10-04). Official blank is the layout source. Page-type-1 / page-type-2 are the mechanical exemplars. 2026-10-28: Contacts is one string, the box is 18 × 17.38px, and existing contact rows are joined into that string. Same day: Contacts and Relationships rows line up; each kind of measure matches Abilities (band to band, text line to text line). 15px under that pair, above Gear. Same day: Contacts, the relationship name, and **R** blur-save on the view. The view can insert a relationship and clear one. Same day: the **R** cell’s gray rules run the full 17.38px row. Same day: Show Quick Edit washes the Contacts textarea over the stripes. Same day: the Gear meditating head stays `fa-person-meditating`, and that icon is added to the kit subset. 2026-10-30: Gear stacks and their cells align to the top on five shared tracks; snake and meditating are separate checkbox columns; the meditating head is the Gear SVG; `->` sits in Size; printed S is text; Notes use the Contacts zebra and both panes turn teal on hover. Quarter Mastering stays under that column’s head. Same day, later: Quarter Mastering Size is printed **S**, and every `qm1`–`qm15` size is stored and shown as `S`.

Constraints it imposes:
- Sheet-wide contract: `v2-page-type.md`. This file owns page-type-3 section order, labels, stores, slot keys, and exceptions.
- Official blank is letter portrait on `.page` 796×1036 (same aspect). Do not landscape-remap. Overflow past 1068 is recorded. Do not set `--mapped-row-min-height: 19.38px` on `.page-type-three`. Use the sheet-wide 15px / 17.38px box.
- No wordmark. No page-1 leftover widgets (Temperaments, Relationships, Movement, Goals). Those stay on the page-1 store. Do not migrate `v2Relationships`.
- Class root `.page-type-three`. Reuse `doubleColumn` only for the top Contacts | Relationships pair. Gear is page-local three-column CSS. Do not add `TripleColumn` under `pageTypes/components/`.
- Top labels: **Contacts, Allies, Mentors, & Enemies**; **Relationships**; **R**; **P**. Gear `h1` **Gear**. Column heads **Type (Item)**, **Size**, staff-snake icon, person-meditating icon, **W**. Section chrome: **Held Bag**, **Other Containers**, **Quarter Mastering**, **Tiny & Other**, **Carry**, **Coinage**, **Notes**, **Size**, `100 coins = 1s`, `x100 cc` / `x100 sc` / `x100 gc`. Worn labels stay as printed: Head, Chest, Coat, Gloves, Pants, Shoes, Armor, L. Hand, R. Hand, Backpack, Pouch. Footnote chrome: `* Item is recorded in either clothing or other containers`. `->` and `*` are chrome. `->` (`fa-arrow-right-long`) sits in the Size cell on Head through R. Hand and on `other2` / `other3` / `other4`. That cell is the arrow only. No size input, and the stored size is not drawn.
- Contacts: one `text` string (`contacts` on `v2Page3Basics`). Heading stays **Contacts, Allies, Mentors, & Enemies**. Page-local pane under that heading. Do not import page-type-2 `NotesPanes`. Always `textarea.character-value` (view and edit). No view `p`. `white-space: pre-wrap`. Min-height `calc(18 * 17.38px)` (18 bands, the Relationships row count). Painted band matches Abilities: pitch **17.38px**, first band white, `#fff` / `#f3f3f3`, `repeating-linear-gradient`, `background-attachment: local`. Text line matches Abilities: `font-size: 15px`, `line-height: 1.2`. Do not set `line-height` to 17.38. Do not add `field-sizing`. The drawn box is the max height (do not change the live min-height). Clip. Do not scroll. Do not grow (`textarea-limits.md`). In `.view-edit`, teal wash at rest `rgba(173, 216, 230, 0.35)` and hover `rgba(145, 181, 194, 0.35)` over that zebra. Beat `index.css` solid `.view-edit textarea` teal. In plain view, rest stays the unwashed zebra and hover stacks `rgba(145, 181, 194, 0.35)` on it. Beat `index.css` solid `textarea:hover`. Play-time: blur POSTs the string as `'page3Contacts'` (that column only, not a row array). While editing, blur does not POST; full Save writes the column. While `view-quick-edit` is on, this textarea uses the same wash as `.view-edit`: rest `rgba(173, 216, 230, 0.35)` and hover `rgba(145, 181, 194, 0.35)`, each stacked on the zebra. The stripes stay visible. The solid `index.css` `.view-quick-edit textarea` fill does not paint this box. Cap 1350 (`textarea-limits.md`), which replaces the old per-row `varchar(500)` and the no-cap string. Column stays `text`. No insert row, no `DisplaySingleArray`. The heading bar’s border-box matches the Relationships header bar (below).
- Relationships: `{ id, key?, value, r, p }[]`. Cap **18**. `value` is the name. `r` and `p` are `number | ''`. Page-local three-field row. Do not add a shared triple widget. The name, **R**, and **P** are play-time: always an input, blur POST for a row with `id > 0`. Name attribute `'page3RelationshipValue'` is `{ id, value }`; refuse `value` longer than 500. **R** attribute `'page3RelationshipR'` is `{ id, r }`. **P** stays `'page3RelationshipP'`. View shows the insert row while `length < 18`. Insert blur POSTs `'page3RelationshipInsert'` (`{ value, r, p }`) and merges the returned `id` onto that live row and the snapshot; keep the client `key`. If that row is already gone, delete the returned `id`. If live `value` / `r` / `p` differ from the inserted payload, POST those cells once `id` is set. Clearing the last stored field removes the row and POSTs `'page3RelationshipDelete'` (`{ id }`) on that change when `id > 0`, because the input unmounts. While editing, none of these POST. Full Save still writes the list. Each list row’s border-box is **17.38px** in view and in edit (`height` and `min-height`), the same painted band as Contacts and Abilities. The **R** cell (`span > :nth-child(2)`) keeps `border-left` and `border-right` `1px solid #bdbdbd`. Those rules run that full 17.38px (stored, insert, and leftover rows). `padding: 2px 1px` is on the cell, inside that box, so the rule meets the next row and the padding does not add height. The name cell and the **P** cell have no gray border. The header bar has no gray rule. Child `min-height: 17.38px` (this file and `index.css` `p`) must not grow the span. Text line stays `font-size: 15px`, `line-height: 1.2`. Beat `View.css` filled-input `height: 1.2em` and `padding: 0` so a filled `input` cannot grow the row. The header `h1`s (Relationships / **R** / **P**) and the Contacts `h1` share one border-box (`height` / `min-height` `calc(16px + 8px)`, `line-height: 16px`; `.v2 h1` padding stays inside) so row 1 starts on the same line. The headers row is that same height. Contacts may keep `font-size: 13px` and `nowrap` inside that bar.
- **15px** under the Contacts | Relationships `double-column`, above the Gear `h1`. Scope it to `.page-type-three`. Do not put it on shared `DoubleColumn.css`. Do not change Gear rows.
- Gear cells sit on **fixed slots** (the blank is not a free list). Each slot: `{ slot, item, size, staffSnake, meditating, w }`. `item` string; `size` string; flags boolean; `w` is `number | ''`. Unique `(pageID, slot)`.
- Default `size` `'S'` where the blank prints S, and on Quarter Mastering: `leftS1`–`leftS15`, `midS1`–`midS6`, `carryM4`–`carryP5`, `carry11`–`carry18`, `qm1`–`qm15`. Those cells render the stored size as text. Not an input, not `readOnly`, not `disabled`, not `character-value`. No size POST from those cells. `qm1`–`qm15` store `'S'`: assemble returns `'S'`, full Save and a `page3Gear` field write store `'S'`, and boot sets every existing `v2Page3Gear` row for those slots to `'S'` (`schema-on-boot.md`). The other printed-S slots still render and store the size they already have. All other slots default `size` `''` and keep a size input. Arrow rows (`head` through `rHand`, `other2`, `other3`, `other4`) draw the arrow only: no size input, no size text, no size POST. The stored size stays. Flags default false. `w` default `''`. Coinage Size is not a slot and is not this string: it is the calculated text under Coinage below.
- Slot keys. The render column is not the stored order. `PAGE3_GEAR_SLOTS` stays: worn and container keys through `midS6`, then `other1`–`carry18`, then `qm1`–`tiny13`. Do not reorder that array.

  First column (27): `head` `chest` `coat` `gloves` `pants` `shoes` `armor` `lHand` `rHand` `carryM4` `carryM3` `carryM2` `carryM1` `carry0` `carryP1` `carryP2` `carryP3` `carryP4` `carryP5` `carry11`–`carry18`

  Second column (28): `qm1`–`qm15` `tiny1`–`tiny13`

  Third column (31): `backpack` `leftS1`–`leftS9` `pouch1` `leftS10` `leftS11` `pouch2` `leftS12` `leftS13` `pouch3` `leftS14` `leftS15` `heldBag1` `midS1` `midS2` `midS3` `heldBag2` `midS4` `midS5` `midS6` `other1` `other2` `other3` `other4`

  Notes renders in the first column after the Carry rows. The footnote renders at the bottom of the third column, after `other4`. Coinage renders in the second column after `tiny13`. None of those is a gear slot.

- Worn labels (Head through R. Hand) and QM numbers **1**–**15** are chrome. Carry rows have no strength label. Type (Item) is the writable remainder of that track. **Backpack**, **Pouch**, **Held Bag**, and **Other Containers** are bar headers (`backpack`, `pouch1`, `pouch2`, `pouch3`, `heldBag1`, `heldBag2`, `other1`): the printed label only, spanning all five tracks. No item, size, flag, or **W** control on that row, and the stored cell is not drawn. The slot rows stay in the database.
- Gear columns: three stacks, tops aligned (`align-items: start`). The column head is the first child of each stack. First column, under that head: Head through R. Hand, then **Carry** and its 18 rows, then **Notes**. Second column, under that head: **Quarter Mastering**, **Tiny & Other**, then Coinage. Third column, under that head: Backpack, the three Pouches, and both Held Bags, each bar with the printed-S rows under it, then **Other Containers** (`other1`, `other2`, `other3`, `other4`), then the footnote. Each head and each row share five tracks: Type (Item), Size, snake, meditating, **W**. Type (Item) stays on the top edge of the row. Size, snake, meditating, and **W** center their contents on both axes, in the column head and in each data row. The tracks are `minmax(0, 1fr) 30px 18px 18px 28px`. Those four tracks have `border-left: 1px solid #bdbdbd` on the column head and on each data row, inside the track width. The rule stops at a bar header and at **Carry**, **Notes**, **Quarter Mastering**, and **Tiny & Other**. Section `h2` bars span all five tracks and have no user-agent margin. Arrow rows do not change the Size width. The column head and each data row, including a bar header, are a **17.38px** border-box (`height`, `min-height`, and `max-height`), the same band as a Relationships row. `padding: 2px 1px` stays inside that box. Inputs fill the cell. They do not set `height: 17.38px`. The row’s `min-height` is that specified 17.38px, not `auto`, so content cannot raise it. Do not set `grid-auto-rows` on the column. Do not set `overflow: hidden` on the head or the row. The 18×18 meditating image and the check may paint outside. Neither grows the row.
- Flag columns: boolean, one track each. Both boxes render on every gear row except the seven bar headers above. Mimic Anointed’s check box (`Favor.tsx` / `Favor.css`: 12×12, `fa-solid fa-check` when true, edit teal / hover / checked-black) **without** `border`. Do not reuse `.anointed-box`. Page-local class. Do not mark `character-value`. No `margin: auto` on the box. No border on the box. The box is centered in the track on both axes. The track’s left rule is not that border. The check may paint outside the box. That overflow must not grow the row. Play-time: clickable on the view; persist on click (die-click pattern). Edit-session click stays local until Save.
- Icons: the meditating head is the only swap. It is `<img alt="">` of `app/src/pages/v2/pageTypes/pageType3/components/Gear/assets/person-meditating-solid-full.svg`, 18×18 in that header track. It may paint outside the 17.38px head. It must not grow that head. The rule is on `img`, not on `svg`. Staff-snake, the Size arrow, and the check stay `<i class="fa-solid">` (`fa-staff-snake`, `fa-arrow-right-long`, `fa-check`). Kit `db12ee03d1` is method `js` (`app/index.html`) with `autoReplaceSvg: 'nest'`: the svg is inserted inside the `<i>`, and that `<i>` stays the node React removes. Unchecking a Gear flag or v2 Anointed must not throw `removeChild`. The 12px head size and the check’s absolute placement stay on the `<i>` and also match a direct-child replacement svg for `.fa-staff-snake` and `.fa-check` only. The arrow gets no extra size. Do not set width or height on a Gear `svg` except by those two class selectors. Do not give the other three an img or an inlined path. Do not add `person-meditating` to the kit. Do not substitute `person-praying`. Header icons replace the blank’s bandage / heart emoji.
- Coinage: `cc` / `sc` / `gc` / `pc` amounts (`number`, empty → `0`). Play-time. Size is not an input and does not POST. Each Size cell is `<p class="character-value">` so `Kalam` beats the `p` face. The text is that row’s count divided by 100, printed like the chrome `1s`: no space, lowercase `s`, no trailing `.0`, at most two decimal places (one coin is `0.01s`). Integer arithmetic: `0` → `0s`, `1` → `0.01s`, `10` → `0.1s`, `99` → `0.99s`, `100` → `1s`, `150` → `1.5s`, `250` → `2.5s`. A negative count keeps the minus. Empty is `0`. The stored `copperSize` `silverSize` `goldSize` `platinumSize` columns stay and are not rewritten. The header and each coin row share one grid: denomination `22px`, count `28%`, size `28%`, note `minmax(0, 1fr)`. **Coinage** is an `h2` spanning the denomination and count columns (`#bdbdbd`, `oldClaude`). **Size** and `100 coins = 1s` are `h2.minor-heading`: `oldClaude`, 10px, aligned to the bottom of that bar, each as wide as the cell under it. Do not use the dark Characteristics `h1`. The `x100 cc` / `x100 sc` / `x100 gc` notes stay on the rows. Coin rows stripe `#fff` / `#f3f3f3`. The header is the first child, so **cc** (the even child) is `#f3f3f3`. The count input stays transparent at rest so the stripe shows. Leave the view-edit teal.
- Notes: one `text` string (`notes`). Favor `divineRelationship` box: `min-height: calc(2 * 17.38px)`, `height: calc(6 * 17.38px)`. That height is the max. Clip. Do not scroll. Do not grow (`textarea-limits.md`). Cap 1350. Column stays `text`. Textarea in edit, always-visible textarea on the view (play-time). Not one string per printed Notes line. Paint the Contacts zebra (17.38px, `#fff` / `#f3f3f3`, `background-attachment: local`). Do not set the band to `1lh`. Plain-view rest is the unwashed zebra. Hover, in view and in edit and in quick-edit, stacks `rgba(145, 181, 194, 0.35)` on the zebra. In `.view-edit` and `.view-quick-edit`, the rest wash is `rgba(173, 216, 230, 0.35)` on the zebra, same as Contacts. Beat `index.css` solid textarea fills. Stripes stay visible. The footnote is not under Notes.
- Do not compute encumbrance. Carry bands are written slots, not v1 S/M/L totals. Coin Size is the printed ratio only. It does not write a Carry slot.
- Relationships list: real rows only; leftover pads to cap 18; insert on blur if any stored field is non-empty; `makeTempID` for React keys; clearing stored fields removes the row. New rows `id` 0 or omitted until the insert POST returns an `id`. The insert row shows on the view and in Edit while `length < 18`.
- Edit: Contacts stays the textarea. Relationship name, **R**, and **P** stay inputs in both modes. Chrome stays text. While editing, blur does not POST.
- Persist every type-3 field on the full Save payload. Schema: `ensureSchema` + `backupTables/page3.sql` in the same change (`schema-on-boot.md`). Tables keyed by `pageID`:
  - `v2Page3Basics` — unique `pageID`; `contacts text` default `''`; `notes text`; `copper` `silver` `gold` `platinum` integer default 0; `copperSize` `silverSize` `goldSize` `platinumSize` varchar default `''`
  - `v2Page3Relationships` — `pageID`, `value` varchar(500), `r` integer, `p` integer, `index`
  - `v2Page3Gear` — `pageID`, `slot` varchar, `item` varchar(500), `size` varchar(50), `staffSnake` boolean default false, `meditating` boolean default false, `w` integer, unique `(pageID, slot)`
- Create-character: insert type 1 at index 0, type 2 at index 1, type 3 at index 2. Existing characters stay without type 3 until the owner clicks **+ NPCs & Equipment** (`add-page-type-1.md`).
- Catalog identity stays the first page-type-1. Type 3 has no catalog name.
- Existing `v2Page3Contacts` rows: non-empty `value`s joined with newlines in `index`, `id` order into `contacts` where that column is null or `''`, including a basics row when contact rows exist and basics does not. Then drop `v2Page3Contacts`. Do not recreate it. Do not overwrite a non-empty `contacts` string.
- Play-time on this type (`quick-view-inputs.md`): Contacts string; relationship name, **R**, and **P**; every Gear item, size except the printed-S slots and the arrow rows above, flag, and W, except the seven bar headers above; coinage amounts (not the calculated Size); Notes. Field-POST attributes ship in the same change as the controls. Flag click is the commit (no blur). Unknown attribute → refuse. `'page3Contacts'` is the string column, not a row array. Name, **R**, and **P** are one cell each. Insert and delete are their own attributes.
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
- Editable worn labels. Editable printed **S** (stored default stays; the cell is text).
- One coinage Size for the whole block (Q11: per denomination).

Revised 2026-10-28 (meditating head; add the icon to the kit):
- “Both header icons come from the existing kit” — **retained**. The subset CSS defines `.fa-staff-snake` and does not define `.fa-person-meditating`, so the head is empty. Classic solid `person-meditating` is added to kit `db12ee03d1`.
- Rename the head to `person-praying` — **rejected**.
- An inline SVG or a second icon font — **rejected**.

Revised 2026-10-28 (Show Quick Edit; stripes stay visible):
- “Location highlight is the existing `.view-quick-edit textarea` rule” — **revised**: that solid fill does not paint this box. While `view-quick-edit` is on, the textarea uses the `.view-edit` wash (`rgba(173, 216, 230, 0.35)` at rest, `rgba(145, 181, 194, 0.35)` on hover) stacked on the zebra.
- Solid quick-edit teal on this textarea — **rejected**. The stripes stay visible.
- Edit wash, zebra pitch, and the toggle on `page-shell` — **retained**.

Revised 2026-10-28 (R-column rules; no gaps in the gray borders):
- `padding: 2px 1px` on the row span — **revised**: that padding is on the cell, inside the 17.38px border-box. The span has no vertical padding, so the **R** cell’s borders are the full row.
- Gray rule on the name, on **P**, or through the header — **rejected**. Both strokes stay `border-left` and `border-right` on the **R** cell.
- Row border-box 17.38px, text `15px` / `1.2`, header bar `calc(16px + 8px)`, 15px above Gear — **retained**.

Revised 2026-10-28 (quick edit; Design answers: Contacts yes; **R** and **P**; view insert “Correct”):
- Contacts is edit-session, view `p` — **revised**: the `textarea` stays mounted. Blur POSTs `'page3Contacts'` as a string. Edit stays local until Save.
- `'page3Contacts'` field POST rejected — **revised**: restored as that string column update. The row-array replace-all stays rejected. Do not recreate `v2Page3Contacts`.
- **R** is edit-session only — **revised**: play-time, same cell POST shape as **P** (`'page3RelationshipR'`, `id > 0`).
- **P** is play-time — **retained**.
- Relationship name is edit-gated — **revised**: play-time (`'page3RelationshipValue'`). The designer added the name after **R** and **P**.
- View insert and clear-to-remove — **revised**: both run on the view. Insert returns `id` and merges it onto the live row and the snapshot. Delete POSTs when the row unmounts.

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

Revised 2026-10-30 (Gear columns, SVG head, printed S, Notes hover):
- “Both header icons come from the existing kit” / add `person-meditating` to kit `db12ee03d1` (T-120) — **revised**: the meditating head is the Gear full SVG via `<img>`. Staff-snake stays the kit icon. T-120 is not executed.
- An inline SVG or a second icon font — **retained** rejected. The asset is referenced, not inlined.
- Rename the head to `person-praying` — **retained** rejected.
- Display-only **S** (Q9: stored default) — **revised**: the stored default `'S'` stays. The printed-S cell is text, not an input.
- Editable worn labels — **retained** rejected.
- Every Gear size is play-time — **revised** for `leftS1`–`leftS15`, `midS1`–`midS6`, `carryM4`–`carryP5` only. Arrow-row sizes and coinage Size stay inputs.
- `->` is chrome with no column — **revised**: it sits in the Size cell on the existing arrow rows. The size input stays on those rows.
- Contacts hover teal only under `.view-edit` and `.view-quick-edit` — **revised**: plain view also hovers `rgba(145, 181, 194, 0.35)` over the zebra. Edit and quick-edit washes stay.
- Gear Notes have no zebra — **revised**: same zebra and the same hover and edit washes as Contacts. Notes box height unchanged.
- Move **Quarter Mastering** so `qm1` shares a line with Head — **rejected**. The bar stays under that column’s head.

Revised 2026-10-30 (only the meditating head is an asset):
- Meditating head is the Gear SVG `<img>` — **retained**.
- Staff-snake, `fa-arrow-right-from-line`, and `fa-check` stay kit icons — **retained**. Their tags stay `<i class="fa-solid">`. Replacing any of them with an img or an inlined svg — **rejected**.
- Size and placement written only on `i` — **revised**: kit method `js` replaces those tags with `svg.svg-inline--fa`, so the existing 12px head size and the check placement also match `.fa-staff-snake` and `.fa-check` on that svg. The arrow has no new size. A Gear-wide `svg` width or height — **rejected**.

Revised 2026-10-30 (unchecking a check must not throw):
- Kit replaces the `<i>` outright — **revised**: `autoReplaceSvg` is `nest`. The svg sits inside the `<i>` React created. Gear flags and v2 Anointed keep rendering `fa-solid fa-check` only while checked.
- Hide the check instead of nesting, as the first fix — **rejected**. Nest is what lets that existing unmount succeed. Keeping the `<i>` mounted is the fallback only if nest still throws (T-124).
- Add `.checked` to Anointed — **rejected**. The mark is the icon’s presence. The black fill rule stays as it is.
- A separate restyle of v1 check/x swaps or sidebar icon swaps — **rejected**. They unmount a kit `<i>` the same way; nest covers that unmount.

Revised 2026-10-30 (Gear bar headers are labels):
- Type (Item) is the writable remainder on **Backpack**, **Pouch**, and **held bag** — **revised** for `backpack`, `pouch1`, `pouch2`, `pouch3`, `heldBag1`, `heldBag2`, and `other1`. Those rows draw the printed label only.
- Both flag boxes on every gear row — **revised**: not on those seven bars.
- Draw a stored bar-slot item as text — **rejected**.
- Delete the slot keys or clear stored values — **rejected**.
- **Head** through **R. Hand**, the Carry strength lines, and the QM numbers lose their fields — **rejected**.

Revised 2026-10-30 (arrow rows have no Size input):
- The size input stays on arrow rows — **revised**. `head` through `rHand`, `other2`, and `other3` draw the arrow only.
- Draw a stored arrow-row size as text — **rejected**.
- Clear stored sizes or drop the size column — **rejected**.
- Narrow the Size track because the input is gone — **revised**: the designer set the one Size width to 30px.

Revised 2026-10-30 (four Gear tracks):
- Cells sit on the top edge — **revised** for Size, snake, meditating, and **W**. Those four center on both axes. Type (Item) stays on the top edge.
- Size track 64px — **revised**: 30px. Snake and meditating stay 18px. **W** stays 28px.
- Flag box top-aligned, and the 12×12 box has no border — **retained** for the box. The box is centered in the track. `border-left: 1px solid #bdbdbd` is the track edge, not a border on the box.
- The four rules run through bar headers and section `h2`s — **rejected**. They stop at those headers.
- Tiny & Other is `tiny1`–`tiny10` — **revised**: `tiny11` and `tiny12` follow `tiny10`. Same row as `tiny1`: item, size input, both flags, **W**. Not a printed **S**, not an arrow, not a bar. No migration. Assemble already fills a missing slot. Save and field POST upsert the row.

Revised 2026-10-30 (Gear rows match the sheet band):
- A Gear row’s height is `min-height: 17.38px` plus `padding: 2px 1px` plus an input `height: 17.38px` — **revised**: the column head and each data row are a 17.38px border-box. Padding stays inside. Inputs fill the cell.
- The column head grows to hold the 18×18 image — **revised**: the head is 17.38px. The image paints outside. The designer said painting outside is fine.
- Cap every column track with `grid-auto-rows: 17.38px` — **rejected**. Notes, coinage, and the section `h2`s share that grid.
- `overflow: hidden` on the row — **rejected**. It would clip the check.
- Shrink the meditating image — **rejected**. It stays 18×18.

Revised 2026-10-30 (printed Gear labels, designer commit on this branch):
- Worn labels `gloves`, `pants`, `shoes` stay lowercase — **revised**: Gloves, Pants, Shoes.
- The bar label **held bag** stays lowercase — **revised**: Held Bag. Slot keys stay `gloves`, `pants`, `shoes`, `heldBag1`, `heldBag2`.

Revised 2026-10-30 (Held Bags, Carry, Quarter Mastering):
- Held Bags at the top of the middle column — **revised**: both bars and `midS1`–`midS6` render at the bottom of the first column, after `leftS15`. Keys stay. Bars stay labels. The six rows stay printed **S**.
- Carry prints **−4 Str** … **5 Str** — **revised**: no strength label. The ten keys stay, still printed **S**.
- Replace the eight moved rows with eight Carry rows — **revised**: also add one Other Containers row, so Carry grows by 7, from 10 to 17. New keys `carry11`–`carry17`, printed **S**.
- The new Other Containers row’s fields were not named — ordered as an arrow row, `other4`, like `other2` and `other3`.
- Quarter Mastering is `qm1`–`qm10` — **revised**: `qm11`–`qm15` follow `qm10`, numbered **11**–**15**. Same row as `qm1`. Not printed **S**. Not a bar.
- Rename a moved slot so the key matches its column — **rejected**. The column is not stored.
- A migration for the new slots — **rejected**. Assemble fills a missing slot. Create, Save, and field POST follow `PAGE3_GEAR_SLOTS`.

Revised 2026-10-30 (designer commit on this branch, updating icon):
- Size arrow class `fa-arrow-right-from-line` — **revised**: `fa-arrow-right-long`. It stays a kit `<i class="fa-solid">` in the Size cell. The arrow tooltip reads “This item's weight is recorded somewhere else (if applicable).”

Revised 2026-10-30 (Gear columns):
- Do not move **Carry**, **Quarter Mastering**, or **Tiny & Other** into another column — **revised**. **Carry** follows R. Hand in the first column. **Quarter Mastering** and **Tiny & Other** are the second column, under that head, and **Notes** follows them.
- **Notes** stays in the second column — **retained**. The footnote stays with **Notes**.
- **Other Containers** at the top of the second column — **revised**: bottom of the third column, after Coinage.
- Held Bags at the bottom of the first column — **revised**: Backpack, the Pouches, and the Held Bags, with `leftS1`–`leftS15` and `midS1`–`midS6`, render in the third column under that head. Coinage follows `midS6`. **Other Containers** follows Coinage.
- **Carry** follows **Other Containers** in the middle column — **revised**: **Carry** follows R. Hand in the first column.
- Rename a slot so the key matches its column — **rejected**. `PAGE3_GEAR_SLOTS` order stays.
- Filler rows to even the columns — **rejected**.

Revised 2026-10-30 (`textarea-limits.md`):
- Contacts “no cap” and overflow-past-18 recorded — **revised**: cap 1350. The drawn box clips and does not scroll. Column stays `text`. The old per-row `varchar(500)` stays rejected. Do not retune ledger 18 vs live `calc(20 * 17.38px)`.
- Notes wrap-and-grow — **revised**: `height: calc(6 * 17.38px)` clips and does not scroll. Cap 1350. Column stays `text`.

Revised 2026-10-30 (Notes and Coinage):
- **Notes** stays in the second column — **revised**: the **Notes** heading, the textarea, and the footnote follow Carry in the first column.
- Coinage follows `midS6`, and **Other Containers** follows Coinage — **revised**: Coinage follows Tiny & Other in the second column. **Other Containers** follows `midS6`.
- Notes height `calc(5 * 17.38px)`, and the Coinage fields — **revised**: Notes height is `calc(6 * 17.38px)`. Coinage Size is calculated text and does not POST. The amount inputs stay.

Revised 2026-10-30 (Carry, Tiny, Notes, footnote, Coinage):
- The footnote stays with Notes — **revised**: it renders after `other4` in the third column.
- Carry stays 17 rows and Tiny & Other stays 12 — **revised**: `carry18` and `tiny13`.
- Coinage header is an `h2`, a `strong`, and an `em` — **revised**: one shared grid with the rows, **Coinage** an `h2`, **Size** and `100 coins = 1s` minor headings.

Revised 2026-10-30 (Quarter Mastering Size is printed S; designer answer: set all to S and show S):
- “Not printed **S**” on `qm1`–`qm15` (T-130) — **revised**: those slots are printed **S**, the same text cell as Carry.
- Printed **S** renders the stored size, which may differ from `S` — **retained** for every printed-S slot except `qm1`–`qm15`. Those fifteen store and return `'S'`.
- “A migration for the new slots — rejected” (T-130) — **retained** for new slot keys. **Revised** for sizes already stored on `qm1`–`qm15`: an idempotent boot `UPDATE` in `ensureSchema.ts`. `page3.sql` stays the table snapshot.
- Coercing Carry, the container **S** rows, Tiny & Other, or an arrow-row size — **rejected**.
- A `readonly` or `disabled` size input — **retained** rejected.
- A hardcoded `S` in the Gear JSX — **rejected**. The cell stays the printed-S text of `cell.size`.

Touches: `app/src/pages/v2/pageTypes/pageType3/`; `backend/common/interfaces/v2/page3/`; `backend/server/v2/{view,edit,add,delete}/`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page3.sql`; ledger front panels
TODOs: T-100–T-112 (done); contacts text box: T-113 (done); row alignment and 15px above Gear: T-114 (done); Contacts play-time: T-115 (done); relationship name and **R**: T-116 (done); view insert and clear: T-117 (done); **R** column rules: T-118 (done); Contacts quick-edit wash: T-119 (done); meditating icon in the kit subset: T-120 (superseded, not executed); Gear tracks, SVG, arrow, printed S: T-121 (done); Notes zebra and hover: T-122 (done); kit icons beside the meditating img: T-123 (done); uncheck must not throw: T-124 (done); Gear bar headers are labels: T-125 (done); arrow rows have no Size input: T-126 (done); Gear track width, centering, and rules: T-127 (done); two Tiny & Other rows: T-128 (done); Gear row height: T-129 (done); Held Bags, Carry, and Quarter Mastering: T-130 (done); Gear columns: T-131 (done); Notes and Coinage: T-132 (done); Carry, Tiny, Notes, footnote, Coinage size: T-133 (done); Quarter Mastering Size is printed S: T-140 (done)
