import query from "../../../../../../db/database"

const addSelfDoubtSQL = `insert into v2SelfDoubt (pageID) values ($1)`

export default async function addSelfDoubt(pageID: number) {
    return query(addSelfDoubtSQL, pageID)
}