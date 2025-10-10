import query from "../../../../../db/database"

const saveFavorSQL = 'update cvcharactermain set currentfavor = $1 where id = $2'

export async function saveFavor(characterID: number, favor: number) {
    await query(saveFavorSQL, [favor, characterID])
    return true
}