# Page type 2 view
status: blocked   date: 2026-10-03

Decision: Page type 2 is the next v2 sheet page. Its layout source is the official page-2 blank. That blank was not attached this Order, so section order, labels, and stores are not recorded. Sheet-wide fonts, page box (1036 / 1068), island, edit session, and vertical slice: `v2-page-type.md`. No wordmark on this page.

Why: The designer ordered page-type-2 from a blank immediately after the playbook. Inventing sections from leftover page-1 widgets or from v1 `pageTwo` would replace the blank.

Constraints it imposes:
- Do not implement view/add/edit/delete/schema for type 2 until this file records the blank’s section order and labels.
- Do not mount `bonfire-wordmark.png`.
- Do not treat v1 `pageTwo` (combat / gear / skills) as this page.
- Do not move unused page-type-1 leftover widgets (Temperaments, Relationships, Movement) or payload-only Goals onto this page unless the blank and the designer say so. Those stores stay on the page-1 payload so Save does not wipe them (`edit-character.md`).
- Create-character inclusion is not noted. Designer: note when a page type is added (`v2-page-type.md`). `addV2CharacterController.ts` comments “Add page type 2”; that is not approval.
- After the blank is attached, a follow-up Order writes `page2-view.md` constraints and detailed implementation TODOs that walk the vertical slice.

Rejected:
- Inferring page 2 from leftover page-type-1 components.
- Using v1 page two as the v2 page-type-2 layout.
- Scaffolding an empty type-2 card before the blank is recorded.

Touches: none yet (no application files)
TODOs: T-064
