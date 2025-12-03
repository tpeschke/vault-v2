import query from "../../../../../../../db/database"

const deleteFlawsSQL = `delete from v2flaws where pageID = $1`

export default async function deleteFlaws(pageID: number) {
    return query(deleteFlawsSQL, pageID)
}