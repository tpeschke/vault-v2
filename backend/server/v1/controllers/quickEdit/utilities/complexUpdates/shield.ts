import { ShieldQuickEditModifiers } from "@vault/common/interfaces/v1/quickEdit"
import query from "../../../../../db/database"

const saveMiscModifierSQL = 'update cvshield set shieldmiscdef = $1, shieldmiscparry = $2, shieldmiscencumb = $3, shieldmiscbreak = $4 where shieldid = $5'

export async function saveMiscShieldMods(miscShield: ShieldQuickEditModifiers) {
    const { shieldID, def, fat, pry, brk } = miscShield

    await query(saveMiscModifierSQL, [def, pry, fat, brk, shieldID])

    return true
}