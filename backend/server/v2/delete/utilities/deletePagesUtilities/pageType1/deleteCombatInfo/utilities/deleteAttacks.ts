import query from "../../../../../../../db/database"

const deleteAttacksSQL = `delete from v2Attacks where pageID = $1`

export default async function deleteAttacks(pageID: number) {
    return query(deleteAttacksSQL, pageID)
}