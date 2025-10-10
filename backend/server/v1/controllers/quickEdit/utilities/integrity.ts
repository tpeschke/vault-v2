import query from "../../../../db/database"

const saveIntegritySQL = 'update cvcharactermain set honor = $1 where id = $2'

export async function saveIntegrity(characterID: number, integrity: number) {
    await query(saveIntegritySQL, [integrity, characterID])
    return true
}