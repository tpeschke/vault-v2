import query from "../../../../../db/database"

const saveNotesSQL = 'update cvcharactermain set generalnotes = $1 where id = $2'

export async function saveNotes(characterID: number, notes: string): Promise<boolean> {
    await query(saveNotesSQL, [notes, characterID])
    return true
}