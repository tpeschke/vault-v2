import query from "../../../../../db/database"

const saveSilverSQL = 'update cvcharactermain set silver = $1 where id = $2'

export async function saveSilver(characterID: number, silver: number): Promise<boolean> {
    await query(saveSilverSQL, [silver, characterID])
    return true
}