import query from "../../../../../db/database"

const deleteGeneralInfoSQL = `delete from v2GeneralInfo where pageID = $1`

export default async function deleteGeneralInfo(pageID: number) {
    return query(deleteGeneralInfoSQL, pageID)
}