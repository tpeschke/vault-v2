import addCharacteristics from "./utilities/addCharacteristics/addCharacteristics"
import addCombatInfo from "./utilities/addCombatInfo/addCombatInfo"
import addFavor from "./utilities/addFavor"
import addGeneralInfo from "./utilities/addGeneralInfo"
import addMovements from "./utilities/addMovement"
import addStats from "./utilities/addStats"
import addVitals from "./utilities/addVitals/addVitals"

export default async function addPageType1(pageID: number): Promise<boolean> {
    await Promise.all([
        addGeneralInfo(pageID),
        addStats(pageID),
        addCharacteristics(pageID),
        addMovements(pageID),
        addVitals(pageID),
        addFavor(pageID),
        addCombatInfo(pageID)
    ])
    return true
}