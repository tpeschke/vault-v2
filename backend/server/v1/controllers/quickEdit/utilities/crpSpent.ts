import query from "../../../../db/database"

const saveCrpSpentSQL = 'update cvcharactermain set excurrent = $1 where id = $2'

export async function saveCrpSpent(characterID: number, crpSpent: number) {
    await query(saveCrpSpentSQL, [crpSpent, characterID])
    return true
}