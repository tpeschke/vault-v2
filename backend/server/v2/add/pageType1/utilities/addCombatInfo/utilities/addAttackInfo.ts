import query from "../../../../../../db/database"

const addAttackInfoSQL = `insert into v2Attacks (characterid, index) values ($1, $2);`

export default async function addAttackInfo(characterID: number) {
    return Promise.all([
        query(addAttackInfoSQL, [characterID, 0]),
        query(addAttackInfoSQL, [characterID, 1]),
        query(addAttackInfoSQL, [characterID, 2]),
        query(addAttackInfoSQL, [characterID, 3]),
    ])
}