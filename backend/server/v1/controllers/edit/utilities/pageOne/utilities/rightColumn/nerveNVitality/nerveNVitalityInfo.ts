import { NerveAndVitalityInfo } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";
import query from "../../../../../../../../db/database";

const saveNeverAndVitalityInfoSQL = 'update cvcharactermain set stressthreshold = $1, vitality = $2, sizemod = $3 where id = $4'

export async function saveNeverAndVitalityInfo(characterID: number, nerveAndVitalityInfo: NerveAndVitalityInfo) {
    const { nerve, vitality, sizeMod } = nerveAndVitalityInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(query(saveNeverAndVitalityInfoSQL, [nerve, vitality, sizeMod, characterID])) 

    // vitalityNNerveCalcInfo
    // wounds

    return Promise.all(promiseArray)
}