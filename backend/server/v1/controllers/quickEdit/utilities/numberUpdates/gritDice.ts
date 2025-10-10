import query from "../../../../../db/database"

const saveGritDiceSQL = 'update cvcharactermain set extrahonordice = $1 where id = $2'

export async function saveGritDice(characterID: number, gritDice: number) {
    await query(saveGritDiceSQL, [gritDice, characterID])
    return true
}