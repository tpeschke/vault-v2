import { NOTES_SCENE_MAX_BYTES, NOTES_STROKE_MINT_FAILED, NOTES_STROKE_MISSING_PAGE, NOTES_STROKE_OVER_CAP, NOTES_STROKE_UNREADABLE } from "@vault/common/interfaces/v2/page4/notesScene"
import query from "../../../../db/database"

const updateSceneSQL = `update v2Page4Notes as notes
set scene = $1
from v2CharacterPages as pages
where notes.pageID = pages.id
  and pages.id = $2
  and pages.characterID = $3
  and pages.pageTypeID = 4
returning notes.pageID`

const shiftIndexSQL = `update v2CharacterPages set index = index + 1 where characterID = $1 and index >= $2`
const insertPageSQL = `insert into v2CharacterPages (index, pageTypeID, characterID) values ($1, 4, $2) returning id`
const insertNotesSQL = `insert into v2Page4Notes (pageID, scene) values ($1, $2) returning pageID`
const deletePageSQL = `delete from v2CharacterPages where id = $1 and characterID = $2`

export interface Page4SceneWrite {
    ok: true
    pageID?: number
}

export interface Page4SceneRefusal {
    ok: false
    message: string
}

function sceneRefusal(scene: string): string | null {
    if (typeof scene !== 'string') {
        return NOTES_STROKE_UNREADABLE
    }
    if (Buffer.byteLength(scene, 'utf8') > NOTES_SCENE_MAX_BYTES) {
        return NOTES_STROKE_OVER_CAP
    }
    if (scene === '') {
        return null
    }
    let parsed: unknown
    try {
        parsed = JSON.parse(scene)
    } catch {
        return NOTES_STROKE_UNREADABLE
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return NOTES_STROKE_UNREADABLE
    }
    if (!Array.isArray((parsed as { elements?: unknown }).elements)) {
        return NOTES_STROKE_UNREADABLE
    }
    return null
}

export default async function savePage4Scene(characterID: number, pageID: number, scene: string, index: unknown): Promise<Page4SceneWrite | Page4SceneRefusal> {
    const refused = sceneRefusal(scene)
    if (refused) {
        return { ok: false, message: refused }
    }
    if (!Number.isFinite(pageID)) {
        return { ok: false, message: NOTES_STROKE_MISSING_PAGE }
    }

    if (pageID > 0) {
        const updated = await query(updateSceneSQL, [scene, pageID, characterID])
        if (!updated.length) {
            return { ok: false, message: NOTES_STROKE_MISSING_PAGE }
        }
        return { ok: true }
    }

    if (typeof index !== 'number' || !Number.isInteger(index) || index < 0) {
        return { ok: false, message: NOTES_STROKE_MINT_FAILED }
    }

    await query(shiftIndexSQL, [characterID, index])
    const minted = await query(insertPageSQL, [index, characterID])
    const id = minted[0]?.id
    if (typeof id !== 'number' || id <= 0) {
        return { ok: false, message: NOTES_STROKE_MINT_FAILED }
    }
    const notes = await query(insertNotesSQL, [id, scene])
    if (!notes.length) {
        await query(deletePageSQL, [id, characterID])
        return { ok: false, message: NOTES_STROKE_MINT_FAILED }
    }
    return { ok: true, pageID: id }
}
