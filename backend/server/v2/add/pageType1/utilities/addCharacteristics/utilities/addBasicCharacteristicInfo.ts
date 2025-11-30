import query from "../../../../../../db/database"

const addBasicCharacteristicInfoSQL = `insert into v2BasicCharacteristics (pageID) values ($1)`

export default async function addBasicCharacteristicInfo(pageID: number) {
    return query(addBasicCharacteristicInfoSQL, pageID)
}