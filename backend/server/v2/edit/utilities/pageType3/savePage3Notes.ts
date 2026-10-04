import query from "../../../../db/database"

const upsertSQL = `insert into v2Page3Basics (pageID, notes) values ($1, $2)
on conflict (pageID) do update set notes = excluded.notes`

export default async function savePage3Notes(pageID: number, notes: string): Promise<void> {
    await query(upsertSQL, [pageID, notes])
}
