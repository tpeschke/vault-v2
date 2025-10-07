import query from "../../../../../../db/database"

const saveCashSQL = 'update cvcharactermain set copper = $1, silver = $2, gold = $3, platinium = $4 where id = $5'

export async function saveCash(characterID: number, cash: number[]) {
    return query(saveCashSQL, [...cash, characterID])
}