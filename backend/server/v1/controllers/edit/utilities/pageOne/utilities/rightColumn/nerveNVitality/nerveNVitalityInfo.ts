import { NerveAndVitalityInfo } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";
import query from "../../../../../../../../db/database";
import { saveWounds } from "./woundInfo";

const saveNerveAndVitalityInfoSQL = 'update cvcharactermain set stressthreshold = $1, vitality = $2, sizemod = $3 where id = $4'
const saveNerveAndVitalityDieSQL = 'update cvcharactermain set vitalitydice = $1, stressdie = $2 where id = $3'

export async function saveNerveAndVitalityInfo(characterID: number, nerveAndVitalityInfo: NerveAndVitalityInfo) {
    const { nerve, vitality, sizeMod, vitalityNNerveCalcInfo, wounds } = nerveAndVitalityInfo
    const { vitalityDie, nerveDie } = vitalityNNerveCalcInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(query(saveNerveAndVitalityInfoSQL, [nerve, vitality, sizeMod, characterID])) 
    promiseArray.push(query(saveNerveAndVitalityDieSQL, [vitalityDie, nerveDie, characterID])) 
    promiseArray.push(saveWounds(characterID, wounds))

    return Promise.all(promiseArray)
}