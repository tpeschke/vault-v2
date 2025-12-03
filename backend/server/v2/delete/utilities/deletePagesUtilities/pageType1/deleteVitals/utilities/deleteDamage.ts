import query from "../../../../../../../db/database"

const deleteDamageSQL = `delete from v2Damage where pageID = $1`

export default async function deleteDamage(pageID: number) {
    return query(deleteDamageSQL, pageID)
}