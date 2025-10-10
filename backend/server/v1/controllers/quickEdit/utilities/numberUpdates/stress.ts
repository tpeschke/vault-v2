import query from "../../../../../db/database"

const saveStressSQL = 'update cvcharactermain set currentstress = $1 where id = $2'

export async function saveStress(characterID: number, stress: number) {
    await query(saveStressSQL, [stress, characterID])
    return true
}