import query from "../../../../../../../db/database"

const deleteCurrentEmotionsSQL = `delete from v2currentEmotions where pageID = $1`

export default async function deleteCurrentEmotions(pageID: number) {
    return query(deleteCurrentEmotionsSQL, pageID)
}
