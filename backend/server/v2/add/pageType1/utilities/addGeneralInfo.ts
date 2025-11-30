import query from "../../../../db/database"

const insertPageType1GeneralInfoSQL = `insert into v2GeneralInfo (pageID) values ($1)`

export default async function addGeneralInfo(pageID: number) {
    return query(insertPageType1GeneralInfoSQL, pageID)
}