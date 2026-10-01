# Feature inventory
status: accepted   date: 2026-09-30

Unmarked **character** means v2. v1 rows are marked. Sheet widgets are not features.

Home is one page; list objectives stay split by version. Create character stays on that home page slice on the frontend (not a route, not `features/create-character`). View slices are `app/src/pages/v1` and `app/src/pages/v2`. Canonical: `fsd-colocation.md`.

## Unversioned

- Log in
- Log out

## Character (v2)

- List characters
- Create character
- View character sheet
- Delete character

Create character: home footer → `UsersCharactersHook.addCharacter` → `backend/server/v2/add/`. Slot limit (Patreon/owner) is a constraint, not a feature.

Not present: edit, quick-edit, download PDF.

## v1 (ancient)

- List v1 characters
- View v1 character sheet
- Edit v1 character sheet
- Quick-edit v1 character
- Download v1 character as PDF
- Delete v1 character

Excluded: create v1 character (permanent). T-004 removed unused `HomeController.addCharacter`.
