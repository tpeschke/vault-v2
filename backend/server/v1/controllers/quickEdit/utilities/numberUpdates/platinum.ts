import query from "../../../../../db/database"

const savePlatinumSQL = 'update cvcharactermain set platinium = $1 where id = $2'

export async function savePlatinum(characterID: number, platinum: number): Promise<boolean> {
    await query(savePlatinumSQL, [platinum, characterID])
    return true
}