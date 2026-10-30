# Page type 4 general notes sheet
status: accepted   date: 2026-10-30

Decision: Page type 4 is a general notes sheet. The card is an embedded Excalidraw editor (`@excalidraw/excalidraw` **0.18.1**) filling the existing `.page` box. `pageTypeID` 4. Many instances. New characters get one type-4 at `v2CharacterPages.index` 3. Existing characters are not backfilled. The owner’s finished strokes field-POST the scene, including during Edit. Full Save still writes it. Gutter label **+ Notes**, to the right of **+ NPCs & Equipment**. This is a sheet, not the Gear Notes pane on page type 3.

Why: The designer named a notes sheet on Excalidraw (2026-10-30) and answered Design questions: the cap is the proposed UTF-8 measure, the scene stays on the full POST, pan is off, zoom stays hidden, the placeholder label stands, Create inserts one, many copies are allowed, and the existing error toast reports the cap. Page type 3 is already NPCs & Equipment (`page3-view.md`), so this sheet is type 4.

Constraints it imposes:
- Sheet-wide contract: `v2-page-type.md`, except the official blank, HamletOrNot / oldClaude / Source Sans 3, and `character-value`. Those stay on types 1, 2, and 3. This card does not use them. Wordmark stays page-1 only. The board is play-time for the owner (`quick-view-inputs.md`): always editable, on the view and during Edit. A non-owner is read-only. No location wash. The eye button does not change this card.
- `.page` in `View.css` is `height: 1036px; width: 796px`. The editor fills that box. Do not resize the box.
- Class root `.page-type-four`. Vertical slice paths: `v2-page-type.md` (`pageType4` / `page4`).
- Package: `@excalidraw/excalidraw@0.18.1` on the root workspace `package.json` (same place as `react-toastify`). That release accepts React 19. It has no `ui`, `setViewport`, or `imageOptions` prop. Do not depend on unreleased master APIs. Do not fork the package.
- Store one `text` column `scene` on `v2Page4Notes`, unique `pageID`, default `''`. `''` is an empty board. A non-empty value is JSON `{ "elements": [...], "files": { ... } }`. `elements` omits `isDeleted` items. `files` keeps only entries referenced by the remaining elements. Do not store zoom, scroll, or the rest of `appState`. Cap constant `NOTES_SCENE_MAX_BYTES = 100 * 1024 * 1024` lives next to the `Page4` contract in `backend/common` so client and server share one number.
- The cap is the UTF-8 byte length of that JSON string, per notes page. Growth past the cap is refused and the previous scene stays. Shrinks are allowed. A stroke that hits the cap toasts `The notes sheet is over 100 MB, so this stroke was not saved.` Full Save still refuses an over-cap or unreadable type-4 `scene` with `{ message: 'Notes sheet is limited to 100 MB' }` and no `pages` key, before `savePages`. Do not write the row in that case.
- Zoom stays at value 1. Pan stays at the scroll the editor had when the scene loaded (empty board: `scrollX` 0, `scrollY` 0). Wheel, pinch, and zoom shortcuts do not stick: `onWheelCapture` on the card swallows the wheel, and `onScrollChange` writes zoom 1 and the locked scroll back through `updateScene` without pushing a history entry. Moving or resizing objects is still allowed.
- `viewModeEnabled` is true only when the viewer does not own the character. An owner can draw on the view and during Edit. While the pointer is inside an owned `.page-type-four`, show `.App-toolbar`, `.undo-redo-buttons`, and `.help-icon` (installed 0.18.1 class; restore `display: flex`). `.zoom-actions` stays hidden, including during that hover. `.main-menu-trigger` and `.default-sidebar-trigger` stay hidden. `UIOptions.canvasActions`: `loadScene` false, `export` false, `saveToActiveFile` false, `saveAsImage` false. `aiEnabled` false. Do not mount Excalidraw `WelcomeScreen` or `MainMenu` children. Do not replace `hints.canvasPanning`.
- A finished stroke updates local `scene` and field-POSTs. Finished means `newElement`, `resizingElement`, `multiElement`, `selectedElementsAreBeingDragged`, and `editingTextElement` are clear. No timer. No POST while one of those is set, when the string already matches the snapshot, or when the viewer does not own the character. Attribute `'page4Scene'`, value the same scene string Save stores. One POST in flight per notes card. If the scene changed while it was in flight, POST the latest string when it returns. Apply a success only when that string is still current; a mint’s new `pageID` is applied even if a newer stroke is waiting. A stroke failure toasts one sentence that names the notes sheet and the reason, and that toast stays until dismissed. The canvas stays as drawn. Do not roll it back. The sentences are: over 100 MB, `The notes sheet is over 100 MB, so this stroke was not saved.`; request over 10 MB, `The notes sheet is larger than 10 MB, so this stroke was not saved.`; scene not readable, `The notes sheet could not be read, so this stroke was not saved.`; page not on this character, `This notes sheet is not on the character, so the stroke was not saved.`; mint failed, `The notes sheet could not be created, so this stroke was not saved.`; no response, `The notes sheet was not saved because the request did not reach the server.` The sidebar spinner stays up for the whole queue, so Edit, Save, and Revert wait. Full Save still writes `scene`. Field success patches the snapshot and does not bump the notes epoch. Revert does not undo a stroke that already succeeded. `initialData` is applied on mount only. Revert, load, and a successful full Save still bump the epoch and remount from the snapshot. Do not key the editor on the scene string. The card key stays the client key across a mint, so replacing `pageID` does not remount.
- `pageID <= 0`: the first finished stroke whose string differs from the snapshot inserts `v2CharacterPages` (`pageTypeID` 4, `index` = that page’s array index) and `v2Page4Notes` with the scene. Rows of this character with `index >=` that index shift up by one. Success `{ success: true, pageID }` with `pageID > 0`. The client replaces the temp id on that live page and the snapshot and keeps the client key. **+ Notes** itself still does not POST. `pageID > 0` updates `scene` only when that id is a type-4 page of this character, and returns `{ success: true }`. Otherwise `{ success: false }` and no write. Cap and JSON checks are the Save checks, on this string alone, before the write. Do not call `savePages`.
- Gutter: `add-page-type-1.md`. **+ Notes** is the rightmost add, same chrome, inserts `emptyPageType4` after that card. Save count-gate includes type 4. Catalog name stays the first type-1. Type 4 has no catalog name.
- Create: index 0 type 1, index 1 type 2, index 2 type 3, index 3 type 4. No boot insert of type-4 rows onto existing characters.
- Schema: `ensureSchema` + `backupTables/page4.sql` in the same change (`schema-on-boot.md`). No new migration package. No `features/`.

Rejected:
- Reusing `pageTypeID` 3. That id is NPCs & Equipment.
- An official-blank layout, sheet fonts, or `character-value` on this card.
- Editing the Gear Notes pane on page type 3 to host this whiteboard.
- Zoom in or out, including leaving `.zoom-actions` visible.
- Panning the viewport.
- A separate scene route. Strokes use the existing field POST. Full Save still writes the scene.
- Collab, an excalidraw.com iframe, or a library install from libraries.excalidraw.com.
- Backfill of type 4 onto existing characters.
- `ui` / `setViewport` from unpublished Excalidraw sources.
- Keying the editor on every scene change.
- A cap that sums across pages, or a cap that counts deleted elements.

HTTP JSON limit: `vault.ts` uses `bodyParser.json({ limit: '10mb' })`. One scene may be 100 MB. The stroke POST and the full Save both hit that ceiling. The ceiling is not chosen here. T-139 is blocked on that choice. CORS is registered before that parser. A field POST the parser refuses answers JSON `{ success: false, message }` with the 10 MB notes sentence above, status 413. Full Save’s 413 is unchanged.

Revised 2026-10-30 (quick edit; designer answers):
- “No play-time field POST” — **revised**: the owner’s board is always editable. Each finished stroke field-POSTs, including during Edit. A non-owner is read-only.
- “`viewModeEnabled` when `isEditing` is false” — **revised**: view mode is on only when the viewer does not own the character.
- “Show `.App-toolbar` and `.undo-redo-buttons` only under `.view-edit`” — **revised**: those, and `.help-icon`, show when the pointer is over an owned card.
- “Scene edits are local until Save” — **revised**: a finished stroke writes immediately. Full Save still writes `scene`. A successful stroke is already on the snapshot, so Revert does not undo it.
- “A separate scene route. The scene stays on the full-character POST.” — **revised**: no new route. The stroke uses `/v2/edit/:characterID/field`. Full Save still writes the scene.
- “The scene rides the full-character POST” as the only write — **revised**: that POST remains, and the stroke POST is added.
- Debounced persist — **rejected** here too. The commit is the finished stroke.
- Eye-button wash on this card — **rejected**.
- Replacing `hints.canvasPanning` — **rejected** for this change. The hint still says the wheel can move the canvas.

Revised 2026-10-30 (stroke failure must say why):
- Stroke toast `Notes sheet is limited to 100 MB` — **revised** for a stroke: `The notes sheet is over 100 MB, so this stroke was not saved.` Full Save keeps `Notes sheet is limited to 100 MB`.
- A stroke refusal with no `message` toasts **Save failed** — **revised**: each refusal has the sentence in the stroke constraint, and the toast stays until dismissed.
- Parser 413 is an HTML error — **revised** for `/v2/edit/:characterID/field` only: JSON with the 10 MB notes sentence. The `10mb` limit is **retained**.
- One cap sentence for an unreadable scene and an over-cap scene — **retained** on full Save. **Revised** for a stroke: unreadable and over-cap are different sentences.

Touches: `app/src/pages/v2/pageTypes/pageType4/`; `app/src/pages/v2/V2View.tsx`; `app/src/pages/v2/hooks/`; `backend/common/interfaces/v2/page4/`; `backend/common/interfaces/v2/pageTypes.ts`; `backend/server/v2/{view,edit,add,delete}/`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page4.sql`; unindexed `backend/server/vault.ts` (T-139 limit; T-143 CORS and the field-POST 413); root `package.json`; `00-START-HERE.yaml`; `rewrite-ledger/add-page-type-1.md`; `rewrite-ledger/edit-character.md`; `rewrite-ledger/feature-inventory.md`; `rewrite-ledger/schema-on-boot.md`; `rewrite-ledger/v2-page-type.md`
TODOs: T-134–T-138, T-140 (done); T-139 (blocked); quick edit: T-141, T-142 (done); stroke failure text: T-143, T-144
