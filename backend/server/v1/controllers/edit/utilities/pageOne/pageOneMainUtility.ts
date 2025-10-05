import { PageOneInfo } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";
import { saveGeneralInfo } from "./utilities/generalInfoUtility";
import { saveLeftColumnInfo } from "./utilities/leftColumn/leftColumnUtility";
import { saveRightColumnInfo } from "./utilities/rightColumn/rightColumnUtility";
import { saveAbilitiesNBurdens } from "./utilities/rightColumn/nerveNVitality/abilityNBurdens";

export async function savePageOneInfo(characterID: number, pageOneInfo: PageOneInfo) {
    const { generalInfo, leftColumnInfo, rightColumnInfo, abilitiesNBurdensInfo } = pageOneInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveGeneralInfo(characterID, generalInfo))
    promiseArray.push(saveLeftColumnInfo(characterID, leftColumnInfo))
    promiseArray.push(saveRightColumnInfo(characterID, rightColumnInfo))
    promiseArray.push(saveAbilitiesNBurdens(characterID, abilitiesNBurdensInfo))

    return Promise.all(promiseArray)
}