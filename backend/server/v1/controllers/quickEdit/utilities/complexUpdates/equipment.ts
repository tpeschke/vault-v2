import { QuickEditActions } from "@vault/common/interfaces/v1/quickEdit"
import query from "../../../../../db/database"
import { GearObject } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces"

const deleteGearSQL = 'delete from cvgearone where id = $1'
const updateGearSQL = 'update cvgearone set title = $1, value = $2 where id = $3'
const saveGearSQL = 'insert into cvgearone (title, value, characterid) values ($1, $2, $3) returning id'

export async function saveGear(characterID: number, { id, key, item, size }: GearObject, action: QuickEditActions) {
    switch(action) {
        case 'add':
            const [newID] = await query(saveGearSQL, [item, size, characterID])
            return {
                id: newID.id,
                key
            }
        case 'update':
            await query(updateGearSQL, [item, size, id])
            return true
        case 'delete':
            await query(deleteGearSQL, id)
            return true
        default:
            return false
    }
}