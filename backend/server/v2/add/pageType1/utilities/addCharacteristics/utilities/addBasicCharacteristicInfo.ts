import query from "../../../../../../db/database"

const addBasicCharacteristicInfoSQL = `insert into v2BasicCharacteristics (characterID) values ($1)`

export default async function addBasicCharacteristicInfo(characterID: number) {
    return query(addBasicCharacteristicInfoSQL, characterID)
}