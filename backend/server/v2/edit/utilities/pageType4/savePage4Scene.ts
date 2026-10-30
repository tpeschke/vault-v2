import notesScenesWithinCap from "./notesScenesWithinCap"
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
    capped: boolean
}

function sceneWithinCap(scene: string): boolean {
    return notesScenesWithinCap([{ type: 4, pageID: 0, scene }])
}

export default async function savePage4Scene(characterID: number, pageID: number, scene: string, index: unknown): Promise<Page4SceneWrite | Page4SceneRefusal> {
    if (!Number.isFinite(pageID) || typeof scene !== 'string' || !sceneWithinCap(scene)) {
        return { ok: false, capped: typeof scene === 'string' && !sceneWithinCap(scene) }
    }

    if (pageID > 0) {
        const updated = await query(updateSceneSQL, [scene, pageID, characterID])
        if (!updated.length) {
            return { ok: false, capped: false }
        }
        return { ok: true }
    }

    if (typeof index !== 'number' || !Number.isInteger(index) || index < 0) {
        return { ok: false, capped: false }
    }

    await query(shiftIndexSQL, [characterID, index])
    const minted = await query(insertPageSQL, [index, characterID])
    const id = minted[0]?.id
    if (typeof id !== 'number' || id <= 0) {
        return { ok: false, capped: false }
    }
    const notes = await query(insertNotesSQL, [id, scene])
    if (!notes.length) {
        await query(deletePageSQL, [id, characterID])
        return { ok: false, capped: false }
    }
    return { ok: true, pageID: id }
}
