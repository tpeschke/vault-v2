import query from "../../../../../db/database"

const saveCopperSQL = 'update cvcharactermain set copper = $1 where id = $2'

export async function saveCopper(characterID: number, copper: number): Promise<boolean> {
    await query(saveCopperSQL, [copper, characterID])
    return true
}