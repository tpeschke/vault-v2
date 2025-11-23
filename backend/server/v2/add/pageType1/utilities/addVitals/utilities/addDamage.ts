import query from "../../../../../../db/database"

const addDamageSQL = `insert into v2Damage (characterID) values ($1)`

export default async function addDamage(characterID: number) {
    return query(addDamageSQL, characterID)
}