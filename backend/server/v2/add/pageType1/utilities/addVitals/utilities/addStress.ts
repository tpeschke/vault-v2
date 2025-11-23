import query from "../../../../../../db/database"

const addStressSQL = `insert into v2Stress (characterID) values ($1)`

export default async function addStress(characterID: number) {
    return query(addStressSQL, characterID)
}