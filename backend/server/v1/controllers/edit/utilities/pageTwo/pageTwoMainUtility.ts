import { PageTwoInfo } from "@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces"
import { saveGearInfo } from "./gearUtilities/gearMainUtility"
import { saveSkillInfo } from "./skillUtilities/skillInfoUtility"

export async function savePageTwoInfo(characterID: number, pageTwoInfo: PageTwoInfo) {
    const { gearInfo, skillInfo } = pageTwoInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveGearInfo(characterID, gearInfo))
    promiseArray.push(saveSkillInfo(characterID, skillInfo))

    return Promise.all(promiseArray)
}