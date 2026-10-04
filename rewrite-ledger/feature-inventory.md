# Feature inventory
status: accepted   date: 2026-10-04

Unmarked **character** means v2. v1 rows are marked. Sheet widgets are not features.

Home is one page; list objectives stay split by version. Create character stays on that home page slice on the frontend (not a route, not `features/create-character`). View slices are `app/src/pages/v1` and `app/src/pages/v2`. Canonical: `fsd-colocation.md`.

## Unversioned

- Log in
- Log out

## Character (v2)

- List characters
- Create character
- View character sheet
- Edit character sheet
- Add sheet page
- Delete character

Create character: home footer → `UsersCharactersHook.addCharacter` → `backend/server/v2/add/`. A new character gets page type 1 at index 0 and page type 2 at index 1 (`page2-view.md`). Slot limit (Patreon/owner) is a constraint, not a feature.

Edit character sheet: v2 view sidebar → new v2 edit owner. Canonical: `edit-character.md`.

Add sheet page: edit-only `+` under each sheet card inserts another blank of **that card’s type**; local until Save; catalog stays the first page-type-1. Extra persisted type-1 names are a catalog `fa-user` tooltip on that row, not a second character. Type 2 has no catalog name. Canonical: `add-page-type-1.md`. Edit-only reorder controls sit left of that `+` (`page-reorder.md`). Page type 2 layout: `page2-view.md`.

Not present: quick-edit, download PDF.

Quick view inputs (Unspent CrP, Current Favor, vitals dice, Die Penalty, Current Damage, Current Stress, Current Emotions; type-2 leftover notes) are view controls, not a feature. View inputs persist on blur; view die clicks persist `dieIndex`. A v1-matched sidebar button highlights those locations. Canonical: `quick-view-inputs.md`.

## v1 (ancient)

- List v1 characters
- View v1 character sheet
- Edit v1 character sheet
- Quick-edit v1 character
- Download v1 character as PDF
- Delete v1 character

Excluded: create v1 character (permanent). T-004 removed unused `HomeController.addCharacter`.
