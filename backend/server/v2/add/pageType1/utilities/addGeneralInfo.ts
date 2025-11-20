import query from "../../../../db/database"

const insertPageType1GeneralInfoSQL = `insert into v2GeneralInfo (characterID) values ($1)`

export default async function addGeneralInfo(characterID: number) {
    return query(insertPageType1GeneralInfoSQL, characterID)
}