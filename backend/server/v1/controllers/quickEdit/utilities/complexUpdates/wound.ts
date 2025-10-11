import { Wound } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces"
import { QuickEditActions } from "@vault/common/interfaces/v1/quickEdit"
import query from "../../../../../db/database"

const deleteWoundsSQL = 'delete from damageone where id = $1'
const updateWoundSQL = 'update damageone set title = $1, value = $2 where id = $3'
const saveWoundSQL = 'insert into damageone (title, value, characterid) values ($1, $2, $3) returning id'

export async function saveWounds(characterID: number, { id, key, severity, days }: Wound, action: QuickEditActions) {
    switch(action) {
        case 'add':
            const [newID] = await query(saveWoundSQL, [severity, days, characterID])
            return {
                id: newID.id,
                key
            }
        case 'update':
            await query(updateWoundSQL, [severity, days, id])
            return true
        case 'delete':
            await query(deleteWoundsSQL, id)
            return true
        default:
            return false
    }
}