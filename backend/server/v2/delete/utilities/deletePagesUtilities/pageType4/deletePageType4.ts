import query from "../../../../../db/database"

const deleteNotesSQL = `delete from v2Page4Notes where pageID = $1`

export default async function deletePageType4(pageID: number) {
    return query(deleteNotesSQL, pageID)
}
