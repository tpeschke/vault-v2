/**
 * Page type 4 `scene` column.
 * `''` is an empty board.
 * A non-empty value is JSON `{ elements, files }` with deleted elements omitted
 * and `files` limited to ids still referenced. No `appState`.
 */
export const NOTES_SCENE_MAX_BYTES = 100 * 1024 * 1024
