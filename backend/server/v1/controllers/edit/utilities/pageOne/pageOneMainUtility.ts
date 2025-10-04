import { PageOneInfo } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";
import { saveGeneralInfo } from "./utilities/generalInfoUtility";

export async function savePageOneInfo(characterID: number, pageOneInfo: PageOneInfo) {
    const { generalInfo } = pageOneInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveGeneralInfo(characterID, generalInfo))

    return Promise.all(promiseArray)
}