# Feature inventory
status: proposed   date: 2026-09-30

Ready for accept or edit. Unmarked **character** means v2. v1 rows are marked. Sheet widgets are not features.

Home is one page; list objectives stay split by version.

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

Excluded: create v1 character (permanent). T-004 removes unused `HomeController.addCharacter`.
