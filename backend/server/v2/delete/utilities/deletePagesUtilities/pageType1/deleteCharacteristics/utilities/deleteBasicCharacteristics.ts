import query from "../../../../../../../db/database"

const deleteBasicCharacteristicsSQL = `delete from v2BasicCharacteristics where pageID = $1`

export default async function deleteBasicCharacteristics(pageID: number) {
    return query(deleteBasicCharacteristicsSQL, pageID)
}