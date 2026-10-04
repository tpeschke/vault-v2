import { Page3 } from "@vault/common/interfaces/v2/pageTypes"
import {
    PAGE3_GEAR_SLOTS,
    Page3Contact,
    Page3Gear,
    Page3GearSlot,
    Page3Relationship,
    emptyGearCell,
    emptyPage3Coinage,
    emptyPage3Gear
} from "@vault/common/interfaces/v2/page3/page3Interfaces"
import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import query from "../../../../../db/database"

interface BasicsReturn {
    notes?: string | null
    copper?: number | null
    coppersize?: string | null
    silver?: number | null
    silversize?: string | null
    gold?: number | null
    goldsize?: string | null
    platinum?: number | null
    platinumsize?: string | null
}

interface ContactReturn {
    id: number
    value?: string | null
}

interface RelationshipReturn {
    id: number
    value?: string | null
    r?: number | null
    p?: number | null
}

interface GearReturn {
    slot: string
    item?: string | null
    size?: string | null
    staffsnake?: boolean | null
    meditating?: boolean | null
    w?: number | null
}

const getBasicsSQL = `select * from v2Page3Basics where pageID = $1`
const getContactsSQL = `select * from v2Page3Contacts where pageID = $1 order by index, id`
const getRelationshipsSQL = `select * from v2Page3Relationships where pageID = $1 order by index, id`
const getGearSQL = `select * from v2Page3Gear where pageID = $1`

function numberOrEmpty(value: number | null | undefined): SkillNumber {
    return value === null || value === undefined ? '' : value
}

const slotSet = new Set<string>(PAGE3_GEAR_SLOTS)

function mapGear(rows: GearReturn[]): Page3Gear {
    const gear = emptyPage3Gear()
    for (const row of rows ?? []) {
        if (!slotSet.has(row.slot)) { continue }
        const slot = row.slot as Page3GearSlot
        const fallback = emptyGearCell(slot)
        gear[slot] = {
            slot,
            item: row.item ?? '',
            size: row.size ?? fallback.size,
            staffSnake: !!row.staffsnake,
            meditating: !!row.meditating,
            w: numberOrEmpty(row.w)
        }
    }
    return gear
}

export default async function assemblePageType3(pageID: number): Promise<Page3> {
    const [basicsRows, contactRows, relationshipRows, gearRows]: [
        BasicsReturn[],
        ContactReturn[],
        RelationshipReturn[],
        GearReturn[]
    ] = await Promise.all([
        query(getBasicsSQL, pageID),
        query(getContactsSQL, pageID),
        query(getRelationshipsSQL, pageID),
        query(getGearSQL, pageID)
    ])

    const basics = basicsRows[0]
    const coinage = emptyPage3Coinage()
    if (basics) {
        coinage.copper = basics.copper ?? 0
        coinage.copperSize = basics.coppersize ?? ''
        coinage.silver = basics.silver ?? 0
        coinage.silverSize = basics.silversize ?? ''
        coinage.gold = basics.gold ?? 0
        coinage.goldSize = basics.goldsize ?? ''
        coinage.platinum = basics.platinum ?? 0
        coinage.platinumSize = basics.platinumsize ?? ''
    }

    return {
        type: 3,
        pageID,
        contacts: (contactRows ?? []).map((row): Page3Contact => ({
            id: row.id,
            value: row.value ?? ''
        })),
        relationships: (relationshipRows ?? []).map((row): Page3Relationship => ({
            id: row.id,
            value: row.value ?? '',
            r: numberOrEmpty(row.r),
            p: numberOrEmpty(row.p)
        })),
        gear: mapGear(gearRows ?? []),
        coinage,
        notes: basics?.notes ?? ''
    }
}
