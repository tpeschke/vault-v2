import { ArmorQuickEditModifiers } from "@vault/common/interfaces/v1/quickEdit"
import query from "../../../../../db/database"

const saveMiscModifierSQL = 'update cvarmor set armormiscdef = $1, armormiscrecovery = $2, armormiscencumb = $3, armormiscinit = $4 where armorid = $5'

export async function saveMiscArmorMods(miscArmor: ArmorQuickEditModifiers) {
    const { armorID, def, fat, rec, init } = miscArmor

    await query(saveMiscModifierSQL, [def, rec, fat, init, armorID])

    return true
}