import query from "../../../../../../../db/database"

const deleteDefenseSQL = `delete from v2Defenses where pageID = $1`

export default async function deleteDefenses(pageID: number) {
    return query(deleteDefenseSQL, pageID)
}