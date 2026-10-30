import { PAGE3_GEAR_SLOTS, Page3GearSlot, emptyGearCell } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import { Page3GearValue } from "@vault/common/interfaces/v2/page1/viewPersist"
import query from "../../../../db/database"

const existingSQL = `select item, size, staffSnake, meditating, w from v2Page3Gear where pageID = $1 and slot = $2`
const upsertSQL = `insert into v2Page3Gear (
    pageID, slot, item, size, staffSnake, meditating, w
) values ($1, $2, $3, $4, $5, $6, $7)
on conflict (pageID, slot) do update set
    item = excluded.item,
    size = excluded.size,
    staffSnake = excluded.staffSnake,
    meditating = excluded.meditating,
    w = excluded.w`

const slotSet = new Set<string>(PAGE3_GEAR_SLOTS)

export function isPage3GearSlot(slot: string): slot is Page3GearSlot {
    return slotSet.has(slot)
}

export default async function savePage3GearField(pageID: number, patch: Page3GearValue): Promise<void> {
    const existing = await query(existingSQL, [pageID, patch.slot])
    const fallback = emptyGearCell(patch.slot)
    const row = existing[0]
    const item = patch.item ?? row?.item ?? fallback.item
    const size = patch.size ?? row?.size ?? fallback.size
    const staffSnake = patch.staffSnake ?? row?.staffsnake ?? fallback.staffSnake
    const meditating = patch.meditating ?? row?.meditating ?? fallback.meditating
    const w: SkillNumber = patch.w !== undefined
        ? patch.w
        : (row?.w === null || row?.w === undefined ? fallback.w : row.w)
    await query(upsertSQL, [
        pageID,
        patch.slot,
        item,
        size,
        !!staffSnake,
        !!meditating,
        w === '' ? null : w
    ])
}
