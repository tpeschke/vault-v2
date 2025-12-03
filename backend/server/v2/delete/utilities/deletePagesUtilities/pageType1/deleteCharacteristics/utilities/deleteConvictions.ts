import query from "../../../../../../../db/database"

const deleteConvictionsSQL = `delete from v2convictions where pageID = $1`

export default async function deleteConvictions(pageID: number) {
    return query(deleteConvictionsSQL, pageID)
}