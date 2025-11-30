import query from "../../../../db/database"

const addFavorSQL = `insert into v2Favor (pageID) values ($1)`

export default async function addFavor(pageID: number) {
    return query(addFavorSQL, pageID)
}