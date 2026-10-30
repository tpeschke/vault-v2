import { Page3Coinage } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import query from "../../../../db/database"

const upsertSQL = `insert into v2Page3Basics (
    pageID, copper, copperSize, silver, silverSize, gold, goldSize, platinum, platinumSize
) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
on conflict (pageID) do update set
    copper = excluded.copper,
    copperSize = excluded.copperSize,
    silver = excluded.silver,
    silverSize = excluded.silverSize,
    gold = excluded.gold,
    goldSize = excluded.goldSize,
    platinum = excluded.platinum,
    platinumSize = excluded.platinumSize`

export default async function savePage3Coinage(pageID: number, coinage: Page3Coinage): Promise<void> {
    await query(upsertSQL, [
        pageID,
        coinage.copper ?? 0,
        coinage.copperSize ?? '',
        coinage.silver ?? 0,
        coinage.silverSize ?? '',
        coinage.gold ?? 0,
        coinage.goldSize ?? '',
        coinage.platinum ?? 0,
        coinage.platinumSize ?? ''
    ])
}
