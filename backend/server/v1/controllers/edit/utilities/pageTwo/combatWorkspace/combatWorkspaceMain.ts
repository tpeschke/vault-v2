import { CombatWorkspaceInfo } from "@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces"
import { saveArmorInfo } from "./armorInfo"
import { saveShieldInfo } from "./shieldInfo"

export async function saveCombatWorkspaceMain(combatWorkspaceInfo: CombatWorkspaceInfo) {
    const { armorInfo, shieldInfo } = combatWorkspaceInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveArmorInfo(armorInfo))
    promiseArray.push(saveShieldInfo(shieldInfo))

    return Promise.all(promiseArray)
}