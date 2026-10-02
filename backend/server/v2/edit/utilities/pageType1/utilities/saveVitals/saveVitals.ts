import { Vitals } from "@vault/common/interfaces/v2/page1/vitals"
import saveDamage from "./utilities/saveDamage"
import saveSelfDoubt from "./utilities/saveSelfDoubt"
import saveStress from "./utilities/saveStress"

export default async function saveVitals(pageID: number, vitals: Vitals) {
    return Promise.all([
        saveSelfDoubt(pageID, vitals.selfDoubt),
        saveDamage(pageID, vitals.damage),
        saveStress(pageID, vitals.stress)
    ])
}
