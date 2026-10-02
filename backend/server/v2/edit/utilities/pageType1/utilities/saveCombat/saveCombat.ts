import { CombatInfo } from "@vault/common/interfaces/v2/page1/combatInfo"
import saveAttacks from "./utilities/saveAttacks"
import saveDefenses from "./utilities/saveDefenses"

export default async function saveCombat(pageID: number, combatInfo: CombatInfo) {
    return Promise.all([
        saveDefenses(pageID, combatInfo.defenses),
        saveAttacks(pageID, combatInfo.attacks)
    ])
}
