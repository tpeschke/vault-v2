import { CombatInfo } from "@vault/common/interfaces/v2/page1/combatInfo";
import getDefenses from "./utilities/getDefenses";
import getAttacks from "./utilities/getAttacks";

export default async function getCombatInfo(pageID: number): Promise<CombatInfo> {
    let combatInfo: CombatInfo = {
        defenses: {
            name: '',
            initiative: 0,
            defense: 0,
            parry: 0,
            flanks: 0,
            cover: '',
            parryDR: '',
            dr: '',
            notes: ''
        },
        attacks: [
            {
                index: 0,
                name: '',
                measure: 0,
                attack: 0,
                damage: '',
                type: '',
                recovery: 0,
                notes: '',
            },
            {
                index: 1,
                name: '',
                measure: 0,
                attack: 0,
                damage: '',
                type: '',
                recovery: 0,
                notes: '',
            },
            {
                index: 2,
                name: '',
                measure: 0,
                attack: 0,
                damage: '',
                type: '',
                recovery: 0,
                notes: '',
            },
            {
                index: 3,
                name: '',
                measure: 0,
                attack: 0,
                damage: '',
                type: '',
                recovery: 0,
                notes: '',
            }
        ]
    }

    await Promise.all([
        getDefenses(pageID).then(defenses => combatInfo.defenses = defenses),
        getAttacks(pageID).then(attacks => combatInfo.attacks = attacks)
    ])

    return combatInfo
}