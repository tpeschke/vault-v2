# Feature inventory
status: proposed (designer will edit)   date: 2026-09-30

Edit this list: keep, rename, merge, split, or delete. A feature is a user objective, split by version when that objective exists in that version. Sheet regions (weapons, vitality, …) are not features unless added here.

Presence notes are evidence from current routes and controllers, not extra features.

## Unversioned

- Log in
- Log out

## Version 1

- List characters
- View character sheet
- Edit character sheet
- Quick-edit character
- Download character as PDF
- Delete character

Permanently excluded: create character. v1 will never add characters. Do not add this objective later. Leftover: `backend/server/controllers/home/HomeController.ts` `addCharacter` is unwired and is not a feature.

## Version 2

- List characters
- Create character
- View character sheet
- Delete character

Not present: edit character sheet, quick-edit, download PDF.

Create character is gated by Patreon/owner slot limit; that limit is a constraint on this objective, not a separate feature.

## Shared home surface

Home lists both versions on one page. Split as List characters v1 and List characters v2 above. Merge those two if home should be one objective.
