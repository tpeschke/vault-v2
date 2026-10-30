# Page type 4 general notes sheet
status: accepted   date: 2026-10-30

Decision: Page type 4 is a general notes sheet. The card is an embedded Excalidraw editor (`@excalidraw/excalidraw` **0.18.1**) filling the existing `.page` box. `pageTypeID` 4. Many instances. New characters get one type-4 at `v2CharacterPages.index` 3. Existing characters are not backfilled. The scene rides the full-character POST. Gutter label **+ Notes**, to the right of **+ NPCs & Equipment**. This is a sheet, not the Gear Notes pane on page type 3.

Why: The designer named a notes sheet on Excalidraw (2026-10-30) and answered Design questions: the cap is the proposed UTF-8 measure, the scene stays on the full POST, pan is off, zoom stays hidden, the placeholder label stands, Create inserts one, many copies are allowed, and the existing error toast reports the cap. Page type 3 is already NPCs & Equipment (`page3-view.md`), so this sheet is type 4.

Constraints it imposes:
- Sheet-wide contract: `v2-page-type.md`, except the official blank, HamletOrNot / oldClaude / Source Sans 3, and `character-value`. Those stay on types 1, 2, and 3. This card does not use them. Wordmark stays page-1 only. No play-time field POST (`quick-view-inputs.md`).
- `.page` in `View.css` is `height: 1036px; width: 796px`. The editor fills that box. Do not resize the box.
- Class root `.page-type-four`. Vertical slice paths: `v2-page-type.md` (`pageType4` / `page4`).
- Package: `@excalidraw/excalidraw@0.18.1` on the root workspace `package.json` (same place as `react-toastify`). That release accepts React 19. It has no `ui`, `setViewport`, or `imageOptions` prop. Do not depend on unreleased master APIs. Do not fork the package.
- Store one `text` column `scene` on `v2Page4Notes`, unique `pageID`, default `''`. `''` is an empty board. A non-empty value is JSON `{ "elements": [...], "files": { ... } }`. `elements` omits `isDeleted` items. `files` keeps only entries referenced by the remaining elements. Do not store zoom, scroll, or the rest of `appState`. Cap constant `NOTES_SCENE_MAX_BYTES = 100 * 1024 * 1024` lives next to the `Page4` contract in `backend/common` so client and server share one number.
- The cap is the UTF-8 byte length of that JSON string, per notes page. Growth past the cap is refused and the previous scene stays. Shrinks are allowed. Client: `toast.error('Notes sheet is limited to 100 MB')` via the existing `react-toastify` path. Server: before `savePages`, refuse an over-cap or unparseable type-4 `scene` with `{ message: 'Notes sheet is limited to 100 MB' }` and no `pages` key, so the Save toast path runs. Do not write the row in that case.
- Zoom stays at value 1. Pan stays at the scroll the editor had when the scene loaded (empty board: `scrollX` 0, `scrollY` 0). Wheel, pinch, and zoom shortcuts do not stick: `onWheelCapture` on the card swallows the wheel, and `onScrollChange` writes zoom 1 and the locked scroll back through `updateScene` without pushing a history entry. Moving or resizing objects is still allowed.
- Edit session: `viewModeEnabled` when `isEditing` is false, so the tool bar is absent outside Edit and for non-owners. While `.view-edit` and the pointer is inside `.page-type-four`, show `.App-toolbar` and `.undo-redo-buttons`. `.zoom-actions` stays hidden, including during that hover. `.main-menu-trigger` and `.default-sidebar-trigger` stay hidden. `UIOptions.canvasActions`: `loadScene` false, `export` false, `saveToActiveFile` false, `saveAsImage` false. `aiEnabled` false. Do not mount Excalidraw `WelcomeScreen` or `MainMenu` children.
- Scene edits are local character state until Save. `initialData` is applied on mount only. Revert, load, and a successful Save bump a session epoch and remount the editor from the snapshot scene. Do not key the editor on the scene string.
- Gutter: `add-page-type-1.md`. **+ Notes** is the rightmost add, same chrome, inserts `emptyPageType4` after that card. Save count-gate includes type 4. Catalog name stays the first type-1. Type 4 has no catalog name.
- Create: index 0 type 1, index 1 type 2, index 2 type 3, index 3 type 4. No boot insert of type-4 rows onto existing characters.
- Schema: `ensureSchema` + `backupTables/page4.sql` in the same change (`schema-on-boot.md`). No new migration package. No `features/`.

Rejected:
- Reusing `pageTypeID` 3. That id is NPCs & Equipment.
- An official-blank layout, sheet fonts, or `character-value` on this card.
- Editing the Gear Notes pane on page type 3 to host this whiteboard.
- Zoom in or out, including leaving `.zoom-actions` visible.
- Panning the viewport.
- A separate scene route. The scene stays on the full-character POST.
- Collab, an excalidraw.com iframe, or a library install from libraries.excalidraw.com.
- Backfill of type 4 onto existing characters.
- `ui` / `setViewport` from unpublished Excalidraw sources.
- Keying the editor on every scene change.
- A cap that sums across pages, or a cap that counts deleted elements.

HTTP JSON limit: `vault.ts` uses `bodyParser.json({ limit: '10mb' })`. One scene may be 100 MB, and many type-4 pages ride one POST. The ceiling is not chosen here. T-139 is blocked on that choice.

Touches: `app/src/pages/v2/pageTypes/pageType4/`; `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/hooks/`; `backend/common/interfaces/v2/page4/`; `backend/common/interfaces/v2/pageTypes.ts`; `backend/server/v2/{view,edit,add,delete}/`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page4.sql`; unindexed `backend/server/vault.ts` (T-139 only); root `package.json`; `00-START-HERE.yaml`; `rewrite-ledger/add-page-type-1.md`; `rewrite-ledger/edit-character.md`; `rewrite-ledger/feature-inventory.md`; `rewrite-ledger/schema-on-boot.md`; `rewrite-ledger/v2-page-type.md`
TODOs: T-134–T-138, T-140 (proposed); T-139 (blocked)
