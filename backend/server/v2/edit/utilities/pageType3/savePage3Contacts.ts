import query from "../../../../db/database"

const upsertSQL = `insert into v2Page3Basics (pageID, contacts) values ($1, $2)
on conflict (pageID) do update set contacts = excluded.contacts`

export default async function savePage3Contacts(pageID: number, contacts: string): Promise<void> {
    await query(upsertSQL, [pageID, contacts])
}
