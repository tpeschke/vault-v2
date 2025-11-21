import addCharacteristics from "./utilities/addCharacteristics/addCharacteristics"
import addGeneralInfo from "./utilities/addGeneralInfo"
import addStats from "./utilities/addStats"


export default async function addPageType1(characterID: number): Promise<boolean> {
    await Promise.all([
        addGeneralInfo(characterID),
        addStats(characterID),
        addCharacteristics(characterID)
    ])
    return true
}