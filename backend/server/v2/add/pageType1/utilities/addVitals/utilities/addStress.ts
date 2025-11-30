import query from "../../../../../../db/database"

const addStressSQL = `insert into v2Stress (pageID) values ($1)`

export default async function addStress(pageID: number) {
    return query(addStressSQL, pageID)
}