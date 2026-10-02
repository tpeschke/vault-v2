import { AttacksArray } from "@vault/common/interfaces/v2/page1/combatInfo"
import query from "../../../../../../../db/database"

const saveAttackSQL = `update v2Attacks set name = $1, measure = $2, attack = $3, damage = $4, type = $5, recovery = $6, notes = $7 where pageID = $8 and index = $9`

export default async function saveAttacks(pageID: number, attacks: AttacksArray) {
    return Promise.all(attacks.map(({ index, name, measure, attack, damage, type, recovery, notes }) => (
        query(saveAttackSQL, [name, measure, attack, damage, type, recovery, notes, pageID, index])
    )))
}
