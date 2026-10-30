# TODOs

status: active   date: 2026-09-30

Order writes `proposed`. Execute approval is the designer naming TODOs, not the session’s overall goal (canonical: `AGENTS.md`). Keep finished entries in Done and prune old ones so the active list stays short.

## Active

### T-124: Nest kit icons so unchecking a check does not throw
status: proposed
source: rewrite-ledger/page3-view.md, 2026-10-30
why: Kit `db12ee03d1` replaces `<i class="fa-solid">` with `<svg class="svg-inline--fa">`. `GearFlag` and v2 Anointed render `fa-check` only while checked. Uncheck asks React to `removeChild` that `<i>`, which is no longer in the tree, and the router error page replaces the sheet.
scope: `app/index.html` (kit script). Owners of the checks: `rewrite-ledger/page3-view.md` (`GearFlag` in `app/src/pages/v2/pageTypes/pageType3/components/Gear/Gear.tsx`, placement in `Gear.css`) and `rewrite-ledger/edit-character.md` (Anointed in `app/src/pages/v2/pageTypes/pageType1/components/Favor/Favor.tsx`, placement in `Favor.css`). Do not add an icon package. Do not add `features/` or `shared/`. Do not edit kit `db12ee03d1` on fontawesome.com.
steps:
1. In `app/index.html`, before `https://kit.fontawesome.com/db12ee03d1.js`, set `window.FontAwesomeConfig = { autoReplaceSvg: 'nest' }` in a classic script (not `type="module"`). Leave the kit URL. Do not add `async` or `defer`.
2. Leave both conditionals: Gear `{checked && <i className="fa-solid fa-check">}` and Anointed `{anointed && <i className="fa-solid fa-check">}`. Do not add `checked` to Anointed’s class. Do not change Gear click-persist or Anointed’s edit-only click. Staff-snake, the arrow, and the meditating `<img>` stay as they are.
3. Leave the Gear rules that size `.page3-gear-head > strong i` and `.page3-gear-head > strong > svg.svg-inline--fa.fa-staff-snake`, and that place `.page3-flag-box i` and `.page3-flag-box > svg.svg-inline--fa.fa-check`. Leave `.favor-v2 .anointed-box i` (`font-size: 20px`, `position: absolute`, `top: -4px`). Do not add `left`. Do not add a selector that is only `svg` or only `.svg-inline--fa`. Do not set width or height on those svgs.
4. If headless Chrome shows the kit still replaces the `<i>` (no `<i>` left, svg is the child) or `parent.removeChild` on that `<i>` throws: nest did not fix it. Then always render the check `<i>` in `GearFlag` and in Anointed. Hide it unless the box is on. Gear hides with the existing `.checked` class. Anointed hides with a class that is not `checked`, so the black fill stays unused. `visibility: hidden` on both the `i` and `> svg.svg-inline--fa.fa-check`. Say so in the result.
done when: `app/index.html` sets `autoReplaceSvg` to `nest` before the kit script. `rg "fa-person-meditating" app/src/pages/v2/pageTypes/pageType3` is 0. `Gear.tsx` and `Favor.tsx` still contain `fa-solid fa-check`. Anointed’s class string does not contain `checked` unless step 4 ran and the result says so. `Gear.css` has no width or height on a selector that is only `svg` or only `.svg-inline--fa`. `npm run build` in `app/` exits 0. Headless Chrome with that config and kit `db12ee03d1`: a `fa-check` `<i>` remains an `i` with an svg inside; removing it does not throw; the Gear check’s positioned node is font-size 20px, position absolute, top -4px; the staff-snake `<i>` is font-size 12px; the meditating img is 18×18.
depends on: T-123 (done)
open questions: none
deviations from design: The design’s first proposal was to keep the check mounted and hide it, and to leave the kit replacing the `<i>`. The designer said to use whatever fixes the error, and to include Anointed. Nest lets the existing unmount succeed on both checkboxes. Step 4 is the keep-mounted fallback only if nest still throws.
result:

## Done

### T-123: Keep staff-snake, the arrow, and the check as kit icons
status: done
source: rewrite-ledger/page3-view.md, 2026-10-30
why: The meditating head is an `<img>` of the Gear SVG. Staff-snake, the Size arrow, and the check are still `<i class="fa-solid">`. Kit `db12ee03d1` has `"method":"js"` and loads `pro.min.js`, so those `<i>` tags are replaced with `<svg class="svg-inline--fa">`. Gear.css sizes the head with `strong i` and places the check with `.page3-flag-box i`. Those selectors do not match the replacement, so the three kit icons lose the box the img still has.
scope: `app/src/pages/v2/pageTypes/pageType3/components/Gear/Gear.css`. Owner: `rewrite-ledger/page3-view.md`. Do not edit `Gear.tsx` icon tags, `app/index.html`, `Favor.css`, or `index.css`. Do not add an img or an inlined svg for staff-snake, the arrow, or the check.
steps:
1. Leave `Gear.tsx` as it is: one `<img>` whose src is `person-meditating-solid-full.svg`; `<i class="fa-solid fa-staff-snake">`; `<i class="fa-solid fa-arrow-right-from-line">`; `<i class="fa-solid fa-check">`.
2. Make `.page3-gear-head > strong i { font-size: 12px }` also match `.page3-gear-head > strong > svg.svg-inline--fa.fa-staff-snake`. Same `font-size: 12px` only. Do not set width or height on that svg. Do not let this rule match the meditating img.
3. Make `.page3-flag-box i` (`font-size: 20px`, `position: absolute`, `top: -4px`, `left: -4px`) also match `.page3-flag-box > svg.svg-inline--fa.fa-check` with those same four declarations.
4. Do not add a size rule for the arrow. Do not add a selector that is only `svg` or only `.svg-inline--fa`. The meditating rule stays on `img`, 18×18. Do not change the five-track grid, printed S, arrow placement, or Notes zebra.
done when: `Gear.tsx` still has one `img` and still has `fa-staff-snake`, `fa-arrow-right-from-line`, and `fa-check`. `rg "fa-person-meditating" app/src/pages/v2/pageTypes/pageType3` is 0. `Gear.css` has `svg.svg-inline--fa.fa-staff-snake` and `svg.svg-inline--fa.fa-check`. `Gear.css` has no width or height on a selector that is only `svg` or only `.svg-inline--fa`. `npm run build` in `app/` exits 0.
depends on: T-121 (done)
open questions: none
deviations from design: none
result: Gear.css also matches the kit’s `svg.svg-inline--fa` for staff-snake (font-size 12px) and the check (font-size 20px, absolute, top -4px, left -4px). Gear.tsx tags are unchanged; the meditating head stays the 18×18 img. Headless Chrome with kit `db12ee03d1`: those three icons become svg; the arrow inherits 12px from `.page3-gear-chrome` and has no new size rule.

### T-121: Align Gear tracks, use the meditating SVG, and lock printed S
status: done
source: rewrite-ledger/page3-view.md, 2026-10-30
why: The three Gear stacks and the five cells in each row do not share a top edge. The two flag boxes are 12px flex items with `margin: 2px auto`, and the header icon tracks are 18px, so the boxes read as one checkbox column. The meditating head is `fa-person-meditating`, which the kit subset does not define. The arrow is inside the item cell. Printed S is a size input.
scope: `app/src/pages/v2/pageTypes/pageType3/components/Gear/Gear.tsx` (`ColumnHead`, `GearRow`, `LEFT_ROWS`, `MIDDLE_ROWS`); `app/src/pages/v2/pageTypes/pageType3/components/Gear/Gear.css`; existing `app/src/pages/v2/pageTypes/pageType3/components/Gear/assets/person-meditating-solid-full.svg`. Owner: `rewrite-ledger/page3-view.md`. Do not edit kit `db12ee03d1`, `app/index.html`, coinage inputs, slot order, or Notes height.
steps:
1. Set `.page3-gear-columns` to `align-items: start`. Each column’s first child stays `ColumnHead`. Leave **Quarter Mastering** after that head and before `qm1`. Do not move **Carry**, **Tiny & Other**, or **Notes**. Set `margin: 0` on the gear section `h2`.
2. Give each gear column one grid whose head and rows share five tracks: flexible Type (Item), Size, snake, meditating, **W**. `align-items: start` on those rows. Section `h2`, Notes, the footnote, and coinage span all five tracks. Snake and meditating tracks are equal. Each `GearFlag` is the only control in its track, top-aligned, centered across the track. Remove `margin: 2px auto` from `.page3-flag-box`. Keep the 12×12 borderless box, both flags on every row, and the existing click persist.
3. Replace the meditating `<i class="fa-solid fa-person-meditating">` with `<img alt="" src>` of `person-meditating-solid-full.svg`, filling that header track. Keep `fa-solid fa-staff-snake` centered in the snake track. Do not inline the SVG path. Do not add a second copy of the file.
4. On rows with `arrow: true` (`head` through `rHand`, `other2`, `other3`), render `fa-solid fa-arrow-right-from-line` inside the Size cell, not inside `.page3-gear-item`. Keep the size `<input>` in that cell after the arrow. One Size track width for the column, wide enough that the arrow is not clipped.
5. For `leftS1`–`leftS15`, `midS1`–`midS6`, and `carryM4`–`carryP5`, render `cell.size` as text. No `<input>`, no `readOnly`, no `disabled`, no `character-value`. Do not POST size from those cells. Leave the stored default `'S'`. Every other gear size input, and all four coinage Size inputs, stay.
done when: `rg "fa-person-meditating" app/src/pages/v2/pageTypes/pageType3` is 0 hits. `rg "person-meditating-solid-full" app/src/pages/v2/pageTypes/pageType3/components/Gear/Gear.tsx` is at least 1. `rg "2px auto" app/src/pages/v2/pageTypes/pageType3/components/Gear/Gear.css` is 0. `rg "readOnly|disabled" app/src/pages/v2/pageTypes/pageType3/components/Gear/Gear.tsx` is 0. In `Gear.tsx` the `fa-arrow-right-from-line` element is not inside `page3-gear-item`. `npm run build` in `app/` exits 0.
depends on: none
open questions: none
deviations from design: none
result: Each gear column is a five-track grid and the three stacks use `align-items: start`. Snake and meditating are separate 18px tracks with 12px boxes. The meditating head is the Gear SVG. The arrow is in the Size cell. Printed-S slots render `cell.size` as text through `isDefaultSSlot`.

### T-122: Stripe Gear Notes and teal-hover Contacts and Notes
status: done
source: rewrite-ledger/page3-view.md, 2026-10-30
why: Gear Notes are a flat textarea. Contacts stripes do not turn teal on hover in plain view, because the zebra rule beats `index.css` `textarea:hover`. Edit and quick-edit solid fills would hide a new zebra.
scope: `app/src/pages/v2/pageTypes/pageType3/components/Gear/Gear.css` (`.page3-notes`); `app/src/pages/v2/pageTypes/pageType3/components/Contacts/Contacts.css` (the textarea). Owner: `rewrite-ledger/page3-view.md`. Do not change Contacts min-height, Gear Notes height, or `app/src/index.css`.
steps:
1. Paint `.page3-notes` with the Contacts zebra: `#fff` / `#f3f3f3`, 17.38px bands, `background-attachment: local`. Text stays 15px / line-height 1.2. Do not set the band to `1lh`. Do not change `min-height` or `height` on `.page3-notes`.
2. Plain view, both `.page3-contacts > textarea` and `.page3-notes`: rest is the unwashed zebra; `:hover` stacks `rgba(145, 181, 194, 0.35)` on the zebra.
3. `.view-edit` and `.view-quick-edit`, both textareas: rest wash `rgba(173, 216, 230, 0.35)` and hover `rgba(145, 181, 194, 0.35)`, each stacked on the zebra. These rules beat `index.css` solid `textarea:hover`, `.view-edit textarea`, and `.view-quick-edit textarea`. Stripes stay visible.
done when: `rg "repeating-linear-gradient" app/src/pages/v2/pageTypes/pageType3/components/Gear/Gear.css` matches `.page3-notes`. `Contacts.css` has a `:hover` wash that applies when `.view-edit` and `.view-quick-edit` are absent. `rg "1lh" app/src/pages/v2/pageTypes/pageType3` is 0. The Contacts `min-height` value is unchanged. `npm run build` in `app/` exits 0.
depends on: T-121
open questions: none
deviations from design: none
result: Gear Notes use the Contacts 17.38px zebra. Plain-view hover on Contacts and Notes stacks `rgba(145, 181, 194, 0.35)` on that zebra. Edit and quick-edit rest and hover washes stack on it. Contacts min-height and Notes height are unchanged.

### T-120: Add person-meditating to the Font Awesome kit subset
status: done
source: rewrite-ledger/page3-view.md, 2026-10-28 (Design answer: Add)
why: The Gear meditating head is `fa-person-meditating`. Kit `db12ee03d1` loads a By Icon subset that defines `.fa-staff-snake` and does not define `.fa-person-meditating`.
scope: Font Awesome kit `db12ee03d1`, referenced by `app/index.html`. Owner of the icon name: `rewrite-ledger/page3-view.md`.
steps:
1. Add classic solid `person-meditating` to the kit’s By Icon subset and publish the kit.
2. Leave `Gear.tsx` `ColumnHead` on `fa-solid fa-person-meditating`.
done when: not executed.
depends on: T-108 (done)
open questions: none
deviations from design: superseded 2026-10-30 before execution. The meditating head is the Gear SVG (T-121).
result: Not executed. `page3-view.md` revised 2026-10-30: the head is `Gear/assets/person-meditating-solid-full.svg`. The kit was not changed.

### T-119: Wash the Contacts textarea when quick-edit locations are shown
status: done
source: rewrite-ledger/page3-view.md, 2026-10-28 (Design answer: the stripes should still be visible)
why: Show Quick Edit puts `view-quick-edit` on `page-shell`. `index.css` paints `.view-quick-edit textarea` solid teal, and `.v2 .page3-contacts > textarea` paints the zebra with `!important` at higher specificity, so the Contacts box stays unhighlighted.
scope: `app/src/pages/v2/pageTypes/pageType3/components/Contacts/Contacts.css` only. Owner: `rewrite-ledger/page3-view.md`. Do not change `index.css`, `NotesPanes.css`, `Contacts.tsx`, `V2View.tsx`, or relationship styles. Do not change min-height, zebra pitch, or the text line. Do not add a wrapper. Do not put `view-edit` on the view.
steps:
1. Copy the existing `.v2 .view-edit .page3-contacts > textarea` rest rule and its `:hover` rule, with `.view-quick-edit` in place of `.view-edit`. Rest wash `rgba(173, 216, 230, 0.35)` stacked on the same `repeating-linear-gradient` zebra (`#fff` / `#f3f3f3` at 17.38px). Hover wash `rgba(145, 181, 194, 0.35)` on that zebra. `background-color: transparent`, `background-attachment: local`, and the same `!important` as the edit rules.
2. Leave the toggle-off zebra (`.v2 .page3-contacts > textarea` with no teal layer) and the `.view-edit` rules in place.
done when: `Contacts.css` has `.v2 .view-quick-edit .page3-contacts > textarea` containing `rgba(173, 216, 230, 0.35)` and `repeating-linear-gradient`, and a `:hover` rule containing `rgba(145, 181, 194, 0.35)`. `.v2 .view-edit .page3-contacts > textarea` is still present. The toggle-off `.v2 .page3-contacts > textarea` rule has no `173, 216, 230`. `git diff` is empty for `index.css`, `NotesPanes.css`, `Contacts.tsx`, and `V2View.tsx`.
depends on: T-115 (done)
open questions: none
deviations from design: none
result: The Edit wash is copied onto `.v2 .view-quick-edit .page3-contacts > textarea` and its hover. Headless Chrome: toggle off is zebra only. With `view-quick-edit`, the background is the 0.35 teal gradient plus the zebra. Pixels: white band 226,241,246 and gray band 219,234,239.

### T-118: Run the R-column gray rules the full row
status: done
source: rewrite-ledger/page3-view.md, 2026-10-28 (Design: no gaps in the gray borders for the R column)
why: The **R** cell paints `border-left` and `border-right` `1px solid #bdbdbd`, and that cell is `height: 100%` of a span with `padding: 2px 1px`. The rules stop at the padding, so each row shows a white or `#f3f3f3` gap.
scope: `app/src/pages/v2/pageTypes/pageType3/components/Relationships/Relationships.css` only. Owner: `rewrite-ledger/page3-view.md`. Do not change `Relationships.tsx`, `Contacts.css`, `PageType3.css`, `pageType3Updates.ts`, Gear, `DoubleColumn.css`, `NotesPanes.css`, `View.css`, or `index.css`. Do not change `PAGE3_RELATIONSHIP_CAP`. Do not add a border on the name cell, the **P** cell, or the header. Do not set `line-height: 17.38px`. Do not add `features/`.
steps:
1. Remove padding from `.page3-relationships-list>span`. Keep that span at `box-sizing: border-box`, `height: 17.38px`, and `min-height: 17.38px`.
2. Put `padding: 2px 1px` on `.page3-relationships-list>span>*`. That rule already sets `box-sizing: border-box`, `height: 100%`, and `min-height: 0`. With the span’s padding gone, `height: 100%` is the 17.38px border-box, so the existing `border-left` and `border-right` on `.page3-relationships-list>span>*:nth-child(2)` run the full row (stored, insert, and leftover). Keep those two declarations. Do not add `border-left` on `:nth-child(3)`.
3. Keep the `input.character-value` restatement (`height: 100%`, `min-height: 0`) so `View.css` filled `height: 1.2em` and placeholder `height: 17.38px` cannot change the row. Keep `background-clip: content-box` on the edit inputs so the teal stays off the rule.
done when: `.page3-relationships-list>span>*:nth-child(2)` still sets `border-left: 1px solid #bdbdbd` and `border-right: 1px solid #bdbdbd`. `padding: 2px 1px` appears on `span>*` and not on a `span` rule. The list `span` still has `height: 17.38px` and `min-height: 17.38px`, and `span>*` still has `min-height: 0`. No `border` declaration on `:nth-child(3)` or on `.page3-relationships-headers`. `git diff` for `Contacts.css`, `PageType3.css`, `Relationships.tsx`, and `pageType3Updates.ts` is empty.
depends on: T-114 (done)
open questions: none
deviations from design: Both rules stay on the **R** cell (`border-left` and `border-right` on `:nth-child(2)`), which is what `d64787b` already paints. The design snippet put `border-left` on children 2 and 3; a left border on **P** next to **R**’s `border-right` would be 2px. `height: 100%` stays. It is the full row once the span has no padding, and it still beats `View.css` `height: 1.2em`.
result: Span padding is gone. `padding: 2px 1px` is on `span>*`. Headless Chrome: row and **R** cell are both 17.38px, edge delta 0. Both `#bdbdbd` rules are continuous through four view rows (including a leftover `p`) and two edit rows. **P** `border-left` is 0.

### T-115: Make Contacts a play-time textarea
status: done
source: rewrite-ledger/page3-view.md, 2026-10-28 (Design answer: Contacts yes)
why: Contacts is a view `p` until Edit, then a Save. The designer wants the textarea on the view, with blur saving the string. Edit stays local until Save.
scope: `backend/common/interfaces/v2/page1/viewPersist.ts`; `backend/server/v2/edit/editV2FieldController.ts`; new `backend/server/v2/edit/utilities/pageType3/savePage3Contacts.ts`; `backend/server/v2/edit/utilities/pageType1/utilities/saveViewField.ts` (the `Exclude` only); `app/src/pages/v2/hooks/characterHook.tsx`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`; `app/src/pages/v2/pageTypes/pageType3/components/Contacts/Contacts.tsx`. Do not change `Contacts.css` metrics (T-114). Do not import `NotesPanes`. Do not add `features/`. Do not recreate `v2Page3Contacts`. Do not persist while `isEditing`. Do not add `/quickEdit`.
steps:
1. Allowlist `'page3Contacts'`. Value is `string`. The controller writes it before `saveViewField` and adds the attribute to that function's `Exclude`. `savePage3Contacts` upserts `v2Page3Basics.contacts` only: `insert into v2Page3Basics (pageID, contacts) values ($1, $2) on conflict (pageID) do update set contacts = excluded.contacts`. Do not set `notes` in that statement. `String(value ?? '')`. Success `{ success: true }`. Unknown attribute still refuses.
2. `persistPage3Contacts` copies `persistPage3Notes`: skip when editing, when the viewer does not own the character, or when the snapshot string matches. Patch `revertedCharacter` with `updateContacts`. Do not replace live `character` from the response. Toast on failure. In-flight spinner stays the existing one.
3. `Contacts.tsx`: always the `textarea.character-value` (`placeholder=" "`, `value`, `onChange` → `updateContacts`, `onBlur` → `persistPage3Contacts`). Remove the view `p` and the `EditingContext` branch. Zebra, min-height, and the `.view-edit` wash stay in CSS. Location highlight is `index.css` `.view-quick-edit textarea`. Do not add a highlight rule.
done when: `./node_modules/.bin/tsc --noEmit -p backend/common` succeeds. `./node_modules/.bin/tsc --noEmit -p app` reports only the missing `frontend-config`. `Contacts.tsx` has no `<p` and no `EditingContext`. `savePage3Contacts` sets `contacts` and does not set `notes`. Grep `page3Contacts` in `viewPersist.ts` and `editV2FieldController.ts` is present. Grep `/quickEdit` under `pageType3/` is 0.
depends on: T-113 (done). Independent of T-114.
open questions: none
deviations from design: none
result: Contacts is always a `textarea`. Blur POSTs `'page3Contacts'`. `savePage3Contacts` upserts `contacts` only. Edit skips the POST.

### T-116: Make the relationship name and R play-time
status: done
source: rewrite-ledger/page3-view.md, 2026-10-28 (Design answers: **R** and **P**; then the name too)
why: **P** already blur-saves on the view. The name and **R** are inputs only while editing. The designer named all three.
scope: `backend/common/interfaces/v2/page1/viewPersist.ts`; `backend/server/v2/edit/editV2FieldController.ts`; new `backend/server/v2/edit/utilities/pageType3/savePage3RelationshipValue.ts`; new `savePage3RelationshipR.ts`; `saveViewField.ts` (`Exclude` only); `app/src/pages/v2/hooks/characterHook.tsx`; `getV2Updates.ts`; `UpdateInterfaces.ts`; `app/src/pages/v2/pageTypes/pageType3/components/Relationships/Relationships.tsx`. Do not change `Relationships.css` metrics (T-114). Do not change insert visibility (T-117). Do not add a delete attribute here. Do not persist while `isEditing`. Do not add `/quickEdit`. Do not add `features/`.
steps:
1. `'page3RelationshipValue'` is `{ id: number, value: string }`. Refuse unless `id > 0`, `value` is a string, and `value.length <= 500`. `update v2Page3Relationships set value = $1 where id = $2 and pageID = $3`. `'page3RelationshipR'` is `{ id: number, r: SkillNumber }`. Refuse unless `id > 0` and `r` is a SkillNumber. `update ... set r = $1` with `''` stored as null. Copy `savePage3RelationshipP`. Both return `{ success: true }`. Add both attributes to the `saveViewField` `Exclude`. Handle them in the controller before `saveViewField`.
2. `persistPage3RelationshipValue` and `persistPage3RelationshipR` copy `persistPage3RelationshipP`: skip when editing, when not owner, when the snapshot row is missing, or when that cell already matches. Patch that cell on the snapshot only. Do not replace live `character` from the response.
3. `Relationships.tsx`: the name and **R** are `input.character-value` on the view and in Edit (same mount as **P**). `onChange` stays `updateRelationship`. `onBlur` persists when `row.id` is set. **P**'s handlers stay. `showInsert` stays `isEditing && leftover > -1`.
done when: `./node_modules/.bin/tsc --noEmit -p backend/common` succeeds. App `tsc` reports only the missing `frontend-config`. The name input and the **R** input in `Relationships.tsx` are outside an `isEditing` ternary. `showInsert` still requires `isEditing`. Grep `page3RelationshipValue` and `page3RelationshipR` in the controller is present. Grep `/quickEdit` under `pageType3/` is 0.
depends on: T-113 (done). Independent of T-114 and T-115.
open questions: none
deviations from design: `showInsert` no longer reads `isEditing`. T-117 changed that in the same Execute.
result: Name and **R** are inputs on the view. Blur POSTs `'page3RelationshipValue'` and `'page3RelationshipR'` when `id > 0`. **P** is unchanged.

### T-117: Insert and clear a relationship on the view
status: done
source: rewrite-ledger/page3-view.md, 2026-10-28 (Design answer: view insert and clear-to-remove; name is a view input)
why: The insert row is edit-only, so the view cannot add a relationship. Clearing the last stored field removes the row locally, and the input unmounts before a blur POST. A new row's `id` is 0, so the next full Save would drop the persisted row and insert a duplicate.
scope: `viewPersist.ts`; `editV2FieldController.ts`; new `savePage3RelationshipInsert.ts`; new `savePage3RelationshipDelete.ts`; `saveViewField.ts` (`Exclude` only); `characterHook.tsx`; `getV2Updates.ts`; `UpdateInterfaces.ts`; `pageType3Updates.ts` only if a helper is required to set an `id` by `key`; `Relationships.tsx`. Do not replace the whole relationship list on a cell blur. Do not change row metrics (T-114). Do not persist while `isEditing`. Do not add `/quickEdit`. Do not add `features/`.
steps:
1. `'page3RelationshipInsert'` value is `{ value: string, r: SkillNumber, p: SkillNumber }`. Refuse when `value`, `r`, and `p` are all empty, when `value` is not a string or `value.length > 500`, or when `r` or `p` is not a SkillNumber. `insert into v2Page3Relationships (pageID, value, r, p, index) values (...) returning id`. `index` is the current row count for that `pageID`. `''` numbers store as null. Success `{ success: true, id }` with `id > 0`. No id → `{ success: false }`.
2. `'page3RelationshipDelete'` value is `{ id: number }`. Refuse unless `id > 0`. `delete from v2Page3Relationships where id = $1 and pageID = $2`. Success `{ success: true }`.
3. `persistPage3RelationshipInsert(pageID, row)` skips when editing, when not owner, or when `value`, `r`, and `p` are all empty. On success, set `id` on the live row with that client `key` and on the snapshot copy of that row. Keep `key`. Write the snapshot cell values from the posted payload. If the live row's `value` / `r` / `p` then differ, POST `'page3RelationshipValue'` / `'page3RelationshipR'` / `'page3RelationshipP'` for the cells that differ. If the live row with that `key` is already gone, POST `'page3RelationshipDelete'` for the returned `id`.
4. `persistPage3RelationshipDelete` skips when editing, when not owner, or when `id` is missing. On success, drop that `id` from the snapshot. Live state is already updated by `updateRelationship`.
5. `Relationships.tsx`: `showInsert` is `rows.length < 18` in both modes. `leftover` is `18 - length - (showInsert ? 1 : 0)`. The insert row's name, **R**, and **P** are inputs. Blur of any of them, when any stored field is non-empty, calls `insertRelationship` and `persistPage3RelationshipInsert`. When `updateRelationship` removes a row with `id > 0`, call `persistPage3RelationshipDelete` from that change, not from blur.
done when: `./node_modules/.bin/tsc --noEmit -p backend/common` succeeds. App `tsc` reports only the missing `frontend-config`. `Relationships.tsx` `showInsert` does not read `isEditing`. Insert SQL contains `returning id`. Delete SQL names `v2Page3Relationships`. Grep `/quickEdit` under `pageType3/` is 0.
depends on: T-116
open questions: none
deviations from design: none
result: The insert row shows while `length < 18`. Insert SQL `returning id` merges onto the live row and the snapshot. Clearing the last stored field POSTs `'page3RelationshipDelete'`.

### T-114: Align Contacts and Relationships to the Abilities row; 15px above Gear
status: done
source: rewrite-ledger/page3-view.md, 2026-10-28 (band matches band; text line matches text line; 15px above the Gear heading)
why: Contacts bands are 17.38px and the text line is already 15px / 1.2. Each Relationships row is that 17.38px content plus `padding: 2px 1px`, so the columns do not line up. The double column sits flush on the Gear heading.
scope: view/edit adjacency `app/src/pages/v2/pageTypes/pageType3/PageType3.css`; `app/src/pages/v2/pageTypes/pageType3/components/Contacts/Contacts.css`; `app/src/pages/v2/pageTypes/pageType3/components/Relationships/Relationships.css`. Do not change `DoubleColumn.css`, `NotesPanes.css`, `View.css`, `index.css`, Gear, stores, or JSX unless a selector cannot reach the row. Do not add `features/`. Do not set `line-height: 17.38px` on the Contacts pane or on relationship value text. Do not add `field-sizing`.
steps:
1. Relationships list row (`span`): `box-sizing: border-box`, `height` and `min-height` `17.38px`. Keep `padding: 2px 1px` inside that box so the painted row is 17.38px, not 17.38px plus padding. `p` and `input` in the row keep `font-size: 15px` and `line-height: 1.2`. Override `span > *` `min-height: 17.38px` and the `index.css` `p` `min-height: 17.38px` on these rows (`min-height: 0` is enough) so the child cannot grow the span. Do not edit `index.css`. Restate height on `input.character-value` so `View.css` filled `height: 1.2em` and placeholder `17.38px` cannot change the row. Same row border-box in view and in edit, including leftover and insert rows.
2. Contacts pane: keep the 17.38px zebra (white first) and `min-height: calc(18 * 17.38px)` on the mounted control. T-115 removes the view `p`; the zebra and min-height then apply to the `textarea`. Leave the text line at `font-size: 15px` and `line-height: 1.2`. Do not add a `line-height` that equals the band.
3. One shared border-box on `.page3-contacts > h1` and on `.page3-relationships-headers > h1`: `box-sizing: border-box`, `height` and `min-height` `calc(16px + 8px)` (`.v2 h1` content `min-height: 16px` plus its `padding: 4px` top and bottom; that padding stays and sits inside the box). `line-height: 16px` on those `h1`s. `.page3-relationships-headers` is that same height so the flex row does not add a second bar. Contacts keeps `font-size: 13px` and `white-space: nowrap` inside that bar. Row 1 of each column then starts on the same line, and 18 relationship rows cover the same vertical span as the Contacts pane.
4. `.page-type-three .double-column { margin-bottom: 15px; }`. That space is above the Gear `h1`. Do not set `gap` or `margin` on shared `DoubleColumn.css`. Do not change Gear row heights.
done when: `Relationships.css` sets the list `span` to `height: 17.38px` and `min-height: 17.38px`, and sets `span > *` `min-height: 0`. A page-type-3 stylesheet sets `.page3-contacts > h1` and `.page3-relationships-headers > h1` to `height: calc(16px + 8px)`. `Contacts.css` still has pitch `17.38px` and does not set `line-height: 17.38px`. `PageType3.css` sets `.page-type-three .double-column` `margin-bottom: 15px`. `DoubleColumn.css` has no `15px`. `NotesPanes.css` is unchanged (`git diff` empty for that file). No new store or attribute.
depends on: T-113 (done)
open questions: none
deviations from design: Header bar is `calc(16px + 8px)`, taken from `.v2 h1` `min-height: 16px` and `padding: 4px`. The designer named row alignment, not a new header pixel.
result: Relationship rows are a 17.38px border-box with padding inside. Header bars share `calc(16px + 8px)`. `.page-type-three .double-column` has `margin-bottom: 15px`.

### T-113: Replace the Contacts list with one Abilities-style text box
status: done
source: rewrite-ledger/page3-view.md, 2026-10-28 (follow Abilities; height 18 × 17.38; join existing rows)
why: Contacts, Allies, Mentors, & Enemies is an 18-row play-time list. The designer wants one Save-only text box, the same family as Abilities, as tall as the Relationships line count, with existing rows joined into that string.
scope: page-type-3 owner `rewrite-ledger/page3-view.md` (already revised). Store: `backend/common/interfaces/v2/pageTypes.ts` (`Page3.contacts`); `backend/common/interfaces/v2/page3/page3Interfaces.ts` (drop `Page3Contact`); `backend/common/interfaces/v2/page1/viewPersist.ts` (drop `'page3Contacts'` and `Page3Contact[]`). Boot: unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page3.sql`. View: `backend/server/v2/view/assembleV2Character/utilities/pageType3/assemblePageType3.ts`. Edit: `backend/server/v2/edit/utilities/pageType3/savePageType3.ts`; delete `savePage3Contacts.ts`; `backend/server/v2/edit/editV2FieldController.ts`; `backend/server/v2/edit/utilities/pageType1/utilities/saveViewField.ts` (drop `page3Contacts` from the `Exclude`). Delete: `backend/server/v2/delete/utilities/deletePagesUtilities/pageType3/deletePageType3.ts`. App: `app/src/pages/v2/hooks/updates/emptyPageType3.ts`; `pageType3Updates.ts`; `getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`; `app/src/pages/v2/hooks/characterHook.tsx`; `app/src/pages/v2/pageTypes/pageType3/components/Contacts/Contacts.tsx` and `Contacts.css`. Do not change Relationships, Gear, `addPageType3.ts` (basics INSERT lists `pageID` only; column default `''` covers it), gutter, page type 1, or page type 2. Do not import `NotesPanes`. Do not add `features/`. Do not add a field-POST attribute for this string.
steps:
1. `v2Page3Basics.contacts text` default `''`. In `ensureSchema`, `ADD COLUMN IF NOT EXISTS` after the basics table exists. If `v2page3contacts` exists: insert a basics row for any `pageID` that has contact rows and no basics row; `UPDATE` `contacts` from `string_agg(value, E'\n' ORDER BY index, id)` of rows where `value` is not null and `value <> ''`, only where `contacts` is null or `''`; then `DROP TABLE v2page3contacts`. Skip the copy when the table is already gone. Fail closed if the `contacts` column is missing. Remove `v2Page3Contacts` from `createPageType3Tables` and from the fail-closed table list. Do not recreate the table. Match `backupTables/page3.sql` to that end state (basics has `contacts text`; no contacts table).
2. `Page3.contacts` is `string`. Delete `Page3Contact`. Assemble reads `basics.contacts` (empty → `''`) and stops querying `v2Page3Contacts`. `emptyPageType3` uses `contacts: ''`. `savePageType3` writes `contacts` on the basics upsert and does not call `savePage3Contacts`. Delete `savePage3Contacts.ts`. `deletePageType3` no longer deletes that table.
3. Remove `'page3Contacts'` from `ViewPersistAttribute`, `ViewPersistValue`, the field-controller allowlist, `isPage3ContactsPayload`, and the `saveViewField` `Exclude`. Delete `persistPage3Contacts` and its `characterHook` / `getV2Updates` wiring (`insertContact` / `updateContact` blur and empty-row posts, the `page3Contacts` switch arms). Unknown attribute still refuses.
4. Replace `insertContact` / `updateContact` / `applyPage3ContactIds` / `PAGE3_CONTACT_CAP` with `updateContacts(character, pageID, value: string)` (same shape as `updateNotes`). `PageType3Updates.updateContacts(pageID, value)`. No persist call from that writer.
5. `Contacts.tsx`: keep the `h1`. Under it, `EditingContext` — `textarea.character-value` while editing (`placeholder=" "`, `value`, `onChange` → `updateContacts`), `p.character-value` on the view. No `onBlur` POST. No `DisplaySingleArray`. CSS in `Contacts.css`: `min-height: calc(18 * 17.38px)` on the `p` and the `textarea`; `white-space: pre-wrap`; width 100%; box-sizing border-box. Zebra and edit wash copy the `NotesPanes.css` rules (white then `#f3f3f3` at 17.38px, first band white, `background-attachment: local`; rest wash `rgba(173, 216, 230, 0.35)`; hover wash `rgba(145, 181, 194, 0.35)`; `!important` so `.view-edit textarea` solid teal loses). Do not copy that file’s `height: calc(16 * 17.38px)` or `min-height: calc(19 * 17.38px)`. Do not add `field-sizing`. Drop the even-row input teal rules.
done when: `npx tsc --noEmit -p backend/common` succeeds. `npx tsc --noEmit -p app` reports only the pre-existing missing `frontend-config`. Grep under `app/` and `backend/` for `page3Contacts`, `v2Page3Contacts`, `Page3Contact`, `PAGE3_CONTACT_CAP`, `savePage3Contacts`, `insertContact`, `updateContact`, `persistPage3Contacts` is 0. Grep `DisplaySingleArray` under `app/src/pages/v2/pageTypes/pageType3/` is 0. `ensureSchema.ts` contains `string_agg` into `contacts` and `drop table` of the old contacts table. No database is required for the join check.
depends on: T-100–T-112 (done)
open questions: none
deviations from design: Copy-then-drop of `v2Page3Contacts` follows the currentEmotions patch (`schema-on-boot.md`): one store after the join. The 18 × 17.38 box is the line count from the design answer. Relationship spans also have `padding: 2px 1px`, so this box is not the padded span’s border-box. No `field-sizing`; `edit-character.md` reserves that for the two page-type-2 discount notes. The boot SQL names the old table `v2page3contacts` (Postgres folds unquoted names). A case-sensitive grep for `v2Page3Contacts` is 0.
result: `Page3.contacts` is a string on `v2Page3Basics.contacts`. Boot copies non-empty child rows with newlines, then drops `v2page3contacts`. The pane is edit `textarea` / view `p`, min-height `calc(18 * 17.38px)`, zebra, and the Abilities wash. `'page3Contacts'` is gone. `savePage3Contacts.ts` is deleted.


### T-100: Add Page3 contract and union member
status: done
source: rewrite-ledger/page3-view.md, 2026-10-04
why: Assemble, persist, and the view switch need a `type: 3` payload. `PageV2` is `Page404Error | Page1 | Page2`.
scope: contracts `backend/common/interfaces/v2/pageTypes.ts`; new `backend/common/interfaces/v2/page3/` (Page3 stores, contact/relationship rows, gear slot keys and `PAGE3_GEAR_SLOTS`, coinage, notes). Do not change page-1 or page-2 interfaces. Do not add `features/`.
result: `Page3` is `type: 3` with contacts, relationships, keyed gear, coinage, notes. `PAGE3_GEAR_SLOTS` and `PAGE3_DEFAULT_S_SLOTS` export from `page3Interfaces.ts`. `PageV2` includes `Page3`. `tsc --noEmit -p backend/common` succeeds.
depends on: none
deviations from design: none

### T-101: Create page-type-3 tables on boot
status: done
source: rewrite-ledger/page3-view.md; rewrite-ledger/schema-on-boot.md, 2026-10-04
why: Live postgres has no type-3 stores. Snapshot and `ensureSchema` must match.
scope: unindexed `backend/server/db/ensureSchema.ts`; new `backend/server/v2/backupTables/page3.sql`. Do not change `page1.sql` or `page2.sql`. Do not insert `v2CharacterPages` type-3 rows.
result: `page3.sql` and `createPageType3Tables` create `v2Page3Basics`, `v2Page3Contacts`, `v2Page3Relationships`, `v2Page3Gear`. Fail closed if any table is missing. `grep pageTypeID = 3` in `ensureSchema.ts` is 0.
depends on: T-100
deviations from design: none

### T-102: Assemble page type 3 and empty defaults
status: done
source: rewrite-ledger/page3-view.md; rewrite-ledger/v2-page-type.md, 2026-10-04
why: `assembleV2Character` `default` returns `{ type: 404 }`. `getCharacterPages` already loads every `v2CharacterPages` row.
scope: view primary `backend/server/v2/view/assembleV2Character/assembleV2Character.ts` (`switch` only); new `backend/server/v2/view/assembleV2Character/utilities/pageType3/`; view adjacency `app/src/pages/v2/hooks/updates/emptyPageType3.ts`. Copy structure from `assemblePageType2` / `emptyPageType2`. Do not change `getCharacterName` (still first type-1).
result: `assemblePageType3` pads all `PAGE3_GEAR_SLOTS`. `assembleV2Character` has `case 3`. `emptyPageType3` matches that skeleton. `getCharacterName` still `pageTypeID = 1`.
depends on: T-100, T-101
deviations from design: none

### T-103: Insert one page-type-3 on Create character
status: done
source: rewrite-ledger/page3-view.md (Q1 type 3 at index 2), 2026-10-04
why: `addV2CharacterController` inserts type 1 at 0 and type 2 at 1. The “Add page type 3” comment is not approval; this TODO is.
scope: create primary `backend/server/v2/add/addV2CharacterController.ts`; new `backend/server/v2/add/pageType3/` (mirror `addPageType2`: insert default basics + one gear row per `PAGE3_GEAR_SLOTS`). Do not backfill existing characters. Do not change home slot limits.
result: Create inserts type 1 index 0, type 2 index 1, type 3 index 2. `addPageType3` writes basics + every gear slot with the default size set. `grep Add page type 3` in the controller is 0. No type-3 insert in `ensureSchema.ts`.
depends on: T-101
deviations from design: none

### T-104: Persist and delete page type 3; gate Save on type-3 count
status: done
source: rewrite-ledger/page3-view.md; rewrite-ledger/add-page-type-1.md, 2026-10-04
why: `savePages` `default` is a no-op. `deletePages` `default` is true. The Save gate counts type 1 and type 2 only.
scope: edit primary `backend/server/v2/edit/utilities/savePages.ts`; new `backend/server/v2/edit/utilities/persistPageType3.ts` and `backend/server/v2/edit/utilities/pageType3/`; `backend/server/v2/edit/editV2CharacterController.ts` (count gate only); delete `backend/server/v2/delete/utilities/deletePages.ts`; new `backend/server/v2/delete/utilities/deletePagesUtilities/pageType3/`. Copy `persistPageType2` / `savePageType2` / `deletePageType2`. Reuse `backend/server/v2/add/pageType3/`. Do not rewrite `query()`. Do not change `/v2/edit/:characterID/field`.
result: `savePages` / `deletePages` have `case 3`. Basics and gear upsert. Contacts/relationships delete-not-in. Save refuses if stored type-1 or type-2 or type-3 count is short. `persistPageType3` throws if INSERT yields no `id > 0`.
depends on: T-100, T-101, T-103
deviations from design: none

### T-105: Thread pageType3Updates through the v2 hook
status: done
source: rewrite-ledger/page3-view.md; rewrite-ledger/v2-page-type.md, 2026-10-04
why: `getV2Updates` returns type-1, type-2, and gutter. Type-3 cells have no local writers.
scope: view/edit adjacency `app/src/pages/v2/hooks/updates/pageType3Updates.ts`; `getV2Updates.ts`; `UpdateInterfaces.ts`; `characterHook.tsx`. Do not import v1. Do not add play-time persist attributes here (T-110).
result: `PageType3Updates` is on `V2UpdateFunctions`. `mapPage3` / find-by-`pageID` copy `mapPage2`. Caps 18 / 18. App tsc reports only the pre-existing missing `frontend-config`.
depends on: T-100
deviations from design: none

### T-106: Draw Contacts | Relationships
status: done
source: rewrite-ledger/page3-view.md, 2026-10-04
why: Type 3 has no widgets. Official blank page 3 starts with that pair.
scope: new `app/src/pages/v2/pageTypes/pageType3/` (`PageType3.tsx`, `PageType3.css`, Contacts / Relationships widgets). View adjacency `app/src/pages/v2/V2View.tsx` (`case 3` mount only; gutter is T-111). Reuse `doubleColumn` for this pair only. Do not add `features/`. Do not mount the wordmark.
result: `V2View` `case 3` mounts `PageType3`. Contacts `DisplaySingleArray` cap 18, `showInsert={true}`. Relationships page-local three-field rows. `grep bonfire-wordmark` / `19.38` / `DisplayTripleArray` under `pageType3/` are 0.
depends on: T-100, T-105
deviations from design: none

### T-107: Draw Gear three columns
status: done
source: rewrite-ledger/page3-view.md, 2026-10-04
why: Gear is the rest of official blank page 3. Fixed slots, not a v1 list.
scope: `app/src/pages/v2/pageTypes/pageType3/` Gear widgets. Do not change page type 1 or 2. Do not add `TripleColumn` under `pageTypes/components/`. Flag box look is T-108.
result: Left 28 / middle 21 / right 20 slots render. Chrome labels, `->`, `*`, Carry Str, QM numbers, coinage, Notes wrap/grow. `grep TripleColumn` and `Gear & Loot` under `pageType3/` are 0.
depends on: T-106
deviations from design: none

### T-108: Draw staff-snake and person-meditating flags without a border
status: done
source: rewrite-ledger/page3-view.md (Anointed minus border), 2026-10-04
why: Official blank uses bandage / heart columns. Designer named the FA icons and Anointed-without-border.
scope: `app/src/pages/v2/pageTypes/pageType3/` Gear flag cells and Gear header icons. Anointed analog is `Favor.tsx` / `Favor.css` (do not import Favor; do not reuse `.anointed-box`).
result: Header icons `fa-staff-snake` and `fa-person-meditating`. `.page3-flag-box` is 12×12, `fa-check` when true, teal / hover / checked-black. No `border` on that class. `grep anointed-box` under `pageType3/` is 0.
depends on: T-107
deviations from design: none

### T-109: Swap page-type-3 edit-only cells to controls
status: done
source: rewrite-ledger/page3-view.md; rewrite-ledger/edit-character.md, 2026-10-04
why: Relationship name and **R** stay `p` on the view. Edit session must swap them without moving boxes.
scope: `app/src/pages/v2/pageTypes/pageType3/` Relationships (and any other edit-only stored cell). Do not change sidebar or Save POST. Play-time cells already inputs (T-106–T-107).
result: Relationship `value` and `r` swap to `character-value` inputs in `.view-edit`. Insert-on-blur / clear-to-remove, cap 18. P / Contacts / Gear stay inputs when `!isEditing`.
depends on: T-106
deviations from design: none

### T-110: Persist page-type-3 play-time fields
status: done
source: rewrite-ledger/page3-view.md; rewrite-ledger/quick-view-inputs.md, 2026-10-04
why: Named type-3 cells are view controls. Field POST must allowlist them in the same change. Contacts need id-merge like Current Emotions.
scope: `backend/common/interfaces/v2/page1/viewPersist.ts` (existing home of the allowlist); `backend/server/v2/edit/editV2FieldController.ts`; new writes under `backend/server/v2/edit/utilities/pageType3/`; `app/src/pages/v2/hooks/characterHook.tsx`; `getV2Updates.ts`; `UpdateInterfaces.ts`; `pageType3Updates.ts`; `pageType3` widgets. Same `inFlight` / `isViewSaving` / toast path as `persistViewField`. Do not persist while `isEditing`. Do not add `/quickEdit`. Do not add `features/`.
result: Allowlist `page3Contacts` (replace-all + `RETURNING id`, merge ids), `page3RelationshipP`, `page3Gear`, `page3Coinage`, `page3Notes`. Unknown attribute still `{ success: false }`. Flag click POSTs while `!isEditing`. `grep /quickEdit` under `pageType3/` is 0.
depends on: T-104, T-106, T-107, T-108
deviations from design: attributes live in `page1/viewPersist.ts` because type-2 notes already do.

### T-111: Add + NPCs & Equipment on every card gutter
status: done
source: rewrite-ledger/add-page-type-1.md; rewrite-ledger/page3-view.md (Q2 analog, Q3 multiples, Q14 exact label), 2026-10-04
why: Gutter has Main Info and Skills only. Type 3 needs the playbook labeled add to the right of the last add.
scope: `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/hooks/updates/pageType1Updates.ts` (`spliceBlankAfter` / `addPageType3After`); `getV2Updates.ts`; `UpdateInterfaces.ts` (`PageGutterUpdates`). Do not persist on click. No tooltip. No dropdown.
result: Third add is `<i class="fa-solid fa-plus"></i> NPCs & Equipment` on every gutter. `addPageType3After` splices `emptyPageType3`. No `data-tooltip` on that button.
depends on: T-102, T-104, T-105
deviations from design: `fa-plus` prefix matches Main Info / Skills; Q14 forbids a tooltip, not the plus icon.

### T-112: Index page-type-3 paths on existing L1 keys
status: done
source: rewrite-ledger/v2-page-type.md; rewrite-ledger/feature-index.md, 2026-10-04
why: Indexed files added under view/edit/create/delete must update root YAML in the same body of work. No new user-objective key for “page type 3.”
scope: repository `00-START-HERE.yaml` `routing` adjacencies for view / edit / create / delete / add sheet page only. Do not add a `page type 3` L1 key.
result: Root YAML `adjacent` lists `pageType3` / `page3` trees on view, edit, create, add sheet, and delete. `grep "page type 3"` under `00-START-HERE.yaml` `routing` keys is 0.
depends on: T-100–T-111
deviations from design: none

### T-097: Allowlist currentEmotions on the field POST
status: done
source: rewrite-ledger/quick-view-inputs.md, rewrite-ledger/page1-view.md, 2026-10-04 (design Q2 A, Q4 max 9, Q6 RETURNING id, Q8 both)
why: Current Emotions is a child table. Today’s field POST coerces `value` with `+value`. `Number([])` is `0`. Full Save already has `saveCurrentEmotions`.
scope: edit primary `backend/common/interfaces/v2/page1/viewPersist.ts`; `backend/server/v2/edit/editV2FieldController.ts`; `backend/server/v2/edit/utilities/pageType1/utilities/saveCharacteristics/utilities/saveCurrentEmotions.ts`. Do not change `saveViewField` number/text UPDATEs. Do not ALTER `v2currentEmotions.value` (stays `varchar(500)`). Do not add `/quickEdit`. Do not add `features/`.
result: `'currentEmotions'` is allowlisted. Invalid array / >9 / `value` longer than 25 refuses with no write. Insert `RETURNING id`. Success `{ success: true, currentEmotions }`. Number/text path still `Number.isFinite(+value)`.
depends on: none
deviations from design: none. Column stays 500.

### T-098: Draw Current Emotions as view inputs with the Edit insert row
status: done
source: rewrite-ledger/quick-view-inputs.md, rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-04 (Q1 A, Q3 default teal, Q4 max 9, Q8 both)
why: View still renders `p`. `DisplaySingleArray` shows insert only while `isEditing`. Cap in code is already 9.
scope: view adjacency `app/src/pages/v2/components/displayArray/DisplaySingleArray.tsx`; `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.tsx`. Do not change `Flaws.tsx`. Do not change `Characteristics.css` (`.view-edit` even-cell mid teal stays edit-only). Do not add `features/`.
result: `showInsert` defaults to `isEditing`. Characteristics passes `showInsert={true}`, always-visible `input` `maxLength={25}`, leftover `p`. Flaws omits `showInsert`. No `isEditing ?` swap in `Characteristics.tsx`.
depends on: none
deviations from design: `showInsert` prop so Flaws stay edit-gated.

### T-099: Persist Current Emotions on blur and merge returned ids
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-04 (Q5 blurred cell only, Q6 merge ids, Q7 persist clear)
why: View inputs stay local until a field POST. `id: 0` after insert would make the next full Save delete the persisted row and insert a duplicate.
scope: edit adjacency `app/src/pages/v2/hooks/characterHook.tsx`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`; `app/src/pages/v2/hooks/updates/pageType1Updates.ts` (reuse `insertEmotion` / `updateEmotion` / `mapPage1` only); `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.tsx` (blur / empty / insert wiring). Same `inFlight` / `isViewSaving` / toast path as `persistViewField`. Do not persist while `isEditing`. Do not change number/text `persistViewField`.
result: `persistCurrentEmotions` POSTs the next array on insert, row blur, and empty-row remove. Skip is the blurred cell vs snapshot. Success merges returned ids onto live + snapshot + cache; keeps `key`.
depends on: T-097, T-098
deviations from design: persist the empty-row removal from the `onChange` that unmounts the input, not only `onBlur`.


### T-094: Store generalSkillNotes and combatSkillNotes
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (Q1 no label; Q2 grow; Q3 stretch leftover; Q4 always textarea)
why: Two unlabeled leftover notes under the discounts. No store exists.
scope: `backend/common/interfaces/v2/pageTypes.ts` (`Page2`); `backend/server/v2/backupTables/page2.sql`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/view/assembleV2Character/utilities/pageType2/assemblePageType2.ts`; `backend/server/v2/edit/utilities/pageType2/savePageType2.ts`; `app/src/pages/v2/hooks/updates/emptyPageType2.ts`. Do not add a table. Do not add `features/`.
result: Two `text` columns on `v2Page2Basics`. Assemble / empty / Save carry `generalSkillNotes` and `combatSkillNotes`. Existing rows stay `''`.
depends on: T-077, T-078, T-080 (done)
deviations from design: none. Payload keys are `generalSkillNotes` / `combatSkillNotes`.

### T-095: Draw leftover notes textareas under both discounts
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (Q1 none; Q2 grow; Q3 stretch; Q4 always textarea)
why: The blank under Gen. Skill Discount and Combat Skill Discount is unused.
scope: view/edit adjacency `app/src/pages/v2/pageTypes/pageType2/components/GeneralSkills/` and `.../CombatSkills/` (tsx + css). `PageType2Updates` + `pageType2Updates.ts` + `getV2Updates.ts` for the two writers. Do not change NotesPanes, Favor, Adv Skills wrap, or `index.css`. Do not add `features/`.
result: One unlabeled `textarea.character-value` under each Discount. `suites-col` column flex + `flex: 1` fills leftover. `field-sizing: content` on these two only. No zebra.
depends on: T-094
deviations from design: `field-sizing: content` on these two only so wrap+grow works without JS.

### T-096: Persist leftover notes on view blur
status: done
source: rewrite-ledger/quick-view-inputs.md / page2-view.md, 2026-10-04
why: These panes are play-time. View persist is number-only today.
scope: `backend/common/interfaces/v2/page1/viewPersist.ts`; `backend/server/v2/edit/editV2FieldController.ts`; `backend/server/v2/edit/utilities/pageType1/utilities/saveViewField.ts` (or a page-2 sibling UPDATE, not a new route); `app/src/pages/v2/hooks/characterHook.tsx`; `UpdateInterfaces.ts` / `getV2Updates.ts`; the two skill widgets (blur only). Do not add `/quickEdit`. Do not persist while `isEditing`.
result: Field POST allowlists the two strings. Text attributes write the string; numbers still coerce. Widgets persist on blur. Location highlight uses existing `.view-quick-edit textarea`.
depends on: T-094, T-095
deviations from design: none. Extends the existing field POST; no new route.


### T-093: Put gutter add on the sheet playbook vertical slice
status: done
source: rewrite-ledger/v2-page-type.md, 2026-10-04 (Q1 Save-gate type N; Q2 label on pageN-view.md)
why: The playbook lists surfaces every new type must add. Instance add is only today’s two buttons, so a type-N Order can skip the labeled gutter insert and Save count-gate.
scope: ledger `rewrite-ledger/v2-page-type.md` (playbook). Pointer only on `rewrite-ledger/add-page-type-1.md`. Do not change app or backend. Do not name a type-3 label. Do not add `features/` or a button registry.
result: Vertical-slice **Gutter add** row plus proceed step 3 now require `emptyPageTypeN` / `addPageTypeNAfter`, a label on `pageN-view.md`, and a type-N Save count-gate. Pointer on `add-page-type-1.md`.
depends on: T-092 (done)
deviations from design: none


### T-092: Add + Skills & Abilities; make + Main Info always type 1
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-04 (Q1 every card; Q2 insert after this card; Q3 Main Info always type 1; Q4 no scroll; Q5 same chrome)
why: Existing type-1-only characters cannot add a type-2 sheet because `addPageAfter` copies the card’s type. The designer wants two labeled inserts in the gutter.
scope: view/edit adjacency `app/src/pages/v2/V2View.tsx` (gutter only), `app/src/pages/v2/hooks/updates/pageType1Updates.ts`, `app/src/pages/v2/hooks/updates/getV2Updates.ts`, `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`. Do not change persist, Create, `PageType1.tsx`, `PageType2.tsx`, or `index.css`. Do not add `features/`. Do not add a route or persist-on-click.
result: `addPageAfter` always inserts type 1. `addPageType2After` inserts type 2. Skills button sits to the right of Main Info on every card. Sibling CSS keeps `margin-left: auto` on Main Info only.
depends on: T-080, T-082 (done)
deviations from design: none. Two labeled buttons, not a dropdown. Chrome matches live Main Info (whitesmoke / orange hover), not the older ledger `#bdbdbd` + bare `+`.


### T-091: Wash default teal over note textareas while edit is on
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (Q1 default teal; Q2 darker hover; Q3 view `p` zebra; Q4 wash)
why: T-089 hid edit teal so only hover showed a wash. Designer wants the rest state teal too, without a solid fill that hides the leftover zebra.
scope: view/edit adjacency `app/src/pages/v2/pageTypes/pageType2/components/NotesPanes/NotesPanes.css`. Do not change `index.css`, `View.css`, Favor, page-1 notes, skill tables, or JSX. Do not add `features/`.
result: `.view-edit` textareas stack `rgba(173, 216, 230, 0.35)` over leftover zebra at rest and `rgba(145, 181, 194, 0.35)` on hover. View `p` stays zebra. Dropped leftover `.view-quick-edit` selectors.
depends on: T-089 (done)
deviations from design: none. Rest/hover wash alpha is the existing T-089 hover `0.35`; only the rest color is new.


### T-090: Make each suites-col row the same height in view and edit
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (screenshot clarify: one row height in both modes; Q1 every first-column row; Q2 empty-edit 17.38)
why: View Athletics→Weirdcraft and Armor→Unarmed are taller than the same rows in edit. `suites-col` has `min-height` only. View `p` keeps island padding and `line-height: 1.2`; edit `input` uses View.css `padding: 0` and filled `height: 1.2em`. Native Language wrapping the name under the label already matches across modes — that is not the bug.
scope: view/edit adjacency `app/src/pages/v2/pageTypes/pageType2/components/GeneralSkills/GeneralSkills.css` and `.../CombatSkills/CombatSkills.css` (`suites-col` cells only). Do not change `View.css`, `index.css`, Adv Skills wrap heights, NotesPanes, page type 1, or JSX unless a selector cannot reach the cell. Do not add `features/`. Do not set `--mapped-row-min-height` on `.page-type-two`.
result: Locked `em`/`p`/`input`/discount `h2` in both suites-cols to `height` + `min-height` 17.38. Suites-col `input.character-value` restates island padding so View.css `padding: 0` / filled `1.2em` cannot shrink or grow the row. Header `h2` and Adv Skills wrap left as-is.
depends on: T-083, T-084, T-086 (done)
deviations from design: none. Tightened after screenshots: the done-check is same row height, not “17.38 somewhere.”


### T-089: Paint leftover zebra behind the note panes
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (Q1 zebra; Q2 17.38; Q3 white first; Q4 visible in edit; Q5 tile on grow)
why: Official blank is lined. These panes are textareas, so leftover `nth-child` zebra does not apply. The designer wants `#f3f3f3` / white bands behind the text.
scope: view/edit adjacency `app/src/pages/v2/pageTypes/pageType2/components/NotesPanes/NotesPanes.css` (and `NotesPanes.tsx` only if a wrapper is required). Do not change `index.css`. Do not change Favor or page-1 notes. Do not convert to leftover list rows. Do not add a shared widget.
result: `repeating-linear-gradient` white then `#f3f3f3` at 17.38px on view `p` and textarea. Vertical padding dropped so the first white band is a full 17.38. Widget `!important` beats edit teal; hover is a 0.35 teal wash over the same zebra.
deviations from design: none
open questions: none

### T-088: Put 15px between Abilities and Burdens & Injuries
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04 (note gap; Design Q answered)
why: The two note panes sit in `DoubleColumn` at 50% / 50% with no space between them. The designer named 15px between the stacks.
scope: view adjacency `app/src/pages/v2/pageTypes/pageType2/PageType2.css` (column widths / `.page-type-two .double-column` only). Do not change `app/src/pages/v2/pageTypes/components/doubleColumn/DoubleColumn.css` or `DoubleColumn.tsx`. Do not change page type 1. Do not add `features/`.
result: `.page-type-two .double-column` `gap: 15px`. Columns `calc(50% - 7.5px)`. Shared `DoubleColumn` unchanged.
deviations from design: none
open questions: none


### T-087: Index page-type-2 paths on existing L1 keys
status: done
source: rewrite-ledger/v2-page-type.md; rewrite-ledger/feature-index.md, 2026-10-04
why: Indexed files added under view/edit/create/delete must update root YAML in the same body of work. No new user-objective key for “page type 2.”
scope: repository `00-START-HERE.yaml` `routing` adjacencies for view / edit / create / delete / add sheet page only. Do not add a `page type 2` L1 key.
result: New trees listed on create / view / edit / add-sheet / delete `adjacent`. No `page type 2` L1 key. `v2-page-type.md` verification updated after Execute.
deviations from design: none
open questions: none

### T-086: Swap page-type-2 stored cells to edit controls
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/edit-character.md, 2026-10-04
why: Type-2 view cells must become inputs in the existing `isEditing` session without moving boxes.
scope: `app/src/pages/v2/pageTypes/pageType2/` widgets from T-083–T-085. Do not change sidebar, Save POST, or page-1 widgets. No view persist.
result: Stored cells swap to controlled `character-value` inputs / textareas in the same widgets. Leftover + insert on blur. `persistViewField` 0 hits under pageType2.
deviations from design: none
open questions: none

### T-085: Draw Abilities | Burdens & Injuries textareas
status: done
source: rewrite-ledger/page2-view.md (Q6 textarea; Q7 Injuries), 2026-10-04
why: Bottom pair on the official blank is two lined panes, not leftover lists.
scope: `app/src/pages/v2/pageTypes/pageType2/` Abilities / Burdens widgets; reuse `app/src/pages/v2/pageTypes/components/doubleColumn/`. Favor notes are the textarea analog (`Favor.tsx` / `Favor.css`), not a copy-import of Favor.
result: `NotesPanes` in `DoubleColumn` under Combat Skills. Headings Abilities and Burdens & Injuries. `Injures` 0 hits.
deviations from design: none
open questions: none

### T-084: Draw Combat Skills
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04
why: Combat Skills is the second stacked block on the official blank.
scope: `app/src/pages/v2/pageTypes/pageType2/` Combat Skills widgets. Do not change page type 1.
result: Five chrome suites + Combat Skill Discount. Adv combat uses v2 `DisplayPairArray` (`name` as `value`), cap 20, wrap height `calc(10 * 17.38px)`.
deviations from design: none
open questions: none

### T-083: Draw General Skills
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04
why: Type 2 has no widgets. Official blank page 2 starts with the General Skills block.
scope: new `app/src/pages/v2/pageTypes/pageType2/` (`PageType2.tsx`, `PageType2.css`, General Skills widgets). View adjacency `app/src/pages/v2/V2View.tsx` (`case 2` mount only; gutter is T-082). Reuse `doubleColumn` only later (T-085). Do not add `features/`. Do not mount the wordmark.
result: `PageType2` root `.page.card.page-type-two`. Seven suites + Native Language + two discounts. Adv general local 3-field leftover/insert, cap 36, wrap height `calc(18 * 17.38px)`. No wordmark. `V2View` case 2.
deviations from design: none
open questions: none

### T-082: Make the page gutter generic
status: done
source: rewrite-ledger/add-page-type-1.md; rewrite-ledger/page-reorder.md; Design Q12, 2026-10-04
why: Gutter JSX and `addPageType1After` live only on type 1. Type 2 needs the same `+` / reorder. `+` must insert the **clicked card’s type**. Temp ids must consider every page.
scope: `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/V2View.css`; `app/src/pages/v2/hooks/updates/pageType1Updates.ts` (`addPageType1After` / reorder only); `getV2Updates.ts`; `UpdateInterfaces.ts`; `characterHook.tsx`. Do not change `PageType1.tsx`. Do not persist on click.
result: Gutter after every page. `addPageAfter` copies type 1 or 2. Temp id from all pages that have `pageID` (404 has none). Helpers on `pageGutterUpdates`. CSS `.add-page`. Old class 0 hits in `app/src/pages/v2/`.
deviations from design: none
open questions: none

### T-081: Thread pageType2Updates through the v2 hook
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/v2-page-type.md, 2026-10-04
why: `getV2Updates` returns only `PageType1Updates`. Type-2 cells have no local writers.
scope: view/edit adjacency `app/src/pages/v2/hooks/updates/pageType2Updates.ts`; `getV2Updates.ts`; `UpdateInterfaces.ts`; `characterHook.tsx`. Do not import v1. Do not add play-time persist attributes.
result: `PageType2Updates` + `mapPage2` writers (caps 36/20). `getV2Updates` returns type-1, type-2, and gutter. `characterHook` exposes `pageType2Updates`.
deviations from design: none
open questions: none

### T-080: Persist and delete page type 2; gate Save on type-2 count
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/add-page-type-1.md, 2026-10-04
why: `savePages` `default` is a no-op. `deletePages` `default` is true. The Save gate counts type 1 only.
scope: edit primary `backend/server/v2/edit/utilities/savePages.ts`; new `backend/server/v2/edit/utilities/persistPageType2.ts` and `backend/server/v2/edit/utilities/pageType2/`; `backend/server/v2/edit/editV2CharacterController.ts` (count gate only); delete `backend/server/v2/delete/utilities/deletePages.ts`; new `backend/server/v2/delete/utilities/deletePagesUtilities/pageType2/`. Copy `persistPageType1` / `savePageType1` / `deletePageType1`. Reuse `backend/server/v2/add/pageType2/`. Do not rewrite `query()`. Do not change `/v2/edit/:characterID/field`.
result: `savePages` / `deletePages` case 2. Basics upsert on unique `pageID`; suites SELECT then UPDATE/INSERT (`query()` hides rowCount). Adv lists delete-not-in + update/insert. Save refuses if stored type-1 or type-2 count is short.
deviations from design: done-when `grep case 2` on `editV2CharacterController.ts` is 0; the gate is a type-2 count SQL as the steps named, not a switch.
open questions: none

### T-079: Insert one page-type-2 on Create character
status: done
source: rewrite-ledger/page2-view.md (Q2 yes), 2026-10-04
why: `addV2CharacterController` inserts `pageTypeID` 1 only. Comments about type 2 are not approval; this TODO is.
scope: create primary `backend/server/v2/add/addV2CharacterController.ts`; new `backend/server/v2/add/pageType2/` (mirror `addPageType1`: insert default basics + seven general suite rows + five combat suite rows). Do not backfill existing characters. Do not change home slot limits.
result: Create inserts type 1 at index 0 then type 2 at index 1. `addPageType2` writes basics + suites 1–7 and 1–5. Stale “Add page type 2” comment removed. Type-3 comment left.
deviations from design: none
open questions: none

### T-078: Assemble page type 2 and empty defaults
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/v2-page-type.md, 2026-10-04
why: `assembleV2Character` `default` returns `{ type: 404 }`. `getCharacterPages` already loads every `v2CharacterPages` row.
scope: view primary `backend/server/v2/view/assembleV2Character/assembleV2Character.ts` (`switch` only); new `backend/server/v2/view/assembleV2Character/utilities/pageType2/`; view adjacency `app/src/pages/v2/hooks/updates/emptyPageType2.ts`. Copy structure from `assemblePageType1` / `emptyPageType1`. Do not change `getCharacterName` (still first type-1).
result: `assemblePageType2` fills a full `Page2` from the five tables. `assembleV2Character` case 2. `emptyPageType2` matches the skeleton. `getCharacterName` still first type-1.
deviations from design: none
open questions: none

### T-077: Create page-type-2 tables on boot
status: done
source: rewrite-ledger/page2-view.md; rewrite-ledger/schema-on-boot.md, 2026-10-04
why: Live postgres has no type-2 stores. Snapshot and `ensureSchema` must match.
scope: unindexed `backend/server/db/ensureSchema.ts`; new `backend/server/v2/backupTables/page2.sql`. Do not change `page1.sql`. Do not insert `v2CharacterPages` type-2 rows.
result: Five tables in `page2.sql` and `ensureSchema`. Unique on `v2Page2Basics.pageID`. Fail closed if any table is missing. No type-2 page backfill (`pageTypeID = 2` 0 hits in `ensureSchema`).
deviations from design: none
open questions: none

### T-076: Add Page2 contract and union member
status: done
source: rewrite-ledger/page2-view.md, 2026-10-04
why: Assemble, persist, and the view switch need a `type: 2` payload. `PageV2` is only `Page404Error | Page1`.
scope: contracts `backend/common/interfaces/v2/pageTypes.ts`; new `backend/common/interfaces/v2/page2/` (basics, general suites, combat suites, adv-skill rows). Do not change page-1 interfaces. Do not add `features/`.
result: `Page2` with the `page2-view.md` stores. `PageV2` is `Page404Error | Page1 | Page2`. `npx tsc --noEmit -p backend/common` succeeds.
deviations from design: none
open questions: none

### T-075: Refuse full Save unless `request.user` is the owner
status: done
source: rewrite-ledger/page-reorder.md, 2026-10-03 (Q4 API-direct saves); rewrite-ledger/edit-character.md (owner check revised)
why: `editV2Character` compares `ownerID` to `body.userInfo.userID`. Field POST already uses `request.user?.id`. A forged body can persist a reorder (and the rest of the sheet).
scope: edit character primary `backend/server/v2/edit/editV2CharacterController.ts` (`editV2Character` owner `if` only). Do not change `savePages`, `persistPageType1`, the type-1 count gate, or `/v2/edit/:characterID/field`. Do not change v1 edit.
result: Owner `if` is `ownerID === request.user?.id`. Posted `userInfo.userID` is unused. Refuse message unchanged.
deviations from design: none
open questions: none

### T-074: Add edit-only swap / top / bottom left of `+`
status: done
source: rewrite-ledger/page-reorder.md, 2026-10-03 (Q1 reorder; Q2 first has swap; Q3 local until Save; Q4 isEditing; Q5 no empty slots; Q6 tooltip drafts; Q7 swap | top | bottom | add)
why: Extra page-type-1 sheets can be added but not reordered. Save already writes `v2CharacterPages.index` from array order. The designer wants the three controls on the existing gutter row.
scope: view/edit adjacency `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/V2View.css`; `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`. Do not change `PageType1.tsx`. Do not change `persistPageType1` / `savePages` / `getCharacterPages`. Do not implement add-page. Do not import v1. Do not add `features/`.
result: Gutter row is swap | top | bottom | `+`. Helpers no-op at the ends. First-type-1 change updates `character.name` and catalog extras. Scroll uses `sheet-${pageID}`.
deviations from design: 8px gap between gutter buttons so shadows do not stack.
open questions: none

### T-073: Keep extra names on catalog cache; write them on Save
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (Q8 confirm)
why: Home uses redux and skips GET when the cache exists. `updateCatalogInfo` replaces the whole `CharacterHomeInfo`, so a first-page name patch drops extras and hides the icon.
scope: unindexed `app/src/redux/slices/usersCharactersSlice.tsx` (`updateCatalogInfo`); edit adjacency `app/src/pages/v2/hooks/characterHook.tsx` (`saveCharacterToBackend` success only). Optional helper next to `firstPage1` in `app/src/pages/v2/hooks/updates/pageType1Updates.ts` (export; do not invent a new owner). Do not change `dispatchCatalog` / `restoreCatalogFromSnapshot` payloads beyond what the reducer merge covers. Do not write extras on keystroke or Revert. Do not refetch `/allOfUsersCharacter` on Save. Do not add `features/`.
result: `updateCatalogInfo` keeps extras when the key is omitted. Successful Save writes `otherPageType1Names` from type-1s after the first. `otherPageType1Names()` exported next to `firstPage1`.
deviations from design: none
open questions: none

### T-072: Catalog `fa-user` slot and extra-name tooltip
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (Q2 separate slot; Q3 inherit; Q4 empty → New Character; Q5 one line; Q6 reuse `my-tooltip`; Q7 row click)
why: Extra names are on the payload. The row still shows only the first name.
scope: list adjacency `app/src/pages/home/components/charactersRowDisplay/component/CharacterRow.tsx`; `.../charactersRowDisplay/CharacterRowsDisplay.css`. Unindexed `app/src/App.tsx` only if the shared `Tooltip` needs `white-space: pre-line` so `\n` breaks. Do not add a tooltip package. Do not add a Font Awesome kit. Do not change v1 display except that shared `CharacterRow` stays quiet when the array is missing/empty. Do not add `features/`.
result: Name+icon share the 25% name column. `fa-user` only when extras exist. `my-tooltip` lists extras, `\n` + `pre-line` on the shared Tooltip. Empty → `New Character`.
deviations from design: none beyond Order (shared 25% column).
open questions: none

### T-071: Put extra type-1 names on the v2 home list payload
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (catalog icon; Q1 fold)
why: Home SQL returns only the first type-1. The catalog icon needs the other names without a sheet GET.
scope: list-characters primary `backend/server/controllers/home/v2/getCharacters.ts`; list adjacency `backend/common/interfaces/characterInterfaces.ts` (`CharacterHomeInfo`). Do not change v1 `getCharacters` or `HomeController` assembly. Do not add a route. Do not add `features/`.
result: `CharacterHomeInfo.otherPageType1Names` optional. v2 SQL `array_agg` of later type-1 names, quoted alias, `'{}'` when none. v1 SQL unchanged.
deviations from design: none
open questions: none


### T-070: Refuse Save 200 when stored type-1 count is short
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (persist miss; do not 200 a shorter list)
why: Client `captureLoaded`s any 200 that has `pages`. A silent missed INSERT looks like a successful Save and drops the extra cards.
scope: edit character primary `backend/server/v2/edit/editV2CharacterController.ts` (`editV2Character` after `savePages`). Existing `checkForContentTypeBeforeSending`. Do not change `getV2Character` / `assembleV2Character` to return-without-send. Do not change `characterHook` or add a frontend count check.
result: After `savePages`, stored type-1 count vs posted type-1 count. Short → `{ message: 'Could not save all sheets' }` with no `pages`. Else `getV2Character`.
deviations from design: stored row count, not a split reassemble (Order).
open questions: none

### T-069: Persist page-type-1 by row existence; fail closed on mint
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (persist miss; Q1 extras gone, Q2 no server errors)
why: `persistPageType1` UPDATEs whenever `pageID > 0`. UPDATE of a missing id writes nothing. `query()` hides `rowCount`. Save then 200s the old one-page assemble.
scope: edit character primary `backend/server/v2/edit/utilities/persistPageType1.ts`. Same T-055 pattern as `saveBasicCharacteristics` (SELECT then UPDATE or INSERT). Do not change `savePages` switch, `addV2CharacterController`, `/v2/edit/:characterID/field`, or `query()`.
result: SELECT `id`+`characterID` before UPDATE. No row or `pageID <= 0` → INSERT. Throw if minted id is not a number `> 0`.
deviations from design: none
open questions: none

### T-068: Allow several v2CharacterPages rows per character
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (persist miss; Q1+Q2 landmine, not the live miss)
why: A unique on `v2CharacterPages.characterid` alone would block a second sheet. Snapshot `basicData.sql` has `id` PK only. Live postgres is not in this repo.
scope: unindexed `backend/server/db/ensureSchema.ts`. Verify `backend/server/v2/backupTables/basicData.sql` (`v2characterpages` only). Do not change `page1.sql`. Do not unique `(characterid, index)`. Do not rewrite `query()`.
result: `ensureSchema` drops characterid-only uniques/indexes on `v2characterpages` and throws if one remains. `basicData.sql` left unchanged (no unique `characterid`). Restart to apply.
deviations from design: none
open questions: none


### T-067: Insert new page-type-1 rows on Save
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (design Q1: persist on character Save)
why: `savePages` / `savePageType1` / `saveGeneralInfo` only UPDATE by `pageID`. A temp `pageID <= 0` writes nothing. There is no `v2CharacterPages` insert on edit.
scope: edit character primary `backend/server/v2/edit/editV2CharacterController.ts`; `backend/server/v2/edit/utilities/savePages.ts`; new helper under `backend/server/v2/edit/utilities/` (name as needed). Reuse `backend/server/v2/add/pageType1/addPageType1.ts`. Do not add a route. Do not change `addV2CharacterController` or `/v2/edit/:characterID/field`.
result: `savePages(characterID, pages)` walks array order. Existing type-1: update `index` then `savePageType1`. `pageID <= 0`: INSERT `v2CharacterPages`, `addPageType1`, then save. No new route.
deviations from design: none
open questions: none

### T-066: Assemble v2 pages in stored index order
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (design Q8: page order is stored)
why: `v2CharacterPages.index` exists and create writes `0`. `getCharacterPages` is `select *` with no `ORDER BY`, so insert-after cannot round-trip.
scope: view character primary `backend/server/v2/view/viewV2CharacterController.ts` (`getCharacterPages`). Do not change assemble mapping or `CharacterPageReturns` unless a new column is read.
result: `getCharacterPages` is `select * from v2CharacterPages where characterID = $1 order by index`.
deviations from design: none
open questions: none

### T-065: Keep catalog identity on the first page-type-1
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (design Q4 first page only)
why: `getV2Characters` joins every `v2GeneralInfo` row. A second page-type-1 would list the same character twice. `updateGeneralInfoField` also writes `character.name` and `dispatchCatalog` from any page.
scope: list-characters primary `backend/server/controllers/home/v2/getCharacters.ts`; edit adjacency `app/src/pages/v2/hooks/updates/getV2Updates.ts` (`dispatchCatalog`); `app/src/pages/v2/hooks/updates/pageType1Updates.ts` (`updateGeneralInfoField` `character.name` write). Do not change `restoreCatalogFromSnapshot` / `sheetName` (already `firstPage1`). Do not change create-character slot limit.
result: Home SQL keeps one row per character (lowest type-1 `index`). `dispatchCatalog` and `character.name` only follow the first type-1 in `pages`.
deviations from design: none beyond Order (home SQL).
open questions: none

### T-064: Insert a blank page-type-1 locally from an edit-only +
status: done
source: rewrite-ledger/add-page-type-1.md, 2026-10-03 (design Q1 local-until-Save; Q3 edit-only; Q5 `+` quieter; Q6 unbounded; Q7 no scroll)
why: V2View already maps every page. There is no control to add another type-1 instance. The add must stay local so Revert and leave-warn match the edit session.
scope: view/edit adjacency `app/src/pages/v2/V2View.tsx`; new `app/src/pages/v2/V2View.css` (or equivalent view-slice chrome CSS — not `PageType1.css`, not `index.css`); `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`. New helper on the v2 slice for the empty `Page1` skeleton and `addPageType1After` (e.g. next to `pageType1Updates.ts`). Do not change `PageType1.tsx`. Do not import v1. Do not add `features/`. Same change: root `00-START-HERE.yaml` routing key for this objective (primary `backend/server/v2/edit/`; adjacent `app/src/pages/v2/`, `backend/server/v2/add/pageType1/`, `backend/common/interfaces/v2/`, `backend/server/controllers/home/v2/getCharacters.ts`).
result: Edit-only `+` under each type-1 card. `addPageType1After` splices `emptyPageType1` with a unique `pageID <= 0`. L1 key added. Revert still drops unsaved pages.
deviations from design: none
open questions: none



### T-063: Reveal view-input locations (v1 eye button)
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design: location highlight; Q1 exact v1 copy; Q2 as v1 who-sees; Q3 no blank gate; Q4 default off; Q5 highlight; Q6 face hover off only while shown; Q7 die cell teal fills; Q8 session-only; Q9 selected flame stays)
why: Phase-1 inputs are always on the view and transparent. v1 shows where they are with a sidebar eye button and `view-quick-edit`. The designer wants that working on v2, under Edit.
scope: edit adjacency `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/components/sidebar/Sidebar.tsx`; `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css`.
result: Session `viewQuickEdit` default off. Sidebar eye button under Edit, exact v1 copy, not owner-gated. `view-quick-edit` on `page-shell` when on and not editing. Die cells get Edit teal fills; unselected hover face filter is none. T-059 rule and selected flame unchanged.
deviations from design: `view-quick-edit` is applied only when `!isEditing` (v1 can set both classes). Local state is named `viewQuickEdit` to match v1; that is not a `/quickEdit` route.
open questions: none



### T-062: Persist Doom / Damage / Stress dieIndex on click
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design: selected dice must persist; Q1 persist clear-to-0; Q2 Edit session unchanged)
why: T-061 persists view inputs on blur. Die cells are `<p>` clicks, so `dieIndex` stays local. The designer wants the selected die written too.
scope: edit primary `backend/common/interfaces/v2/page1/viewPersist.ts`; `backend/server/v2/edit/editV2FieldController.ts`; `.../utilities/pageType1/utilities/saveViewField.ts`; edit adjacency `app/src/pages/v2/hooks/characterHook.tsx` (`viewFieldValue`, `patchViewField` only); `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.tsx` (the three `DieRow` `onSelect`s).
result: Allowlist adds `selfDoubtDieIndex` / `damageDieIndex` / `stressDieIndex`. One-column `dieIndex` UPDATEs. DieRow `onSelect` calls `persistViewField` with the next index including `0`. Edit session still skips POST. No DieRow markup or CSS change.
deviations from design: Attribute names locked at Order so they do not collide with current-total `'damage'` / `'stress'`.
open questions: none



### T-061: Blur view inputs to persist; spinner on the sidebar
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design phase 2; Q1–Q8)
why: Persist is on blur of view inputs, owner-only. v1 replaces sidebar buttons with `LoadingIndicator` `secondary` while that POST is in flight. Full `saveCharacterToBackend` nulls the sheet.
scope: edit adjacency `app/src/pages/v2/hooks/characterHook.tsx`; `.../hooks/interfaces/UpdateInterfaces.ts`; `.../V2View.tsx`; `.../components/sidebar/Sidebar.tsx`; view widgets `.../pageType1/components/GeneralInfo/GeneralInfo.tsx` (Unspent only); `.../Favor/Favor.tsx` (Current Favor only); `.../Vitals/Vitals.tsx` (Die Penalty, Current Damage, Current Stress). Unindexed `app/src/components/loading/components/LoadingIndicator.tsx` (reuse).
result: `persistViewField` on the five view-input `onBlur`s. No-op when editing, non-owner, or snapshot already matches. In-flight count drives `isViewSaving`; sidebar shows `LoadingIndicator` `secondary`. Success patches snapshot + cache. Failure toasts. `setCharacter(null)` still only on full Save. Die click unchanged.
deviations from design: Die rows are not inputs; no persist (Q7). Skip POST when the blurred value equals the snapshot. Overlapping blurs patch through `revertedRef` so the second success does not wipe the first.
open questions: none

### T-060: Persist one view-input column under `/v2/edit/:characterID/field`
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design phase 2; Q1 onBlur; Q2 field-only; Q3 skip non-owner POST; Q4 toast on client)
why: View play-time inputs are local only. A full-character POST would rewrite sibling columns. v1 `/quickEdit` is rejected as a v2 route.
scope: edit character primary `backend/server/v2/edit/editV2CharacterRoutes.ts`; new `backend/server/v2/edit/editV2FieldController.ts`; new `.../utilities/pageType1/utilities/saveViewField.ts`; new `backend/common/interfaces/v2/page1/viewPersist.ts`.
result: `POST /:characterID/field` on the existing router. Owner is `request.user?.id`. One-column UPDATEs for `unspent` / `currentFavor` / `diePenalty` / `damage` / `stress`. Unknown attribute and non-owner refuse with no write. Existing full-row savers unchanged. No `/quickEdit`.
deviations from design: none
open questions: none


### T-059: Teal-tint unselected die faces on hover
status: done
source: rewrite-ledger/quick-view-inputs.md, rewrite-ledger/page1-view.md, 2026-10-03 (design: hover teal + cursor; Q1 default teal on the white face)
why: T-058 made die cells clickable on the view. Hover teal and `cursor: pointer` exist only under `.view-edit`, and that paints the **cell**. The designer wants the **white face** tinted default teal and the cursor changed.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css` (`.die-row p` and `img` only). Do not change `Vitals.tsx`, die PNGs, `dieIndex` click, Anointed, `index.css`, selected T-057 filter, or `.view-edit` cell fills / hover.
result: View `.die-row p` is `cursor: pointer`. Unselected hover `img` uses `invert(1) invert(30%) sepia(1) saturate(0.8) hue-rotate(165deg) brightness(2.2) contrast(1)` (face near `#ADD8E6`, ink near-white). Selected hover stays the T-057 flame string. View cell hover background stays transparent. Edit even/odd fills and `rgb(145, 181, 194)` hover unchanged. No `mix-blend-mode`. No TSX change.
deviations from design: Face is near `#ADD8E6` (sampled ~`#b1d2ec`); exact hex not required. Chrome serializes `invert(25%)` as `invert(0.25)`.
open questions: none


### T-058: Show page-type-1 quick view inputs
status: done
source: rewrite-ledger/quick-view-inputs.md, 2026-10-03 (design: phase 1 inputs only; named set)
why: Those play-time cells already swap behind `isEditing`. The view (`isEditing` false) still shows `p`, and die clicks are gated. Phase 1 is the view controls. No persist, no Edit toggle.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/GeneralInfo/GeneralInfo.tsx` (Unspent CrP only); `.../Favor/Favor.tsx` (Current Favor only); `.../Vitals/Vitals.tsx` (`DieRow` click, Die Penalty, Current Damage, Current Stress); `app/src/pages/v2/V2View.tsx` (`beforeunload` / `useBlocker` gate only). Do not change `characterHook` `isDirty`. Do not change CSS, sidebar, backend, or any other widget. Do not import v1. Do not add `features/`.
result: Unspent, Current Favor, Die Penalty, Current Damage, and Current Stress are always the existing number inputs. DieRow click is ungated and no longer reads `isEditing`. `V2View` leave-warn is `isDirty && isEditing`. Spent / max / thresholds stay gated. No POST.
deviations from design: none beyond Order (Q4/Q5 readings already on the TODO).
open questions: none

### T-057: Recolor selected die face to flame; ink white
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-03 (design: drop outline; Q1 white face → orange, black → white)
why: Selected is `outline: 2px solid black` on the cell. Designer wants CSS-only glyph recolor: face `#b45f06` (vault flame / `index.css`), ink white. Cell grey / edit teal stay.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css` (`.die-row p.selected` and `img`). Do not change `Vitals.tsx`, die PNGs, `dieIndex` click, Anointed, `index.css`, or unselected dice.
result: Outline removed. `.die-row p.selected img` uses `invert(1) invert(25%) sepia(1) saturate(2) hue-rotate(-10deg) brightness(1.6) contrast(1.3)`. Cell fills unchanged.
deviations from design: Black-to-`#b45f06` after `invert(1)` needs a partial second invert; without it the face stays black. Face is near-flame, ink near-white.
open questions: none

### T-056: Replace v2 sheet cache after successful Save
status: done
source: rewrite-ledger/edit-character.md, 2026-10-03 (design Q2: other fields persist; Redux cache must update)
why: `characterCache[2][id]` keeps the first view GET. Save only `captureLoaded`s. Home hover skips GET when the slot exists, so a revisit shows the pre-Save sheet.
scope: edit adjacency `app/src/pages/v2/hooks/characterHook.tsx` (`saveCharacterToBackend`). Existing `cacheCharacterV2` in `app/src/redux/slices/characterCacheSlice.tsx`. Do not add a reducer. Do not write the cache on keystroke. Do not change `updateCatalogInfo`. Do not import v1 hooks. Do not change v1 cache.
result: T-051 already dispatches `cacheCharacterV2` with `Promise.resolve(data)` after successful Save. Empty-name and failed POST do not. No second dispatch added.
deviations from design: none (step 2 skip).
open questions: none

### T-055: Upsert v2BasicCharacteristics by pageID
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/schema-on-boot.md, 2026-10-03 (design: Yb / Cultural Strength / Discount not saving; Q3 upsert only)
why: Those three drawn fields live only on `v2BasicCharacteristics`. Add/get/save/delete use `pageID`. The snapshot still has `characterid`. `ensureSchema` never adds `pageID`. Save is UPDATE only. `query()` swallows errors and hides `rowCount`, so a missing column or row looks like success and assemble returns `0` / `''` / `0`.
scope: unindexed `backend/server/db/ensureSchema.ts`; unindexed `backend/server/v2/backupTables/page1.sql` (`v2BasicCharacteristics` only); edit primary `backend/server/v2/edit/utilities/pageType1/utilities/saveCharacteristics/utilities/saveBasicCharacteristics.ts`. Do not change `query()`. Do not change frontend updates, Capacity, StrengthNDiscount, or other tables’ `characterid` snapshot columns. Do not fail Save on a missed write.
result: `ensureSchema` adds `pageID`, backfills from `characterid`, unique index, inserts missing page-type-1 rows, fail-closed. Save SELECTs then UPDATE or INSERT. `page1.sql` `v2BasicCharacteristics` uses `pageID`.
deviations from design: none
open questions: none

### T-054: Set attack notes to 12px
status: done
source: rewrite-ledger/page1-view.md, 2026-10-03 (design: Attack Info same size as name input; Q3 font only; Q4 keep box)
why: Notes use the global 15px `character-value`. The attack-name input is 12px. Designer wants Info text at that size only.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Attacks/Attacks.css` (`.attack-notes p` and `textarea`). Do not change `Attacks.tsx`, name input letter-spacing/padding, notes `min-height`/`height` `calc(2 * 17.38px)`, Defenses notes, or `View.css`.
result: `.attacks-v2 .attack-notes p` and `textarea` `font-size: 12px`. Two-line box kept.
deviations from design: none
open questions: none

### T-053: Move attack Damage value onto the Type/Rec row
status: done
source: rewrite-ledger/page1-view.md, 2026-10-03 (design: Damage value down; Q1 label stays; Q2 leftover on Type/Rec row)
why: Row 1 is Meas/Atk/Damage. Row 2 is Type/Rec plus an empty 33%. The designer wants only the Damage value on that leftover. The **Damage** `em` stays on row 1. Meas/Atk stay 33%.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Attacks/Attacks.tsx` and `Attacks.css`. Do not change hooks, payload, `varchar`, notes (T-054), name, Defenses, or `index.css` / `View.css`.
result: First `.attack-row` Damage is `<em>` only. Value `p`/`input` sit in `.attack-damage-value` on the Type/Rec row (`flex: 1; min-width: 0`).
deviations from design: none
open questions: none

### T-052: Warn before leaving unsaved edits
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design Q3)
why: Catalog already updates on general-info keystroke. Leaving without Save would keep that draft name in redux while the DB is old. Warn, then restore catalog from the snapshot if they still leave.
scope: edit adjacency `app/src/pages/v2/V2View.tsx` and/or `app/src/pages/v2/hooks/characterHook.tsx`. Catalog reducer already exists (`updateCatalogInfo`, `index: 1`). Do not add a custom modal. Do not warn on Revert.
result: Dirty is `character !== revertedCharacter`. `beforeunload` while dirty. `useBlocker` + `window.confirm`; confirm restores catalog from the revert snapshot (`index: 1`) then proceeds. Revert does not warn.
deviations from design: `app/src/main.tsx` uses `createBrowserRouter` (`path: '*'`) instead of `BrowserRouter` so `useBlocker` has a data router. Nested `AllRoutes` unchanged.
open questions: none

### T-051: Toast failed or blocked Save; restore draft
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design Q2, Q5)
why: Save click currently sets `isEditing` false and `character` null before POST. Empty name still posts. A thrown axios error leaves the sheet on loading. Failed save is a toast.
scope: root `package.json` (`react-toastify`, same slot as `react-tooltip`); unindexed `app/src/App.tsx` (and `main.tsx` only if CSS import belongs there); edit adjacency `app/src/pages/v2/hooks/characterHook.tsx`; `app/src/pages/v2/V2View.tsx`. Do not change the sidebar button enablement (Q4: v1 — Save stays clickable while editing). Do not add `features/`.
result: `react-toastify` ^11.1.0; `ToastContainer` in `App.tsx`. Empty/whitespace name: no POST, `Name cannot be empty`, stay in edit. POST `data.message` without `pages`, or throw: restore draft, toast, stay in edit. Success: `captureLoaded`, replace v2 `characterCache`, exit edit.
deviations from design: none beyond Order (await success before exiting edit).
open questions: none

### T-050: Coerce empty name to New Character on persist
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design Q2)
why: Empty name is blocked on the client. If a request still arrives with missing or whitespace name, persist `'New Character'` (same string as `v2GeneralInfo.name` default).
scope: edit character primary `backend/server/v2/edit/utilities/pageType1/utilities/saveGeneralInfo.ts` (`saveGeneralInfo`).
result: `name?.trim() ? name : 'New Character'` before the existing `pageID` UPDATE. Ancestry/class/subclass unchanged.
deviations from design: none
open questions: none

### T-049: Lock attack-row view p to empty-edit 17.38
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: shrink view Meas/RI and Type rows to edit; Q1 all five values; Q2 empty-edit 17.38; Q3 keep island; Q4 name and notes stay)
why: T-045 island on `.attack-row p` is `min-height: 17.38` only. Filled 15px `p` line-height 1.2 (18px) plus `padding: 2px` grows the box to ~22px. Empty edit input is `:placeholder-shown { height: 17.38px }`. Designer wants the view row to match that empty-edit box. Do not change the input (filled stays `1.2em` / 18).
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Attacks/Attacks.css` (`.attack-row p` only). Do not change TSX, `View.css`, `index.css`, attack **name**, notes, `.attack-row input`, Defenses, mapped lists.
result: `.attack-row p { height: 17.38px }` only. Island kept. Inputs have no widget height. Browser: view p 17.375; empty edit input 17.375 (delta 0); filled edit 18; name `padding: 2px 4px 0`; notes 34.75. `.page-type-one` offsetHeight and scrollHeight 1068 view and edit.
deviations from design: none beyond Order.
open questions: none


### T-048: Mapped leftover p/input min-height 19.38 via custom property
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: a little height on mapped p/input; Q1 +2px → 19.38; Q2 lists only; Q3 custom property; Q4 stop if 1068 exceeded; Q5 suite-title em matches; revision: attack inputs stay T-045)
why: T-045 locked leftover `p`/`input` at 17.38 border-box. Designer wants +2px on list leftover controls. Attack Meas/Atk/Damage/Type/Rec stay 17.38. View.css `:placeholder-shown { height: 17.38px }` keeps empty insert short unless the widget restates height.
scope: `PageType1.css` (define `--mapped-row-min-height`); `Descriptions.css`; `Flaws.css`; `ReputationDisplay.css`; `Characteristics.css` (emotions); `SocialSuites.css` (`p`/`input`/`em`, not header `h2`). Do not change TSX, `View.css`, `index.css`, Stats, dice, `Attacks.css`, Capacity.
result: `--mapped-row-min-height: 19.38px` on `.page-type-one`. List leftover `p`/`input` and suite-title `em` compute 19.375 (island kept). Leftover p vs insert input delta 0. Header h2 still padding 4px / 21px. `Attacks.css` unchanged (row min 17.38, notes 34.75, name `padding: 2px 4px 0`). Browser: `.page-type-one` offsetHeight 1068 view and edit. View scrollHeight 1084 (16px into card padding); edit scroll 1068.
deviations from design: none beyond Order. 1068 stop is offsetHeight; it stayed 1068 so the bump was kept.
open questions: none



### T-047: Current Emotions cells fill the heading; restore grid lines
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: gaps look terrible; Q1 Current Emotions only; Q3 drop -8px and restore `#bdbdbd` lines; Q4 keep inset)
why: Emotion cells are `width: calc(33.33% - 8px)` in a column-wrap flex with no borders. The heading is full width; leftover cells are invisible white; the T-045 island sits as a short teal chip. T-023 was `repeat(3, 1fr)` with `#bdbdbd` 1px lines.
scope: view character adjacency `Characteristics.css` only. Do not change TSX. Do not change Social Suites, Descriptions, Flaws, Reputation, Attacks, Capacity, `index.css`, `View.css`.
result: `repeat(3, 1fr)` and `#bdbdbd` on cell spans. Island kept on `p`/`input`. Browser view and edit: three cells match Current Emotions `h2` within 1px; leftover borders `rgb(189, 189, 189)` 1px; insert input padding 2px 1px and `content-box` clip; `.page-type-one` 1068.
deviations from design: none beyond Order.
open questions: none



### T-046: Social Suites Stat/Rank tracks and solid header bar
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: Stat/Rank headers misaligned; heading gap not solid; Q1 both header-to-values and left-pane-to-right-pane; Q2 no island on header h2s; Q3 restore h2 padding 4px; Q4 suite-title em keep island; Q5 widen Rank a bit)
why: Header Stat/Rank use `span *` `min-width: 15%` with no `width`, so “Rank” grows and misses the 15% value cells. Left pane `width: 50%` + `border-right: 1px` is content-box, so left/right 15% tracks miss. T-045 `span *` `padding: 2px 1px` + `background-clip: content-box` punches the `#bdbdbd` header bar.
scope: view character adjacency `SocialSuites.css` only. Do not change TSX. Do not change Descriptions, Capacity, Flaws, Reputation, Emotions, Attacks, `index.css`, `View.css`. Do not add a class or shared heading widget.
result: Panes 50% border-box. Tracks 67/15/18 (description 82/18). Header h2 padding 4px, background-clip border-box. Browser view and edit: header Stat/Rank vs title and description Rank within 1px; left Stat/Rank widths match right within 1px; header cells abut; leftover island kept; `.page-type-one` 1068.
deviations from design: none beyond Order (`min-width: 0` on `span *` so 18% Rank is not a floor of 15%).
open questions: none



### T-045: Flush suite borders; island on the control; slim leftover p
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: remove T-044 overflow; Q1 everywhere T-044 applied; Q2 gap between input fill and zebra, no gaps between borders; Q3 keep gap between inputs; Q4/Q5 slim leftover p bloat, Descriptions inner padding consistent)
why: T-044 put `padding: 2px 1px` and `gap: 1px` on the **wrapper**. Suite leftover rows show holes in `#bdbdbd` verticals (padding/gap sit outside the bordered children). Wrapper padding plus child `padding: 4px 4px 0` / Descriptions `padding: 4px` adds to `min-height: 17.38px` (content-box) and overflows `.page-type-one` 1068.
scope: view character adjacency `Characteristics.css` (emotions); `Descriptions.css`; `Flaws.css`; `ReputationDisplay.css`; `SocialSuites.css`; `Attacks.css`. Do not change TSX. Do not change Stats, dice, attack **name**, Capacity, `index.css`, `View.css`. Do not add a shared class.
result: Wrapper padding removed. Island is `padding: 2px 1px` + `background-clip: content-box` (restated `!important` next to mid-teal `background`) on leftover `p`/`input`/`textarea`. Suite `gap` gone; Descriptions/Reputation keep `gap: 1px`. Browser: leftover desc p/input width 168.58, height 17.38 vs 18; suite cells abut; odd-suite clip content-box; attack name `padding: 2px 4px 0` / 326.31 (`calc(100% - 8px)`); `.page-type-one` 1068 view and edit.
deviations from design: none beyond Order (`background-clip: content-box !important` on restated teal so the fill shorthand does not reset clip).
open questions: none



### T-044: Inset mapped and attack non-name controls 2px / 1px
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: Stats-style island; Q1 2px top/bottom 1px sides; Q2 wrapper in view and edit so p and input match; Q3 attack notes inset; Q4 wrap emotions; Q5 suite title inset; Q6 keep suite grid lines; Q7 leftover p too)
why: Mapped list inputs and attack Meas/Atk/Damage/Type/Rec fill the zebra so teal abuts and hides the stripe. Stats already frames the control with wrapper padding. Emotions paint the stripe on the control itself.
scope: view character adjacency `Characteristics.tsx`/`Characteristics.css` (emotion wrap); `Descriptions.css`; `Flaws.css`; `ReputationDisplay.css`; `SocialSuites.css`; `Attacks.tsx`/`Attacks.css` (notes wrap). Stats, dice, attack name unchanged.
result: Wrapper `padding: 2px 1px` and multi-cell `gap: 1px` on maps, leftover `p`, suite title, attack-row, and notes wrap. Emotions cells wrapped in `span`; even-span mid teal. Attack name still `calc(100% - 8px)`. Browser: 2px/1px computed on all listed wrappers; description sibling gaps 1px; leftover desc p/input width 167.80; `.page-type-one` 1068. Superseded for wrapper vs control island and suite `gap` by T-045.
deviations from design: none beyond Order.
open questions: none



### T-043: Descriptions heading as Capacity-at-h2 with matching column widths
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: Descriptions heading like Characteristics but h2; inputs match heading widths; Q1 Descriptions `h2` + Attack/Defense/Rank `h2.minor-heading`; Q2 10px; Q3 first 38%, remaining split equally; Q4 center minors; Q5 copy Capacity flex + % widths; Q6 keep h2 padding 4px and match it on value cells)
why: T-042 header is `h2` Descriptions plus `em` Attack/Defense/Rank with `flex: 1` / `6em` / `28px`. Grey bar eats the Label slot; column labels are not heading cells; value `p`/`input` do not share those tracks (UA input min-width and `width: auto` on the first data cell).
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/descriptions/Descriptions.tsx`; `.../descriptions/Descriptions.css`. Do not change hooks, payload, cap, insert/remove, leftover count, or zebra selector. Do not import `Capacity.css` or Capacity classes. Do not add a global `h2.minor-heading`. Do not change `index.css` or `View.css`. Do not change Flaws, Reputation, Social Suites, Current Emotions, Attacks, or Capacity.
result: Header is `h2` Descriptions plus `h2.minor-heading` Attack/Defense/Rank (10px, centered grey bars). Flex tracks 38/20.6/20.6/20.6; heading vs first leftover/data cell widths match within 0px in view and edit. Odd-span inputs mid teal; `.page-type-one` 1068.
deviations from design: none beyond Order (value-cell padding 4px + border-box; written 20.6%; no row padding).
open questions: none



### T-042: Draw and edit four-field Description rows
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: Q5 header Descriptions | Attack | Defense | Rank; Q6 one line; Q7 insert on any field; Q9 cap 5; Q10 record overflow)
why: Descriptions is one `value` cell via `DisplaySingleArray`. That widget cannot draft four fields. Header is a lone `h2`.
scope: `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`; `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/descriptions/Descriptions.tsx`; `.../descriptions/Descriptions.css`. Do not change `DisplaySingleArray` / `DisplayPairArray`. Do not add a new shared array widget. Do not import v1 `displayArray`. Do not change Flaws, Current Emotions, Reputation, or social-suite rows. Do not change `index.css`.
result: Header Descriptions | Attack | Defense | Rank. One line of four cells; leftover + insert in `Descriptions.tsx`. Insert from any field; clear all four removes the row. Odd-span inputs mid teal; even default. Browser: empty 5 leftovers; insert label and attack; Revert restores; `.page-type-one` 1068.
deviations from design: none
open questions: none

### T-041: Persist Description label, emotions, and player rank
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/schema-on-boot.md, rewrite-ledger/edit-character.md, 2026-10-02 (design: Descriptions four fields; Q1 names `label` / `attackEmotion` / `defenseEmotion` / `rank`; Q2 copy `value` → `label`; Q3 player-facing rank; Q4/Q8 emotions varchar(25) free text; label varchar(500))
why: `Description` is `{ id, value }`. `saveDescriptions` writes the array index into `rank`. The row is four stored fields; `rank` is the drawn number.
scope: `backend/common/interfaces/v2/page1/characteristicsInfo.ts` (`Description`); `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page1.sql`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/utilities/getDescriptions.ts`; `backend/server/v2/edit/utilities/pageType1/utilities/saveCharacteristics/utilities/saveDescriptions.ts`. Do not change `addCharacteristics` (no description rows on create). Do not change delete. Do not change Current Emotions, suite description tables, Flaws, or v1 `cvdescriptions`. Path sits under existing YAML view/edit adjacent `backend/common/interfaces/v2/` and unindexed `ensureSchema` / `backupTables`; no new routing key.
result: `Description` is `label` / `attackEmotion` / `defenseEmotion` / `rank`. `ensureSchema` copies `value` → `label` then drops `value`; emotions varchar(25). get maps pg lowercase; save writes player rank (empty → NULL), never the array index.
deviations from design: Drop `value` after copy (same pattern as `currentEmotions` on basic characteristics). Empty rank persists as NULL, not 0.
open questions: none

### T-040: Stripe odd die cells with the darker teal
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: Q6 stripe die color, do not touch Anointed)
why: T-035 filled every edit die `<p>` with the same teal. Odd dice should use the darker mid teal; even dice stay default.
scope: `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css` (existing `.v2 .view-edit .vitals-v2 .die-row p`). Do not change `Vitals.tsx`, die PNGs, `dieIndex` click, selected outline. Do not change `Favor.css` / Anointed. Do not add selectors to `index.css`.
result: Odd die `p:nth-of-type(odd)` rest `rgb(159, 199, 212)`; even keep default teal; hover on all `rgb(145, 181, 194)`. Anointed CSS unchanged. Browser: 9/9 odd/even split; hover both `rgb(145, 181, 194)`; Anointed default teal; view dice untinted; die-row tops unchanged.
deviations from design: `nth-of-type(odd)` instead of `nth-child(odd)` because the Die h2 is the first child.
open questions: none

### T-039: Darker teal on attack name and striped map inputs
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: darker attack-name and odd-row fills; Q1 mid teal `rgb(159, 199, 212)`; Q2 all maps; Q3 include emotions even; Q4 attack name only; Q5 even-row default teal stays)
why: Global `.view-edit input` teal `rgba(173, 216, 230)` is too light on the attack-name slot and on `#f3f3f3` zebra rows.
scope: view character adjacency, widget CSS only: `app/src/pages/v2/pageTypes/pageType1/components/Attacks/Attacks.css`; `.../descriptions/Descriptions.css`; `.../flaws/Flaws.css`; `.../reputation/ReputationDisplay.css`; `.../socialSuites/SocialSuites.css`; `.../Stats/Stats.css`; `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.css` (emotions). Do not change TSX. Do not change `index.css`. Do not change view `#f3f3f3` / `#bdbdbd`. Do not restyle attack Meas/Atk/Damage/Type/Rec/notes. Do not touch Anointed or die CSS (T-040).
result: Attack name and `#f3f3f3` map-slot inputs rest `rgb(159, 199, 212)` with hover restated `rgb(145, 181, 194)`. Even/white-row inputs stay default teal. Attack non-name fields untouched. Browser: four attack names mid; 20 attack-row inputs default; descriptions/stats/emotions grey slots mid; name hover `rgb(145, 181, 194)`; view `#f3f3f3` unchanged.
deviations from design: none (parity follows live `#f3f3f3` selectors, including h2 offset).
open questions: none


### T-038: Edit Emotional Capacity through the Yb cell
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: edit Yb; Q1 value only; Q2 `≤` stays chrome; Q3 empty → 0)
why: Yb is `≤${capacity}` — the stored number. Bands were all text; there is no `updateCapacity`.
scope: `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/capacity/Capacity.tsx`; `Capacity.css`; `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.tsx` (pass `pageID` / `updates`); `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `getV2Updates.ts`; `hooks/interfaces/UpdateInterfaces.ts`. Do not change `saveBasicCharacteristics.ts` (already writes `capacity`). Do not swap Na / N / Nb / Y / Ya. Do not add a raw capacity label. Do not edit Trauma or CrP `toLvl`.
result: `updateCapacity` writes `characteristicsInfo.capacity`. Edit Yb is `≤` chrome plus a number input; view stays one `p` `≤${capacity}`. Empty/invalid → 0. Na/N/Nb/Y/Ya stay text. Browser: 8→10 updates Nb/Y/Ya (≤5 / ≤15 / >15), Na stays `<0`; clear → 0; Revert restores ≤8; capacity row height unchanged.
deviations from design: none
open questions: none

### T-037: Draw defense name in the empty header h2 slot
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/page1-view.md, 2026-10-02 (design: name under Input; Q7 replace empty h2; Q8 keep header height)
why: `Defense.name` is assembled and saved (`saveDefenses` already `set name = $1`) but `Defenses.tsx` omits it. The left header span is `<h1>Defenses</h1><h2></h2>`.
scope: `app/src/pages/v2/pageTypes/pageType1/components/Defenses/Defenses.tsx`; `Defenses.css`. Do not change `saveDefenses.ts`. Do not add a third header row or a visible **Input** `em`. Do not change notes.
result: Empty `<h2>` replaced with name `p`/`input`. Initiative 23px/border rules narrowed to `span:last-child`. Name 15px Kalam, 17.38px, no extra border. `saveDefenses` unchanged. Browser: name under **Defenses**; header height 43.59 view and edit; Initiative 23px; Revert restores `''`.
deviations from design: the word **Input** is not drawn as a caption (Q7+Q8: name fills the existing slot, no extra line).
open questions: none

### T-036: Persist and draw Favor divineRelationship
status: done
source: rewrite-ledger/edit-character.md, rewrite-ledger/schema-on-boot.md, 2026-10-02 (design: string under Divine prompt; Q4 `divineRelationship`; Q5 varchar 500; Q6 like notes)
why: The prompt is chrome. There is no stored answer. Favor is `{ anointed, current, max }` only.
scope: `backend/common/interfaces/v2/page1/favor.ts`; `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page1.sql`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getFavor.ts`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/assemblePageType1.ts` (skeleton default); `backend/server/v2/edit/utilities/pageType1/utilities/saveFavor.ts`; `app/src/pages/v2/pageTypes/pageType1/components/Favor/` (`Favor.tsx`, `Favor.css`). `updateFavor` already takes `Partial<Favor>` — no new hook function. Do not change `addFavor` insert beyond table default. Do not reuse relationships / descriptions / notes. Path sits under existing YAML adjacent `app/src/pages/v2/` and unindexed `ensureSchema` / `backupTables`; no new routing key.
result: `Favor.divineRelationship` string; `ensureSchema` `ADD COLUMN IF NOT EXISTS` varchar(500) fail-closed on `divinerelationship`; `getFavor` maps pg lowercase; `saveFavor` writes it. Left column: italic prompt plus notes-style `p`/`textarea`. Browser: empty cell is two lines (34.76px); typed text wraps; Revert restores `''`. `.page-type-one` stayed 1068.
deviations from design: none
open questions: none

### T-035: Teal-tint die cells and Anointed in edit
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: edit teal; Q1 all dice; Q2 darker hover; Q3 Anointed same teal)
why: `.view-edit` fills `input` / `textarea` / `button` / `.fake-button` with `rgba(173, 216, 230)` and hover `rgb(145, 181, 194)`. Die cells are `<p>` and Anointed is a `<span>`, so they stay grey.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.css` (existing `.v2 .view-edit .vitals-v2 .die-row p`); `.../Favor/Favor.css` (existing `.v2 .view-edit .favor-v2 .anointed-box`). Do not change `Vitals.tsx` / `Favor.tsx` structure, die PNGs, `dieIndex` click, or Anointed click. Do not add `fake-button`. Do not wrap dice in `<input>` or `<button>`. Do not `filter` the PNGs. Do not add selectors to `index.css`.
result: `.view-edit` die `<p>` and unchecked Anointed use teal `rgba(173, 216, 230)` and hover `rgb(145, 181, 194)` with `!important`. Checked Anointed stays black including hover. No `fake-button`. Cursor rules kept. Browser: 18 die cells teal in edit, transparent in view; selected outline `2px solid black`; die-row tops unchanged on toggle.
deviations from design: none
open questions: none

### T-034: Insert, update, and clear list rows; wire the widgets
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: v1 array edit; Q1–Q6)
why: `padTo` + `[...Array(max)]` writes empty `{ id: 0 }` rows. v1 keeps only real rows, inserts on blur, removes a row whose fields are cleared.
scope: `backend/common/interfaces/v2/page1/characteristicsInfo.ts` (`Emotion`, `Description`, `Flaw`, `CharacteristicPair`); `backend/common/interfaces/v2/pairInterfaces.ts` (`SkillPair`); `app/src/pages/v2/hooks/updates/pageType1Updates.ts`; `app/src/pages/v2/hooks/updates/getV2Updates.ts`; `app/src/pages/v2/hooks/interfaces/UpdateInterfaces.ts`; `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.tsx` (emotions); `.../descriptions/Descriptions.tsx`; `.../flaws/Flaws.tsx`; `.../reputation/ReputationDisplay.tsx`; `.../socialSuites/components/SocialSuite.tsx`. Do not change Attacks. Do not change backend save SQL (already delete-not-in-ids / update-if-id / insert-if-falsy-id). Caps: emotions 6, descriptions 5, flaws 3, reputations 3, suite description rows 6.
result: `padTo` gone. Five `insert*` append `{ id: 0, key }`. `update*` maps by index and filters empty rows. Call sites pass stored arrays into T-033 widgets. Attacks still four indexed slots. Caps 6/5/3/3/6.
deviations from design: `SkillPair.rank` is `number | ''` so an empty number input is not stored as `0`. Pair `updateReputation` / `updateSocialSuiteDescription` take the full next row (one `apply` per keystroke) instead of `(index, field, value)`.
open questions: none

### T-033: Add v2 DisplaySingleArray and DisplayPairArray
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: v1 array edit; Q1 everything but attacks; Q7 shared widget)
why: v1 list edit is leftover pads plus one extra insert row. v2 always maps `[...Array(max)]`. The shared widgets belong on the v2 view slice, not a new feature folder and not an import of v1.
scope: new `app/src/pages/v2/components/displayArray/` (`DisplaySingleArray.tsx`, `DisplayPairArray.tsx`; optional small CSS only if a class the call site does not already own is required). Do not add files under `app/src/pages/v1/` or `app/src/features/`. Do not import `app/src/pages/v1/components/displayArray`. Path sits under existing YAML adjacent `app/src/pages/v2/`; no new routing key.
result: Widgets on the v2 slice copy leftover + insert-row mechanics, read v2 `EditingContext`, use `makeTempID` for insert keys, and return a fragment. Call sites supply chrome via render props. Wired in the same Execute as T-034.
deviations from design: leftover cells are call-site chrome (empty `span` / `p` / `span.description-row`), not v1’s bare leftover `<p>`, so suite grid lines and emotion 3×2 cells stay. Pair insert remounts via `insertReset` so both uncontrolled fields clear.
open questions: none


### T-032: Restore view boxes; size edit controls only
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: revert T-031 display-side metrics; Q1 empty/filled match via `:placeholder-shown`)
why: T-031 changed view `p`/`h2` and column wrappers (min-height 18px, rank width 28px, suite `p` width 15%, Discount width 42%) so inputs would match. Display must stay at T-029/T-020. Only the control is adjusted. Empty 15px `p` is 17.38px and filled is 18px; a single input `height` cannot match both.
scope: view character adjacency `app/src/pages/View.css`; page-type-1 widget CSS under `app/src/pages/v2/pageTypes/pageType1/` (Attacks, Defenses, Vitals, Favor, GeneralInfo, Stats, Characteristics, SocialSuites, Reputation, Descriptions, Flaws, StrengthNDiscount); swapped `input`/`textarea` in those widgets’ TSX (`placeholder=" "` only). Do not change `index.css` `p` / `p.border`. View-mode baseline for widget CSS is commit `b86b4c6` (T-029, before T-031).
result: Display CSS restored to T-029. `:where` keeps UA reset; filled 15px inputs `height: 1.2em`, empty `:placeholder-shown` `17.38px`, `placeholder=" "` on swapped controls. Input-only copies for attack-name, notes, rank, suites, Flaws, Strength/Discount. `.page-type-one` 1068 both sides. Attack-name input Kalam 12px, not `#bdbdbd`.
deviations from design: Strength/Discount inputs use `width: 0` plus the existing pair `min-width` (not `min-width: 0` / `flex: 1`) so the number cannot grow the row. Discount number is ~4px left / 1px narrower than the overflowing view `p`. Flaws `p` stays shrink-to-content; input is `width: 100%` (step 3) so width cannot match. `:where` also sets `font-size: 15px` / `line-height: 1.2` so `1.2em` is 18px.
open questions: none

### T-031: Match edit inputs to display-tag boxes
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02 (design: inputs match display tags; Q1 everything / no move on toggle; Q2 attack name Kalam; Q3 strip number UA padding)
why: T-029 swapped stored cells to inputs. Global `.v2 input.character-value` `font-size: 15px`, `width: 100%`, `min-height: 17.38px` plus UA input padding reflow the sheet on Edit.
scope: view character adjacency `app/src/pages/View.css`; page-type-1 widget CSS under `app/src/pages/v2/pageTypes/pageType1/` that sizes swapped `p`/`h2` (Attacks, Defenses, Vitals, Favor, GeneralInfo, Stats, Characteristics, SocialSuites, Reputation, Descriptions, Flaws, StrengthNDiscount). Do not change TSX structure, computed cells, or `index.css` `p` / `p.border` display metrics.
result: View.css input UA reset via `:where` (no global 15px/100%/17.38px). Widget pairs copy display boxes. Attack name Kalam 12px, not grey fill. 144 `.character-value` rects match within 1px on Edit; `.page-type-one` height 1068 both sides.
deviations from design: Empty 15px pads use min-height 18px (line-height 1.2) so empty `p` matches the input line box. Notes textarea sets `height: calc(2 * 17.38px)` to crush UA `rows`. Discount column width 42% so number min-content cannot grow the row.
open questions: none

### T-027: Add v2 edit-mode chrome
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02
why: v1 session starts with a side Edit button, `EditingContext`, and `view-edit`. v2 has a sidebar stub and no mode.
scope: view character adjacency `app/src/pages/v2/` (`V2View.tsx`; new `contexts/EditingContext.tsx`; new `components/sidebar/Sidebar.tsx` + `Sidebar.css`).
result: v2 `EditingContext`, `.version-two-shell` flex sidebar, Edit gated on `ownsThisCharacter`, Save/Revert while editing, `view-edit` on the page shell. No Download/Pregen/Quick Edit.
deviations from design: none
open questions: none

### T-028: Local v2 updates, revert snapshot, and save POST
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02
why: v1 keeps a character in the hook, mutates it while editing, POSTs the whole object, and Reverts to a snapshot. v2 hook only loads.
scope: `app/src/pages/v2/hooks/characterHook.tsx`; new helpers under `app/src/pages/v2/hooks/`. Gitignored `frontend-config.ts` (`editV2URL`).
result: Snapshot set only in `captureLoaded` (load + after save). Field helpers call `setCharacter` only. POST `editV2URL + id`. Catalog `index: 1` on general-info change. New list rows use `id: 0`.
deviations from design: `frontend-config.ts` was absent here. A local gitignored stub with `editV2URL` was created so tsc could run. The real config still needs `export const editV2URL` beside `viewV2URL`.
open questions: none

### T-029: Swap page-type-1 stored cells to inputs
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02
why: Edit must toggle every stored drawn cell. Computed and static chrome stay display.
scope: view character adjacency under `app/src/pages/v2/pageTypes/pageType1/`.
result: Stored drawn cells swap to controlled `character-value` inputs (notes: textarea). Anointed click-toggles. Die click sets `dieIndex` to `index+1` or `0`. `toLvl`, Trauma, capacity bands stay text. Defense `name` undrawn.
deviations from design: none
open questions: none

### T-030: Add backend v2 edit owner and persist page type 1
status: done
source: rewrite-ledger/edit-character.md, 2026-10-02
why: v1 POSTs the full character to `/edit/:id`, checks owner, writes, reassembles. v2 has no edit owner. New files only.
scope: new `backend/server/v2/edit/`; `backend/server/vault.ts`; `00-START-HERE.yaml`.
result: POST `/v2/edit/:characterID`. Owner check via `getCharacterOwnerID`. Page-type-1 save tree keyed by `pageID`. L1 route added. Reassemble through existing `getV2Character`.
deviations from design: none
open questions: none

### T-025: Load Kalam Regular and define `.character-value`
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: Kalam for character values)
why: Character-object fill-ins must use Kalam 400. Form chrome stays HamletOrNot / oldClaude / Source Sans 3.
scope: unindexed `app/src/index.css`; view character adjacency `app/src/pages/View.css`.
result: Google `@import` includes `family=Kalam:wght@400`. `.v2 .character-value` sets `'Kalam', cursive`. No 300/700, no Fontsource.
deviations from design: selector is `.v2 .character-value` (Order) so attack-name `h2` is not kept on oldClaude.
open questions: none

### T-026: Mark interpolated v2 sheet values with `character-value`
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: Kalam for character values)
why: Q4-B: a class on each interpolated node, not all `p`. Q1-B: every v2 sheet page, including existing off-page-1 interpolations.
scope: view character adjacency under `app/src/pages/v2/pageTypes/pageType1/`.
result: `character-value` on listed interpolations (including Temperaments, Movement speeds, Relationships). Positions, die `<img>` cells, `p.slash`, slash spans, Anointed, v1, home unmarked. GeneralInfo has 8 fields (name through toLvl). Browser: name/stat/attackName/notes `Kalam, cursive`; labels `oldClaude`; slash/Positions/dieCell Source Sans 3; `kalamLoaded=true`. `.page-type-one` height=1068 scroll=1073 `overflow=true` (5px). No compression.
deviations from design: none. Order done-check counted GeneralInfo as 7; steps listed 8 interpolations — implemented 8.
open questions: none

### T-024: Draw unlabeled two-line notes under Defense and each Attack
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: attack and defense special info)
why: `notes` is already on the payload. The view omits it. Design: unlabeled string below each block’s stats, two value-cell lines minimum, wrap and grow.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Defenses/` (`Defenses.tsx`, `Defenses.css`) and `.../Attacks/` (`Attacks.tsx`, `Attacks.css`).
result: Unlabeled `notes` under Defense and each of four Attacks. `min-height: calc(2 * 17.38px)` (browser 34.76px). Wrap and grow. Defense `name` still hidden. Empty sheet `.page-type-one` 1068px, `overflow=false`.
deviations from design: none
open questions: none

### T-022: Store Current Emotions as a six-slot child table
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/schema-on-boot.md, 2026-10-01 (design: Current Emotions six-cell grid)
why: T-013 stored one varchar on `v2BasicCharacteristics`. Design: child table of `{ id, value }` rows, old string in rank 0.
scope: view character `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `getCharacteristicsInfo.ts`; `getBasicCharacteristics.ts`; `assemblePageType1.ts` skeleton; new `getCurrentEmotions.ts` beside `getDescriptions.ts`; delete character `deleteCharacteristics.ts` + new `deleteCurrentEmotions.ts`; boot `backend/server/db/ensureSchema.ts`; unindexed `backupTables/page1.sql`.
result: Payload is `Emotion[]`. Table `v2currentEmotions`. Assemble via `getCurrentEmotions` ordered by rank. Old varchar copied to rank 0 then dropped. Delete path added. Live postgres still needs a server restart for `ensureSchema`.
deviations from design: none beyond Order (`rank` as slot; empty varchars not inserted; `pageID` not `characterid`).
open questions: none

### T-023: Draw Current Emotions as a 3×2 Social Suite–style grid
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: Current Emotions six-cell grid)
why: The view still paints one string in `.line-shell`. Design: six unlabeled cells, 3 columns × 2 rows, Social Suite grid lines.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/` (`Characteristics.tsx`, `Characteristics.css`).
result: Heading Current Emotions. Six unlabeled `p`s in `repeat(3, 1fr)`, padded from `currentEmotions ?? []`. `#bdbdbd` 1px borders, min-height 17.38px. `.line-shell` removed. Browser: empty and filled 3×2 grids; `.page-type-one` 1068px, `overflow=false`; Favor stays on the card.
deviations from design: none
open questions: none

### T-021: Replace Vitals Die labels with polyhedral PNGs
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (design: vitals die glyphs)
why: Doom, Damage, and Stress still paint `d4`…`d20` text. Design: those six cells show the attached die PNGs.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/` (`Vitals.tsx` `DieRow`; `Vitals.css`); unindexed `app/src/assets/images/` (same slot as `bonfire-wordmark.png`). Do not change `dieIndex` storage, assemble, or v1 Integrity `d4!` copy.
result: Die cells are `d4.png`…`d20.png` with `alt` d4–d20. Grey boxes kept. Selected is Positions outline, not fill. `dieIndex` 0 still draws all six. v1 `d4!` untouched. Browser: `.page-type-one` 1068px (1036 + card padding), `overflow=false`; Attacks stay on the card.
deviations from design: none beyond Order (Positions 2px outline; no glyph shrink).
open questions: none

### T-019: Remove extra Favor boxes and Attack/Defense underlines
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Those decorations are not on the blank sheet.
scope: `Attacks.css`, `Defenses.css`, `Favor.css`
result: Attack and Defense value underlines removed. Favor number and anointed outline boxes removed. Anointed checked fill and Favor left divider kept.
deviations from design: none
open questions: none

### T-020: Give page-type-1 value cells a one-line min-height
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Empty value cells collapse. Height must come from min-height, not from T-019 chrome.
scope: page-type-1 component CSS value cells
result: Value `p`s and empty attack `h2` names use `min-height: 17.38px`. Capacity slash unset. `PageType1.css` heading `h1` still 14px.
deviations from design: unused `Relationships.css` still has `min-height: 14px` (Relationships is not on this page).
open questions: none


### T-016: Treat missing descriptions as an empty list
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01 (view crash)
why: `DescriptionsDisplay` calls `descriptions.map`. A viewed character can omit the key.
scope: `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/descriptions/Descriptions.tsx`
result: Maps and pads from `const rows = descriptions ?? []`. No convictions fallback.
deviations from design: none
open questions: none

### T-017: Apply schema on boot and rename convictions to descriptions
status: done
source: rewrite-ledger/schema-on-boot.md, rewrite-ledger/page1-view.md, 2026-10-01
why: Live DB never received T-013/T-014 DDL. Descriptions is the convictions store renamed.
scope: `backend/server/db/ensureSchema.ts`; `vault.ts`; `backupTables/page1.sql`; v2 characteristics assemble/delete; `characteristicsInfo.ts`.
result: `start()` awaits `ensureSchema` before listen. `currentEmotions` added if missing. `v2convictions` renamed to `v2descriptions` (drop empty T-014 table if both exist). v2 payload has `descriptions` only. `getConvictions` / `deleteConvictions` removed.
deviations from design: `query()` swallows errors; script verifies `information_schema` and throws if a patch did not land.
open questions: none

### T-018: Rename v2 social-suite keys and description tables
status: done
source: rewrite-ledger/page1-view.md, rewrite-ledger/schema-on-boot.md, 2026-10-01
why: Labels already changed (T-012). Storage keys and description tables were still empathize / lecture / tempt.
scope: `ensureSchema.ts`; `getSocialSuites.ts`; `deleteSocialSuites.ts`; `SocialSuites.tsx`; assemble skeletons; `backupTables/page1.sql`.
result: Keys and tables are influence / inform / inspire / intimidate. `suiteID` 1–4 unchanged.
deviations from design: none
open questions: none


### T-012: Relabel and reorder page-type-1 social suites
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Sheet labels are Influence / Inform / Inspire / Intimidate. The view still draws Empathize / Lecture / Intimidate / Tempt.
scope: view character sheet adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/components/socialSuites/SocialSuites.tsx`. Do not rename `SocialSkillSuites` keys, `suiteID` values, or `v2*Descriptions` tables.
result: Labels are Influence / Inform then Inspire / Intimidate. Payload keys and suiteIDs unchanged.
deviations from design: none
open questions: none

### T-013: Bind Current Emotions to a new basic-characteristics string
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Current Emotions is three empty lines. Design: new stored field, one string.
scope: view character `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/` (`getBasicCharacteristics.ts`, `getCharacteristicsInfo.ts`); `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `assemblePageType1.ts` skeleton; view adjacency `app/src/pages/v2/pageTypes/pageType1/components/Characteristics/Characteristics.tsx`; unindexed schema snapshot `backend/server/v2/backupTables/page1.sql`.
result: `currentEmotions` is on the interface, assemble path, and one bound line in the view. Column recorded in `backupTables/page1.sql`.
deviations from design: live ALTER not applied; this environment has no `server-config` / postgres.
open questions: none

### T-014: Bind Descriptions to a new stored list
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Descriptions currently maps `convictions`. Design: a new stored field, not convictions, goals, or relationships.
scope: view character `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `getCharacteristicsInfo.ts`; `getDescriptions.ts`; `assemblePageType1.ts`; `Descriptions.tsx`; `Characteristics.tsx`; delete character `deleteDescriptions.ts`; `backupTables/page1.sql`.
result: Descriptions bind `descriptions`. `getDescriptions` / `deleteDescriptions` added. Convictions stay on the payload and are not drawn. Table recorded in `backupTables/page1.sql`.
deviations from design: list shape `{ id, value }[]` padded to 5 taken from the existing widget. Live CREATE not applied; no postgres in this environment.
open questions: none

### T-015: Draw no die selection when dieIndex is 0
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: `DieRow` treats `dieIndex` 0 as d4 (`index === dieIndex`). Design: 0 is no selection. Defaults and empty vitals already store 0.
scope: view character adjacency `app/src/pages/v2/pageTypes/pageType1/components/Vitals/Vitals.tsx` (`DieRow` only).
result: `selected` only when `dieIndex > 0 && (dieIndex - 1) === index`. Defaults stay 0.
deviations from design: 1–6 → d4–d20 as recorded on `page1-view.md`.
open questions: none


### T-009: Lay out page-type-1 left column to match the blank sheet
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Left column was a partial stack (general info, stats, characteristics including Goals/Temperaments/Relationships, movement). The sheet’s left column is Name through Favor.
scope: `app/src/pages/v2/pageTypes/pageType1/` (view character sheet adjacency): `PageType1.tsx`, `GeneralInfo/`, `Stats/`, `Characteristics/` (capacity, social suites, reputation, strengthNDiscount, descriptions, flaws), `Favor/`.
result: Left column order is Name through Favor. Cultural Strength kept. Goals/Temperaments/Relationships/Movement not imported on this page. Current Emotions is empty lines; Descriptions bind to convictions. Suite names left as Empathize/Lecture/Intimidate/Tempt.
deviations from design: none (verified the premature execute against the steps)
open questions: Social suite display names; Current Emotions vs goals; Descriptions vs convictions.

### T-010: Lay out page-type-1 right column to match the blank sheet
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Right column was a placeholder (`Right`). The sheet’s right column is Positions, Doom, Damage, Stress, Defenses, Attacks. The designer added a Bonfire wordmark at the top of that column, which the blank PDF does not have.
scope: `app/src/pages/v2/pageTypes/pageType1/`; `app/src/assets/images/bonfire-wordmark.png`.
result: Wordmark mounted first in the right column. Positions, vitals, defenses, and four attacks follow. Spacing tightened. Measured `.page-type-one` at 1068px (1036 content + 16px card padding); right-column content ended at ~788px, no overflow.
deviations from design: none
open questions: dieIndex 0 as d4 vs unset; whether to draw defense name/notes and attack notes.

### T-011: Assign basic characteristics onto the page-type-1 payload
status: done
source: rewrite-ledger/page1-view.md, 2026-10-01
why: `getCharacteristicsInfo` discarded `getBasicCharacteristics`’s return, so capacity, Cultural Strength, social skill discount, and temperaments never reached the view.
scope: `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/getCharacteristicsInfo.ts`
result: Assigns capacity, culturalStrength, socialSkillDiscount, and temperaments in place. Spread-return pattern has 0 hits.
deviations from design: none
open questions: none


### T-008: Split nested view folder into two FSD page slices
status: done
source: rewrite-ledger/fsd-colocation.md, 2026-10-01
why: Designer chose two view page slices, not one nested view folder with v1/v2 inside.
scope: former nested view folder under `app/src/pages/`; `app/src/routes/AllRoutes.tsx`; `00-START-HERE.yaml` view routing keys. Home slice and backend paths unchanged.
result: `git mv` to `app/src/pages/v1` and `app/src/pages/v2`. `View.css` is `app/src/pages/View.css`, imported by both slices. Home and create-character paths unchanged. No `app/src/app`, `widgets/`, `features/`, `entities/`, or `shared/` created. Backend unmoved.
deviations from design: Slice names `v1`/`v2` taken from observed folders because execute was ordered while names were unset. `View.css` kept as a sibling of both slices rather than creating `shared/`.
open questions: none

### T-005: Add AGENTS.md as agent entry to L1 and the ledger
status: done
source: recorded gap “no AGENTS.md”; session 2026-10-01
why: Agents must route through root panels instead of scanning.
scope: `AGENTS.md`; `00-START-HERE.md` / `.yaml`; `rewrite-ledger/00-START-HERE.md` / `.yaml`.
result: `AGENTS.md` points at L1, vocabulary, ledger, unindexed rule, and FSD-later. Gap removed.
deviations from design: AGENTS.md does not route CODE-LAYOUT-STANDARD as current tree law; designer adopted FSD for a later transformation.

### T-006: Tighten L1 from unindexed misses
status: done
source: index next-steps 2026-10-01 item 3
why: Files that implement an accepted objective were listed unindexed (home rows, header, v1 widgets, contracts, SQL).
scope: `00-START-HERE.yaml` `routing` and `unindexed`.
result: Promoted home row display, header, App login bootstrap, v1 displayArray/textArea, view/home CSS, v1/v2 interfaces, v1 dictionaries, and v1 query SQL onto existing features. Remaining unindexed is shell/machinery (38 files). Completeness still holds.
deviations from design: none

### T-007: Context-loss review for L2/L3
status: done
source: anne-index applying-to-code; session 2026-10-01 item 4
why: L2/L3 only if a miss the front panel cannot carry.
scope: `rewrite-ledger/l2-l3-deferred.md`
result: No such miss after T-006. L2/L3 not added. Format remains unset.
deviations from design: none


### T-003: Completeness pass excluding dist/
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: An unrouted source file is an index gap. Generated `dist/` is excluded by decision.
scope: `00-START-HERE.yaml` `unindexed`; source under `app/src`, `backend/`, `replaceScripts/`.
result: 372 source files are either under a routing primary/adjacent path or named in `unindexed`. Mechanisms (redux, db, vault.ts, replaceScripts, common contracts) listed unindexed; no new features invented. `dist/` is in excludes and not a routing target.
deviations from design: none
open questions: none (mechanisms listed unindexed as specified)

### T-002: Map each accepted feature to backend primary and frontend adjacency
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: Index-in-place needs current paths. Backend is primary when the feature spans surfaces.
scope: `00-START-HERE.yaml` `routing`.
result: Twelve inventory rows mapped. PDF has no backend; primary is now `app/src/pages/v1/hooks/utilities/downloadUtilities.ts` (path updated by T-008). Create character maps to `backend/server/v2/add/`.
deviations from design: download v1 PDF primary is frontend-only (no backend path).

### T-004: Remove HomeController.addCharacter
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30 (v1 create permanently excluded)
why: v1 will never add characters. `HomeController.addCharacter` inserts into `cvcharactermain` and is not mounted. It is not the v2 Create character path.
scope: `backend/server/controllers/home/HomeController.ts`; `backend/server/v1/queries/home.ts`.
result: Deleted `addCharacter` and unused imports from HomeController. Removed `insertCharacter` and `characterCount` SQL. Home GET/DELETE and v2 add path unchanged.
deviations from design: none

### T-001: Add repository front panels that own the feature index
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: L1 for the repo does not exist. The feature index lives on the root panels, not in the ledger.
scope: `00-START-HERE.md` and `00-START-HERE.yaml` at repo root (now the navigation owner).
result: Root panels added. YAML routing keys match the accepted inventory plus aliases; `primary`/`adjacent` left empty for T-002. No v1 create-character key. Vocabulary lives on the repo human panel. Ledger routes L1 to the root YAML.
deviations from design: none

