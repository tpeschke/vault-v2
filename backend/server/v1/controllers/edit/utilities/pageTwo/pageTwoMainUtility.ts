import { PageTwoInfo } from "@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces"
import { saveGearInfo } from "./gearUtilities/gearMainUtility"

export async function savePageTwoInfo(characterID: number, pageTwoInfo: PageTwoInfo) {
    const { gearInfo } = pageTwoInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveGearInfo(characterID, gearInfo))

    return Promise.all(promiseArray)
}