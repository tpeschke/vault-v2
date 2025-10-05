import { PageOneInfo } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";
import { saveGeneralInfo } from "./utilities/generalInfoUtility";
import { saveLeftColumnInfo } from "./utilities/leftColumn/leftColumnUtility";

export async function savePageOneInfo(characterID: number, pageOneInfo: PageOneInfo) {
    const { generalInfo, leftColumnInfo } = pageOneInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveGeneralInfo(characterID, generalInfo))
    promiseArray.push(saveLeftColumnInfo(characterID, leftColumnInfo))

    return Promise.all(promiseArray)
}