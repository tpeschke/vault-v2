import query from "../../../../../../db/database";

const addDefenseInfoSQL = `insert into v2Defenses (pageID) values ($1)`

export default async function addDefenseInfo(pageID: number) {
    return query(addDefenseInfoSQL, pageID)
}