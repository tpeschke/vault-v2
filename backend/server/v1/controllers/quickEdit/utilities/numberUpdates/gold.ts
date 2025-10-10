import query from "../../../../../db/database"

const saveGoldSQL = 'update cvcharactermain set gold = $1 where id = $2'

export async function saveGold(characterID: number, gold: number): Promise<boolean> {
    await query(saveGoldSQL, [gold, characterID])
    return true
}