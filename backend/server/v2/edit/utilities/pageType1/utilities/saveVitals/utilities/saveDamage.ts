import { Damage } from "@vault/common/interfaces/v2/page1/vitals"
import query from "../../../../../../../db/database"

const saveDamageSQL = `update v2Damage set dieIndex = $1, knockback = $2, damage = $3, threshold = $4 where pageID = $5`

export default async function saveDamage(pageID: number, damage: Damage) {
    const { dieIndex, knockback, damage: damageValue, threshold } = damage
    return query(saveDamageSQL, [dieIndex, knockback, damageValue, threshold, pageID])
}
