import { Page3 } from "@vault/common/interfaces/v2/pageTypes"
import { PAGE3_GEAR_SLOTS, Page3Coinage } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import query from "../../../../db/database"
import savePage3Contacts from "./savePage3Contacts"
import savePage3Relationships from "./savePage3Relationships"

const upsertBasicsSQL = `insert into v2Page3Basics (
    pageID, notes, copper, copperSize, silver, silverSize, gold, goldSize, platinum, platinumSize
) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
on conflict (pageID) do update set
    notes = excluded.notes,
    copper = excluded.copper,
    copperSize = excluded.copperSize,
    silver = excluded.silver,
    silverSize = excluded.silverSize,
    gold = excluded.gold,
    goldSize = excluded.goldSize,
    platinum = excluded.platinum,
    platinumSize = excluded.platinumSize`

const upsertGearSQL = `insert into v2Page3Gear (
    pageID, slot, item, size, staffSnake, meditating, w
) values ($1, $2, $3, $4, $5, $6, $7)
on conflict (pageID, slot) do update set
    item = excluded.item,
    size = excluded.size,
    staffSnake = excluded.staffSnake,
    meditating = excluded.meditating,
    w = excluded.w`

function numberParam(value: SkillNumber) {
    return value === '' ? null : value
}

function coinageParams(coinage: Page3Coinage) {
    return [
        coinage.copper ?? 0,
        coinage.copperSize ?? '',
        coinage.silver ?? 0,
        coinage.silverSize ?? '',
        coinage.gold ?? 0,
        coinage.goldSize ?? '',
        coinage.platinum ?? 0,
        coinage.platinumSize ?? ''
    ]
}

export default async function savePageType3(page: Page3): Promise<void> {
    const { pageID, contacts, relationships, gear, coinage, notes } = page

    await query(upsertBasicsSQL, [pageID, notes ?? '', ...coinageParams(coinage)])
    await savePage3Contacts(pageID, contacts ?? [])
    await savePage3Relationships(pageID, relationships ?? [])
    await Promise.all(PAGE3_GEAR_SLOTS.map(slot => {
        const cell = gear[slot]
        return query(upsertGearSQL, [
            pageID,
            slot,
            cell?.item ?? '',
            cell?.size ?? '',
            !!cell?.staffSnake,
            !!cell?.meditating,
            numberParam(cell?.w ?? '')
        ])
    }))
}
