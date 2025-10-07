import { CombatWorkspaceInfo } from "@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces"
import { saveArmorInfo } from "./armorInfo"

export async function saveCombatWorkspaceMain(combatWorkspaceInfo: CombatWorkspaceInfo) {
    const { armorInfo } = combatWorkspaceInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveArmorInfo(armorInfo))

    return Promise.all(promiseArray)
}