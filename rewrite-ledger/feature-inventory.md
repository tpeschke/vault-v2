# Feature inventory
status: accepted   date: 2026-10-03

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
- Add page-type-1 sheet
- Delete character

Create character: home footer → `UsersCharactersHook.addCharacter` → `backend/server/v2/add/`. Slot limit (Patreon/owner) is a constraint, not a feature.

Edit character sheet: v2 view sidebar → new v2 edit owner. Canonical: `edit-character.md`.

Add page-type-1 sheet: edit-only `+` under each page-type-1; local until Save; catalog stays the first page-type-1. Extra persisted type-1 names are a catalog `fa-user` tooltip on that row, not a second character. Another instance of type 1, not page type N (`v2-page-type.md`). Canonical: `add-page-type-1.md`.

Not present: quick-edit, download PDF.

Quick view inputs (Unspent CrP, Current Favor, vitals dice, Die Penalty, Current Damage, Current Stress) are page-type-1 view controls, not a feature. View inputs persist on blur; view die clicks persist `dieIndex`. A v1-matched sidebar button highlights those locations. Canonical: `quick-view-inputs.md`.

## v1 (ancient)

- List v1 characters
- View v1 character sheet
- Edit v1 character sheet
- Quick-edit v1 character
- Download v1 character as PDF
- Delete v1 character

Excluded: create v1 character (permanent). T-004 removed unused `HomeController.addCharacter`.
