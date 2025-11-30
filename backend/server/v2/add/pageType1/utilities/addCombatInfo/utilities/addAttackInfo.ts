import query from "../../../../../../db/database"

const addAttackInfoSQL = `insert into v2Attacks (pageID, index) values ($1, $2);`

export default async function addAttackInfo(pageID: number) {
    return Promise.all([
        query(addAttackInfoSQL, [pageID, 0]),
        query(addAttackInfoSQL, [pageID, 1]),
        query(addAttackInfoSQL, [pageID, 2]),
        query(addAttackInfoSQL, [pageID, 3]),
    ])
}