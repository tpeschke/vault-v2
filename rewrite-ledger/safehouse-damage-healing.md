# Safehouse Damage Healing page
status: accepted   date: 2026-11-02

Decision: Safehouse page type 2 is the Damage Healing sheet. `pageTypeID` 2 in `safehousePages`. It is not a character `pageTypeID` and it is not the second page of the uploaded PDF. The sheet card is the safehouse page (letter box, `v2` type, gutter, save, download). The body is **NPCs** and **Resources**, the Abilities pane’s lined box, both play-time. A new safehouse gets one at index 1. `/s/blank` shows it after the Functions page. Existing safehouses are not backfilled.

Why: The designer refused a second page type taken from that PDF, then named this page on 2026-11-02. **+ Safehouse** becomes **+ Functions**. This page’s gutter label is **+ Damage Healing**. The designer does not care whether saved safehouses gain it, so they are left alone. Both strings are play-time. The band count fills the letter page. The headings are **NPCs** and **Resources**.

Constraints it imposes:
- Canonical for this page. Functions stays `safehouse.md`. Do not copy the PDF’s sections, the Functions header, the Functions lists, or the Functions footer onto this card. No wordmark on this card (the wordmark sits in the Functions header). No second copy of Safehouse Name, Location, or C Rank Limit.
- Root `.page.card.page-type-safehouse-damage` inside the existing `safehouse-shell` (that shell already has class `v2`). Border box stays 816×1056 (`v2-page-type.md`). Do not set `page-type-safehouse` on this card. Do not grow the box. Do not shrink Functions to make room.
- Body, left to right: **NPCs**, **Resources**. Reuse `DoubleColumn`. The 15px gap is scoped to this page. Do not edit `DoubleColumn.css`. Do not import `NotesPanes`. Page-local panes.
- Each pane: chrome `h1` (`.v2 h1`, HamletOrNot), then one string. Always a `textarea.character-value`, in view and in edit. Not a view `p`. Not a row list. Cap 1350 (`textarea-limits.md`), keys `safehouseNpcs` and `safehouseResources` on `textareaCaps`, both the default. Column type `text`. Browser `maxLength` plus the shared clamp. `holdTextareaScroll`. Server refuses an over-cap write with the existing safehouse sentence `Text is too long`. Do not slice the write. `string.length` is not the counter.
- Bands: both textareas `min-height` and `max-height` `calc(57 * 17.38px)`. Pitch 17.38px, first band white, `#fff` / `#f3f3f3`, `repeating-linear-gradient`, `background-attachment: local`. Text 15px, line-height 1.2. `overflow: hidden`. Do not scroll. Do not grow. 57 is the fill: `57 * 17.38` is 990.66, and a `.v2 h1` border box of up to 33px still sits inside the 1024px content box. Do not use Abilities’ 19. If 57 makes the `.page` border box something other than 816×1056, stop and report. Do not pick another count.
- Wash, copied from Contacts (`page3-view.md`), because this textarea is play-time and Abilities’ view `p` is not. Plain view rest is the unwashed zebra. Plain view hover stacks `rgba(145, 181, 194, 0.35)` on it. In `.view-edit` and `.view-quick-edit`, rest is `rgba(173, 216, 230, 0.35)` and hover is `rgba(145, 181, 194, 0.35)`, each over the zebra. Beat `index.css` solid textarea fills. The stripes stay visible. Blank ink is empty. On the blank the textarea is read-only and does not POST.
- Play-time: blur POSTs when `pageID > 0`, the viewer owns the safehouse, and Edit is off. While editing, blur does not POST; full Save writes both strings. Attributes `safehouseNpcs` and `safehouseResources`. The value is the string. The body is still `{ pageID, attribute, value }`. Each attribute updates that one column and only a `pageTypeID` 2 row of this safehouse. Function and footer attributes still require `pageTypeID` 1. Quick view is the existing safehouse toggle. It highlights these two textareas. No new sidebar button. The Functions header stays Save-only.
- Store: `safehousePage2`, primary key `pageID`, `npcs text not null default ''`, `resources text not null default ''`. No child table. Applied from `ensureSchema` `createSafehouseTables` and `backend/server/safehouse/safehouse.sql` in the same change (`schema-on-boot.md`). Do not insert type-2 rows for safehouses that already exist.
- Create: after the type-1 insert, insert `safehousePages` at index 1 with `pageTypeID` 2 and one `safehousePage2` row. A failed insert still runs the existing partial delete, which also deletes `safehousePage2`. The response is still the safehouse id.
- Blank: `blankSafehouse` pages are empty type 1 (`pageID` 0) then empty type 2 (`pageID` -1). No fetch. The two cards must not share a React key.
- View: `pageTypeID` 2 assembles `{ type: 2, pageID, npcs, resources }`. A missing `safehousePage2` row assembles empty strings, not `type: 404`. Any other `pageTypeID` stays `type: 404`.
- Save: a posted `type: 2` with `pageID <= 0` inserts; `pageID > 0` updates that page’s index and the two strings. Omitted persisted type-2 ids delete `safehousePage2` then that `safehousePages` row. A list with no type 1 is still refused. A list with no type 2 is allowed. Type 404 is still kept. Catalog name stays the first type 1. Type 2 has no catalog name.
- Gutter, on every safehouse card, disclosed left to right: **+ Functions**, **+ Damage Healing**, far-right `fa-rotate-left`. `fa-plus` plus that text. No tooltip on either add. **+ Functions** inserts empty type 1. **+ Damage Healing** inserts empty type 2. Do not copy the card’s type. Local until Save. Cap 15 is unchanged. The first type 1 stays protected (`You can never remove this page.`). A type 2 sheet uses the armed delete. Do not add either label to the character gutter. The character disclosed set stays `add-page-type-1.md`.
- Download: every `.safehouse-shell .page` is already one letter page. Paint these two textareas’ bands in `downloadSafehouse.ts` the way `download-character.md` paints `.page-type-two-notes`: a 17.38px `#fff` / `#f3f3f3` bitmap, shifted by the live `scrollTop`, `background-attachment: scroll`. Do not edit `downloadCharacter.ts`. Do not add this class to the character paint list.

Rejected:
- A page type whose layout is the uploaded PDF’s second page.
- Putting **NPCs** and **Resources** on the Functions page.
- Backfilling type 2 onto existing safehouses (the designer did not care; “all new safehouses” stands).
- Abilities’ Save-only view `p`, and Abilities’ 19-band box.
- Importing `NotesPanes`, or moving it to `shared/`.
- A wordmark, Functions header, or Functions footer on this card.
- A row list, a rank, or a ruin flag for these two strings.
- Protecting the first type 2 from delete.
- A character gutter label, or a character `pageTypeID`.

Touches: `app/src/pages/safehouse/`; `backend/common/interfaces/safehouse/safehouse.ts`; `backend/common/textareaLimits.ts`; `backend/server/safehouse/`; unindexed `backend/server/db/ensureSchema.ts`; `00-START-HERE.yaml`
TODOs: T-179–T-182
