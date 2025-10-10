import query from "../../../../../db/database"

const saveUnspentCrpSQL = 'update cvcharactermain set crp = $1 where id = $2'

export async function saveUnspentCrp(characterID: number, crpUnspent: number): Promise<boolean> {
    await query(saveUnspentCrpSQL, [crpUnspent, characterID])
    return true
}