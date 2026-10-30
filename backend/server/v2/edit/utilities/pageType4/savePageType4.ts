import { Page4 } from "@vault/common/interfaces/v2/pageTypes"
import query from "../../../../db/database"

const upsertNotesSQL = `insert into v2Page4Notes (pageID, scene) values ($1, $2)
on conflict (pageID) do update set scene = excluded.scene`

export default async function savePageType4(page: Page4): Promise<void> {
    await query(upsertNotesSQL, [page.pageID, page.scene])
}
