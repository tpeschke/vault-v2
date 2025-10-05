import { PageOneInfo } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";
import { saveGeneralInfo } from "./utilities/generalInfoUtility";
import { saveLeftColumnInfo } from "./utilities/leftColumn/leftColumnUtility";
import { saveRightColumnInfo } from "./utilities/rightColumn/rightColumnUtility";

export async function savePageOneInfo(characterID: number, pageOneInfo: PageOneInfo) {
    const { generalInfo, leftColumnInfo, rightColumnInfo } = pageOneInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveGeneralInfo(characterID, generalInfo))
    promiseArray.push(saveLeftColumnInfo(characterID, leftColumnInfo))
    promiseArray.push(saveRightColumnInfo(characterID, rightColumnInfo))

    return Promise.all(promiseArray)
}