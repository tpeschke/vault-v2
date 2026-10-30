/**
 * Page type 4 `scene` column.
 * `''` is an empty board.
 * A non-empty value is JSON `{ elements, files }` with deleted elements omitted
 * and `files` limited to ids still referenced. No `appState`.
 */
export const NOTES_SCENE_MAX_BYTES = 100 * 1024 * 1024

export const NOTES_STROKE_OVER_CAP = 'The notes sheet is over 100 MB, so this stroke was not saved.'
export const NOTES_STROKE_OVER_REQUEST = 'The notes sheet is larger than 10 MB, so this stroke was not saved.'
export const NOTES_STROKE_UNREADABLE = 'The notes sheet could not be read, so this stroke was not saved.'
export const NOTES_STROKE_MISSING_PAGE = 'This notes sheet is not on the character, so the stroke was not saved.'
export const NOTES_STROKE_MINT_FAILED = 'The notes sheet could not be created, so this stroke was not saved.'
export const NOTES_STROKE_NO_RESPONSE = 'The notes sheet was not saved because the request did not reach the server.'
