# Textarea height and length
status: accepted   date: 2026-10-30

Decision: Every textarea clips at its current box and does not scroll. The value may extend past that box up to its character cap. The default cap is 1350 Unicode code points, newlines counted as one. A tighter limit already on that field stays and is enforced in the browser and on the server. The only replaced cap is the page-type-3 Contacts textarea (`v2Page3Basics.contacts`): 1350 replaces the old per-row `varchar(500)` and the later no-cap string. The column stays `text`. Stored values over their cap are trimmed to it. The cap, the counter, and the trim live in `@vault/common`.

Why: The designer answered Design questions 1–6 on 2026-10-30. CSS `overflow: hidden` alone does not stop a textarea from scrolling, and a fit-gate would refuse text the caret is allowed to enter. Contacts is the one field whose previous max is replaced. Other specific limits stay. Both sides must use one counter or the gates disagree.

Constraints it imposes:
- Box: keep each textarea’s current used height. Do not change the page-type-2 note-pane 16-vs-19 numbers, the Contacts live min-height (ledger 18 bands; CSS is `calc(20 * 17.38px)`), the two-line `calc(2 * 17.38px)` notes box, the Gear Notes `calc(6 * 17.38px)` height, the v1 `lines` heights, or the v1 bonus-shell heights. `overflow: hidden` on the textarea and on the view `p` that shows the same string. Do not put `overflow: hidden` on a Gear head or row (`page3-view.md`). `resize: none` where it is not already set. On textarea scroll, set `scrollTop` and `scrollLeft` to 0. Do not refuse input because `scrollHeight` exceeds the box. Remove `field-sizing: content` from the two Discount leftover notes. The view `p` does not grow. Contacts and Gear Notes have no view `p`.
- Counter: normalize CR and CRLF to LF, then count code points. `string.length` is not the counter. Do not count graphemes. In-limit strings are not rewritten. Over-cap trim keeps the first N code points of the normalized string.
- Default cap 1350. Known tighter caps, column type unchanged: attack notes and defense notes `varchar(150)`; Favor `divineRelationship` `varchar(500)`. These stay `text` and use 1350: page-type-2 `generalSkillNotes`, `combatSkillNotes`, `abilities`, `burdens`; page-type-3 `contacts` and `notes`. `<input>` limits stay, including Current Emotions 25, description emotions 25, and relationship `value` 500.
- v1 textarea columns are not in this repo. If `information_schema.columns.character_maximum_length` is set, that number is the cap and the column type stays. If the type is `text`, the cap is 1350 and the column stays `text`. Do not guess. v1 Allies, Contacts, & Assets (`cvcharactermain.contacts`) is not the Contacts textarea and is not forced to 1350.
- Browser: `maxLength` plus a clamp with this counter after IME composition ends. Do not slice during composition. The shared v1 `TextArea` does not hard-code 1350; the caller passes the field cap.
- Server: refuse the write when the counter is over the cap. Do not slice on the write. Same `{ success: false }` shape as an invalid Current Emotions field write; full Save does not persist that over-cap textarea string. Boot trim is the only trim (`schema-on-boot.md`).
- Module: `backend/common/textareaLimits.ts`, imported as `@vault/common/textareaLimits`. It owns the default, the named caps, `textareaCharCount`, `trimTextarea`, and `holdTextareaScroll`. Do not add `app/src/shared/` or `features/`.

Rejected:
- Refusing keystrokes that overflow the box (the caret may enter hidden text).
- Scrollbar-only CSS, which still scrolls.
- Replacing `varchar(150)` or `varchar(500)` with 1350, including Favor and relationship names.
- Restoring Contacts as `varchar(500)` or as a row list.
- Changing `v2Page3Basics.contacts` off `text`.
- Applying 1350 to inputs.
- Treating v1 Allies, Contacts, & Assets as the Contacts textarea.
- Grapheme or UTF-16 counts.
- Silent slice of a new over-cap write.
- A new `app/src/shared/` layer for this constant.

Touches: `backend/common/textareaLimits.ts`; v1 `app/src/components/textArea/`; v1 page-one / page-two / page-three textarea callers; v2 page-type-1 Attacks, Defenses, Favor; v2 page-type-2 GeneralSkills, CombatSkills, NotesPanes; v2 page-type-3 Contacts and Gear Notes; `backend/server/v2/edit/`; `backend/server/v1/controllers/edit/`; `backend/server/v1/controllers/quickEdit/`; unindexed `backend/server/db/ensureSchema.ts`
TODOs: T-134–T-139
