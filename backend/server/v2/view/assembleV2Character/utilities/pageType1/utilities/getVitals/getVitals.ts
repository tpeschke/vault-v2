import { Vitals } from "@vault/common/interfaces/v2/page1/vitals"
import getSelfDoubt from "./utilities/getSelfDoubt"
import getDamage from "./utilities/getDamage"
import getStress from "./utilities/getStress"

export default async function getVitals(pageID: number): Promise<Vitals> {
    let vitalsInfo: Vitals = {
            selfDoubt: {
                dieIndex: 0,
                threshold: 0,
                diePenalty: 0
            },
            damage: {
                dieIndex: 0,
                knockback: 0,
                damage: 0,
                threshold: 0
            },
            stress: {
                dieIndex: 0,
                stress: 0,
                threshold: 0
            }
        }

    await Promise.all([
        getSelfDoubt(pageID).then(selfDoubt => vitalsInfo.selfDoubt = selfDoubt),
        getDamage(pageID).then(damage => vitalsInfo.damage = damage),
        getStress(pageID).then(stress => vitalsInfo.stress = stress)
    ])
    
    return vitalsInfo
}