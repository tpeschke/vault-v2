import addCharacteristics from "./utilities/addCharacteristics/addCharacteristics"
import addGeneralInfo from "./utilities/addGeneralInfo"
import addMovements from "./utilities/addMovement"
import addStats from "./utilities/addStats"
import addVitals from "./utilities/addVitals/addVitals"


export default async function addPageType1(characterID: number): Promise<boolean> {
    await Promise.all([
        addGeneralInfo(characterID),
        addStats(characterID),
        addCharacteristics(characterID),
        addMovements(characterID),
        addVitals(characterID)
    ])
    return true
}