import query from "../../../../../../../db/database"

const deleteStressSQL = `delete from v2Stress where pageID = $1`

export default async function deleteStress(pageID: number) {
    return query(deleteStressSQL, pageID)
}