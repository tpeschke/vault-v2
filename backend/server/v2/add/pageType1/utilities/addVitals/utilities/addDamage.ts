import query from "../../../../../../db/database"

const addDamageSQL = `insert into v2Damage (pageID) values ($1)`

export default async function addDamage(pageID: number) {
    return query(addDamageSQL, pageID)
}