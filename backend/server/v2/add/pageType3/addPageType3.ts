import { PAGE3_GEAR_SLOTS, isDefaultSSlot } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import query from "../../../db/database"

const addBasicsSQL = `insert into v2Page3Basics (pageID) values ($1)`
const addGearSQL = `insert into v2Page3Gear (pageID, slot, size) values ($1, $2, $3)`

export default async function addPageType3(pageID: number): Promise<boolean> {
    await Promise.all([
        query(addBasicsSQL, pageID),
        ...PAGE3_GEAR_SLOTS.map(slot => query(addGearSQL, [pageID, slot, isDefaultSSlot(slot) ? 'S' : '']))
    ])
    return true
}
