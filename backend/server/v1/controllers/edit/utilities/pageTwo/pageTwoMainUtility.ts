import { PageTwoInfo } from "@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces"
import { saveGearInfo } from "./gearUtilities/gearMainUtility"
import { saveSkillInfo } from "./skillUtilities/skillInfoUtility"
import { saveCombatWorkspaceMain } from "./combatWorkspace/combatWorkspaceMain"

export async function savePageTwoInfo(characterID: number, pageTwoInfo: PageTwoInfo) {
    const { gearInfo, skillInfo, combatWorkspaceInfo } = pageTwoInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveGearInfo(characterID, gearInfo))
    promiseArray.push(saveSkillInfo(characterID, skillInfo))
    promiseArray.push(saveCombatWorkspaceMain(characterID, combatWorkspaceInfo))

    return Promise.all(promiseArray)
}