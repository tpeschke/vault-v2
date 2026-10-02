import query from "../../../../../../../db/database"

const deleteDescriptionsSQL = `delete from v2descriptions where pageID = $1`

export default async function deleteDescriptions(pageID: number) {
    return query(deleteDescriptionsSQL, pageID)
}
