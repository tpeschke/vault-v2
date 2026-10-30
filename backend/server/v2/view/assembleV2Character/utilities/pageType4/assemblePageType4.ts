import { Page4 } from "@vault/common/interfaces/v2/pageTypes"
import query from "../../../../../db/database"

const getNotesSQL = `select scene from v2Page4Notes where pageID = $1`

interface NotesReturn {
    scene?: string | null
}

export default async function assemblePageType4(pageID: number): Promise<Page4> {
    const rows: NotesReturn[] = await query(getNotesSQL, pageID)
    const scene = rows[0]?.scene
    return {
        type: 4,
        pageID,
        scene: typeof scene === 'string' ? scene : ''
    }
}
