import query from "../../../db/database"

const addNotesSQL = `insert into v2Page4Notes (pageID) values ($1)`

export default async function addPageType4(pageID: number): Promise<boolean> {
    await query(addNotesSQL, pageID)
    return true
}
