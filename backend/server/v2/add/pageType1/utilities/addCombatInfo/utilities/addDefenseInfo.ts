import query from "../../../../../../db/database";

const addDefenseInfoSQL = `insert into v2Defenses (characterID) values ($1)`

export default async function addDefenseInfo(characterID: number) {
    return query(addDefenseInfoSQL, characterID)
}