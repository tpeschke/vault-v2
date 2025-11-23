import query from "../../../../../../db/database"

const addSelfDoubtSQL = `insert into v2SelfDoubt (characterID) values ($1)`

export default async function addSelfDoubt(characterID: number) {
    return query(addSelfDoubtSQL, characterID)
}