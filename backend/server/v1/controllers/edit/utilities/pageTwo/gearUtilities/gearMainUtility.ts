import { GearInfo } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces"
import { saveCash } from "./cash"
import { saveGearObject } from "./gearInfo"

export async function saveGearInfo(characterID: number, gearInfo: GearInfo) {
    const { copper, silver, gold, platinum, gear } = gearInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveCash(characterID, [copper, silver, gold, platinum]))
    promiseArray.push(saveGearObject(characterID, gear))

    return Promise.all(promiseArray)
}