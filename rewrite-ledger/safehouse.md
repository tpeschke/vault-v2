# Safehouse
status: accepted   date: 2026-11-01

Decision: A safehouse is its own record, with the same abilities as a v2 character sheet and its own page catalog. The only page type in this decision is safehouse page type 1, the first page of the Safehouse template. Browser view is `/s/:safehouseID`. Blank is `/s/blank`. HTTP is under `/api/s`. The user’s safehouses are listed under **Your Characters** on the home catalog. A link from a safehouse to a character is not part of this decision.

Why: The designer named a sheet that is not a character page, then said it has the character sheet’s abilities and a different set of pages, then answered Design questions 1–12 (2026-11-01). Official blank page 1 is the layout source. The NPCs Relationships list is the Functions template. The Gear flag is the **R?** template. Character list, edit, gutter, blank, and download are the ability templates.

Constraints it imposes:

Record:
- Tables are owned here and applied from `ensureSchema` plus `backend/server/safehouse/safehouse.sql` in the same change (`schema-on-boot.md`). No character foreign key. No backfill onto characters. No row in `v2CharacterPages`.
- `safehouses`: `id`, `userID` not null.
- `safehousePages`: `id`, `safehouseID`, `index`, `pageTypeID`. Several rows per safehouse. `id` is the PK. Do not unique `safehouseID` alone.
- `safehousePage1`: unique `pageID`; `name varchar(250)` default `'New Safehouse'`; `location varchar(250)` default `''`; `cRankLimit` `wealth` `spaceLimit` `wear` integer, null when empty.
- `safehousePage1Functions`: `pageID`, `section` (`living` `workspace` `recreational` `defenses`), `name varchar(500)`, `rank` integer null, `r` boolean default false, `space` integer null, `notes varchar(500)`, `index`.
- Page type id 1 is this sheet. A later safehouse page type is a later decision and a further gutter label. It is not a character `pageTypeID`.

Abilities (parallel to the v2 character set; v1 is not the template):
- **List.** Inside the Your Characters card (`V2CharacterDisplay`), below that card’s character footer, a **Safehouses** block: rows, then its own add/limit footer. Not a character row. Not the v1 card. Logged-out home stays the existing login heading.
- **Create.** That footer’s add. `POST /api/s` inserts one safehouse and one page type 1 at index 0. Returns the id. The client opens `/s/:id`. Logged-out create is refused. Server does not apply the slot formula; character create does not either (`addV2Character` leaves that check commented).
- **Slot pool.** Separate from the character count. Same formula: `(patreon * 20) + 10`, and the owner sees `∞`. The footer shows `count/limit`. At the limit the add is the disabled control. Tooltips: `Add New Safehouse`; `You're unable to add a new Safehouse. Upgrade Your Patreon For More.`; `Safehouse Limit. Upgrade Your Patreon For More.`
- **Catalog row.** Safehouse Name of the first page type 1. Empty stored name displays `New Safehouse`. Extra persisted type-1 names use the character `fa-user` tooltip pattern, one per line, empty extra shown as `New Safehouse`. Row click opens `/s/:id`. Hover preload stores `GET /api/s/:id` in its own cache map, not `characterCache[1]` or `[2]`. Delete is the character row’s two-step confirm. `DELETE /api/s/:id` runs only for the owning `userID`; otherwise `{ message: "You Don't Own This Safehouse" }`.
- **View.** `GET /api/s/:safehouseID`. A non-numeric id, including `blank`, is `{ message: 'Bad ID' }` and no sheet. Unknown id with no pages is `{ message: 'No Pages' }`. Any caller who can hit the route may view, matching character view. `ownsThisSafehouse` is session user id equals `safehouses.userID`.
- **Blank.** `/s/blank` is registered before `s/:safehouseID`. One empty page type 1. No fetch, no create, no Save, no field POST. Signed out. Read-only. Hover at rest. Header stays. Sidebar shell stays; Edit, Save, Revert, and Show / Hide Quick Edit Locations hide; Download stays. `character-value` ink is empty, including a stored `0` and a checked **R?**. The wordmark, section labels, slashes, the printed `10`, and the italic hints stay. Document title `Blank - Bonfire Character Vault`. Header icon shell, directly after the character blank link: `Link` to `/s/blank`, tooltip `View Blank Safehouse Sheet`, icon `fa-solid fa-cards-blank`. Do not add a kit icon.
- **Edit.** Owner-only Edit. Save and Revert on that sidebar. `POST /api/s/:id` is the whole safehouse. Owner mismatch refuses. Do not trust a body user id. Failed Save restores the draft, stays in edit, `toast.error`. Whitespace-only name does not POST and stays in edit. Backend writes `'New Safehouse'` when the submitted name is missing or whitespace. Revert exits edit. Save exits edit only after success. Leave-warn only while editing and dirty. Play-time writes do not warn. While editing, field POSTs do not run.
- **Download.** Same sidebar rules as `download-character.md`, on this view: not owner-gated, visible on the blank, other sidebar buttons locked while the file builds, Quick Edit view forced off, one letter page per `.page`, filename from the catalog name or `Blank`. Implement it on the safehouse shell. Do not change `downloadCharacter.ts`. Do not query `.version-two-shell`.
- **Gutter.** While editing, under each safehouse card, outside `.page`: resting reorder, `fa-file-circle-plus`, delete. Disclosed: **+ Safehouse** (`fa-plus` plus that text, no tooltip), then far-right `fa-rotate-left` (`Never mind`). That button inserts a blank page type 1 after that card. Local until Save. Cap 15, counted on `pages.length`, including sheets added this session. Sentence `You can only have 15 pages per safehouse sheet.` Same disable, wrapper tooltip, disclosed counter, and Save refusal as `add-page-type-1.md`, with this sentence. The number lives in the safehouse contract, not in `sheetPageCap.ts`. The first page type 1 cannot be removed (`You can never remove this page.`). Other type-1 sheets use the armed delete in `delete-sheet-page.md`. A posted list with no type 1, or a removal that does not stick, is `{ message: "Pages weren't able to be removed" }` and no pages key. A short stored count is `{ message: 'Could not save all sheets' }`. Do not add **+ Safehouse** to the character gutter.
- **Quick view.** The character sidebar toggle, on a real safehouse. Hidden on the blank and while editing. It highlights the play-time cells named below.

Page type 1:
- Root `.page.card.page-type-safehouse` inside a shell that also has class `v2`, so `View.css` Kalam and the edit washes apply. Shell class `safehouse-shell`, not `version-two-shell`. `.safehouse-shell` shares the three `Sidebar.css` rules with `.version-two-shell`: flex row, sticky column (`top: 15px`, `height: 150px`, `margin-left: 15px`), button text left and the same shadow. The page gutter stays inside `.page-shell`. (Revised 2026-11-02: those rules matched only `.version-two-shell`, so Edit, Download, and Show Quick Edit Locations sat in a row under the card.) Border box 816×1056 (`v2-page-type.md`). Overflow past that box is recorded. Do not shrink glyphs. Row pitch is the Relationships band, 17.38px. Text on a data row is 15px / line-height 1.2.
- Reuse `Sidebar`, `EditingContext`, and `BlankContext` from the v2 view. Do not fork them. Do not move them to `shared/`. Do not render `V2View`.
- **Header**, block on the left, wordmark on the right. Wordmark is `bonfire-wordmark.png`, alt `Bonfire The Roleplaying Game`, chrome. Each field is a two-column grid, 8px gap: the title, then the value on that same line. The value’s black bottom border is the underline and fills the rest of the field. The name line stops at the fields column. Fields: **Safehouse Name**; **Location** and, on that same row, **C Rank Limit**; under C Rank Limit, italic chrome `x2 C of location`, spanning that label. C Rank Limit is a stored `number | ''`. It is not computed. Header fields are Save-only: view is `p.character-value`, edit is an input in the same cell, no field POST. (Revised 2026-11-02: the value sat on the line under the title.)
- **Functions.** Black bar **Functions**. Sections in order: **Living Space** (`living`, cap 10), **Workspace** (`workspace`, cap 11), **Recreational Space** (`recreational`, cap 10), **Defenses** (`defenses`, cap 14). Caps count data rows, not the gray bar. A stored Defenses list longer than 14 still renders. The server still does not enforce the function cap. (Revised 2026-11-02: the 2026-11-01 Defenses cap was 15, which left the footer one 17.38px row too low.) Each gray bar (`#bdbdbd`) carries the section name, **Rank**, the Ruin header, **Space**, and **Notes**. The section name is chrome. The Ruin header is `fa-solid fa-house-crack` with tooltip `Is this a ruin?`. The stored flag is still `r`. (Revised 2026-11-02: the 2026-11-01 header text was **R?**.)
- Each section is its own list, copied from Relationships, not imported from `pageType3`. Row `{ id, key?, name, rank, r, space, notes }`. `name` and `notes` are strings, cap 500. `rank` and `space` are `number | ''`. `r` is boolean. Real rows, leftover pads, one insert row while `length` is under the cap, insert on blur when any field is set (`r` true counts), `makeTempID`, clear removes the row when name, rank, space, and notes are empty and `r` is false. 17.38px border box. Even data rows `#f3f3f3`. First data row white. Column rules `1px solid #bdbdbd` between name, Rank, Ruin, Space, and Notes, through the gray header, the data rows, and the footer. Tracks: name about 19%, Rank 51px, Ruin 26px, Space 51px, Notes the rest. Section headers, data rows, and the footer share that list, so the four rules meet. Card padding stays 16px. (Revised 2026-11-02: the 2026-11-01 tracks were Rank 38px, R? 19px, Space 38px.)
- **R?** is a checkbox, the Gear flag’s measures, a page-local class: 12×12, `border-radius: 3px`, no border, `fa-solid fa-check` only while true, check 20px and allowed to paint outside the box, hover `rgba(173, 216, 230)`, edit and quick-edit rest that same fill, hover `rgb(145, 181, 194)`. A checked box has no black fill. At rest the row shows through, and hover, edit, and quick-edit keep those washes when checked. The check stays green. (Revised 2026-11-02: checked was black, including edit and quick-edit.) Do not reuse `.page3-flag-box` or `.anointed-box`. Do not mark it `character-value`. The kit nests the svg inside the `<i>`. On the blank the box does not fill, uses the arrow, and does not toggle.
- Function cells and the three stored footer numbers are play-time. View and edit both show the inputs. Blur or click persists only when `id > 0` and not editing. Insert and delete are their own attributes. Unknown attribute refuses.
- **Footer.** A two-row band, 19px each row, on the function tracks. Not a single label line. Gray cells are `#f3f3f3`. Its top edge is `border-top: 1px solid #323232`. That line does not replace the `#bdbdbd` column rules and does not cut the two rows. Chrome labels are oldClaude, except **Wealth** and **Wear**, which are HamletOrNot. Values are Kalam. (Revised 2026-11-02: Wealth and Wear were oldClaude, and the band had no top border.)
- Name track, both rows: **Wealth** (HamletOrNot, about 21px) on the left half; the wealth input on the right half. The input’s right edge is the name|Rank rule.
- Rank track, top: empty. Ruin track, top: the Total Ranks value. Rank and Ruin, bottom: one empty gray cell. The Rank|Ruin rule stops at that split.
- Space track, top: empty gray. Bottom of the Space track: chrome **Total Ranks** (about 10px), allowed to paint across the empty cell under the small slash.
- Notes track, from the left: a 26px `/` (about 10px) on the top row; a 78px gray column, Space Limit input on top and the Upkeep numeral on the bottom; then **Space Limit** (about 10px) at the left of the remaining text and **Wear** (HamletOrNot, about 23px) at the right, with **Upkeep** and italic `1/10th total Ranks in gc` on the bottom line; a 52px gray wear input spanning both rows; `/` and printed **10** (about 23px) spanning both rows.
- Wealth, Space Limit, and Wear stay stored `number | ''` and play-time. The printed `10` stays chrome and does not clamp Wear. The Upkeep numeral is the gray cell directly left of the word Upkeep.
- **Total Ranks** is the count of function rows on that page whose `r` is true, across all four sections. Pads are not rows. The insert draft counts only after it is a row. A real sheet with none checked shows `0`. Blank ink is empty, including `0`. Rank numbers stay stored and do not feed this count. (Revised 2026-11-02: the 2026-11-01 total was the sum of numeric ranks; empty rank added 0.)
- **Upkeep** is that count / 10, trailing `.0` removed, at most one decimal: `0`, `0.1`, `1`, `1.5`. The helper still keeps a minus for a negative argument; this count does not pass one. The numeral and Total Ranks are `p.character-value`, not inputs, not POST, not quick-edit highlights. They stay handwriting in edit. The word Upkeep and the subtitle are chrome.

Field attributes, shipped with the controls: `safehouseFunctionName`, `safehouseFunctionRank`, `safehouseFunctionR`, `safehouseFunctionSpace`, `safehouseFunctionNotes` are `{ id, ... }` for that cell. `safehouseFunctionInsert` is `{ section, name, rank, r, space, notes }` and returns `id`. `safehouseFunctionDelete` is `{ id }`. `safehouseWealth`, `safehouseSpaceLimit`, `safehouseWear` are the page’s number. Refuse a name or notes string longer than 500.

The function insert binds `section` twice. `$2` is only the inserted value. `$8` is only the comparison `section = $8` in the next-index subquery. `$1` stays shared. A missing returned id is still `Invalid field`. (Revised 2026-11-02: `$2` was also that comparison. Postgres rejects the reuse as `text` versus `varchar`, `42P08`.)

HTTP, all under `/api/s`, mounted from `vault.ts`:
- `GET /api/s` list for the session user
- `POST /api/s` create
- `GET /api/s/:safehouseID` view
- `POST /api/s/:safehouseID` save
- `POST /api/s/:safehouseID/field` one cell
- `DELETE /api/s/:safehouseID` delete

`GET /api/s/blank` is `{ message: 'Bad ID' }`. The constant is `safehouseApiURL = '/api/s'` in gitignored `app/src/frontend-config.ts`, beside `viewV2URL`.

Frontend page slice is `app/src/pages/safehouse/`. That revises `fsd-colocation.md`. No `features/`, `entities/`, or `shared/`. No `features/create-safehouse`. Create stays on the home page slice.

L1 keys, added in the same change as the files they name: list safehouses, create safehouse, view safehouse sheet, view blank safehouse, edit safehouse sheet, download safehouse as pdf, add safehouse sheet page, delete safehouse. No key whose text is only `safehouse page` or `page type 5`. Character keys stay. View blank safehouse’s primary is the safehouse view, the same exception as `/v/blank`.

Rejected:
- A character page type, a `V2View` branch, or a gutter label on the character sheet.
- A shared page-type framework.
- Storing Total Ranks, Upkeep, or the printed 10.
- Summing the Rank column into Total Ranks. (Revised 2026-11-02.)
- Computing C Rank Limit from Location.
- Putting safehouses in the character slot count, the character cache maps, or `usersCharactersCache` index 0 or 1.
- A character foreign key.
- PDF pages 2 and 3 of the template.
- A server slot check the character create does not have.
- Importing `Relationships.tsx` or the Gear flag class.
- Casting the function-insert `section` parameter, or computing its next index in JavaScript. (2026-11-02.)
- Pulling the footer up by shrinking the row pitch, covering the last Defenses row, or pinning the footer to the page box. (2026-11-02.)
- Wrapping **Wealth** or **Wear** in `h1` or `h2`. (2026-11-02.)
- Copying the template’s three header gaps, running the name line under the wordmark, or putting a header value inside its title. (2026-11-02.)
- Putting `version-two-shell` on the safehouse DOM, copying the sidebar rules into a second file, or replacing the 150px sticky height with `align-self`. (2026-11-02.)
- A new color on a checked Ruin box, a native checkbox, leaving the black fill in edit or quick-edit, or changing Gear’s flag. (2026-11-02.)

Touches: `app/src/pages/safehouse/`; `app/src/pages/v2/components/sidebar/Sidebar.css`; `app/src/pages/home/`; `app/src/routes/AllRoutes.tsx`; `app/src/components/header/Header.tsx`; `app/src/hooks/UsersSafehousesHook.tsx`; unindexed `app/src/redux/slices/usersCharactersSlice.tsx` and `characterCacheSlice.tsx`; `backend/common/interfaces/safehouse/`; `backend/server/safehouse/`; unindexed `backend/server/vault.ts`; unindexed `backend/server/db/ensureSchema.ts`; `00-START-HERE.yaml`
TODOs: T-159–T-173
