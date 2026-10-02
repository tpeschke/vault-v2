import { Defense } from "@vault/common/interfaces/v2/page1/combatInfo"
import query from "../../../../../../../db/database"

const saveDefensesSQL = `update v2Defenses set name = $1, initiative = $2, defense = $3, parry = $4, flanks = $5, cover = $6, parryDR = $7, dr = $8, notes = $9 where pageID = $10`

export default async function saveDefenses(pageID: number, defenses: Defense) {
    const { name, initiative, defense, parry, flanks, cover, parryDR, dr, notes } = defenses
    return query(saveDefensesSQL, [name, initiative, defense, parry, flanks, cover, parryDR, dr, notes, pageID])
}
