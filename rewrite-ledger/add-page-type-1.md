# Add page-type-1 sheet
status: accepted   date: 2026-10-03

Decision: A new Character (v2) objective. While editing, a `+` under each page-type-1 card inserts another blank page-type-1 after that card. The extra page is local until Save. Catalog identity stays the first page-type-1.

Why: The designer asked for another copy of page type 1 on the same character, not a new page type (`v2-page-type.md`) and not Create character.

Constraints it imposes:
- Edit mode only (`isEditing`). Owners reach it through the existing Edit button. No `+` on the view. No persist on click. No new HTTP route.
- Place the `+` immediately under each rendered page-type-1 card, outside `.page` / `.page-type-one`. One control per type-1 instance, including pages added this session. Not in the sidebar. Not inside `PageType1.tsx`. Not on other page types.
- Label `+`. Color `#bdbdbd`. No edit-teal fill (override `.view-edit button` in `index.css`). No sidebar box-shadow. No scroll-into-view. No cap.
- Insert a blank page-type-1 after the clicked card (array splice). Skeleton matches `assemblePageType1` empty defaults. Do not clone the current page. Temp `pageID` is a unique number `<= 0` (`makeTempID` is a string; do not use it).
- Posted `pages` order is the stored `v2CharacterPages.index`. View assemble must `ORDER BY index`. Save inserts new type-1 rows (`pageID <= 0`) via `INSERT v2CharacterPages` + existing `addPageType1` + `savePageType1`, then writes `index` from array position for every posted type-1 page. Reuse `backend/server/v2/add/pageType1/`; do not copy that tree. Do not create a character. Do not delete unknown page types.
- Revert drops unsaved pages (existing snapshot). Leave-warn already runs while `isEditing` and dirty. After Save, `getV2Character` reassemble stays the response.
- Catalog Name / ancestry / class / subclass / level: first page-type-1 only (`order by index`, same as `assembleV2Character` `getCharacterName`). Home list is one row per character. `updateCatalogInfo` and `character.name` do not follow later pages. Slot limit unchanged.
- Empty-name Save gate stays the first page-type-1. A new page’s empty name still becomes `'New Character'` on persist (`saveGeneralInfo`).
- Sheet-wide card/session contract: `v2-page-type.md`. Play-time view controls on each instance: `quick-view-inputs.md` (they stay skipped while `isEditing`).
- Do not add `features/`. Do not add delete, reorder, type picker, or page type N.

Rejected:
- Persist on click / a new add-page route.
- Tabs, repeating-section rows, or a second catalog character.
- Cloning the clicked page.
- Folding this into Create character or into “page type N.”

Touches: `app/src/pages/v2/`; `backend/server/v2/edit/`; `backend/server/v2/add/pageType1/` (reuse); `backend/server/v2/view/viewV2CharacterController.ts`; `backend/server/controllers/home/v2/getCharacters.ts`; `00-START-HERE.yaml`; `rewrite-ledger/feature-inventory.md`
TODOs: T-064–T-067
