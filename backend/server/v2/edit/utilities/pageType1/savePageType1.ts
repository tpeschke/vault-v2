import { Page1 } from "@vault/common/interfaces/v2/pageTypes"
import saveCharacteristics from "./utilities/saveCharacteristics/saveCharacteristics"
import saveCombat from "./utilities/saveCombat/saveCombat"
import saveFavor from "./utilities/saveFavor"
import saveGeneralInfo from "./utilities/saveGeneralInfo"
import saveMovement from "./utilities/saveMovement"
import saveStats from "./utilities/saveStats"
import saveVitals from "./utilities/saveVitals/saveVitals"

export default async function savePageType1(page: Page1): Promise<void> {
    const { pageID, generalInfo, stats, characteristicsInfo, movement, vitalsInfo, favor, combatInfo } = page

    await Promise.all([
        saveGeneralInfo(pageID, generalInfo),
        saveStats(pageID, stats),
        saveCharacteristics(pageID, characteristicsInfo),
        saveMovement(pageID, movement),
        saveVitals(pageID, vitalsInfo),
        saveFavor(pageID, favor),
        saveCombat(pageID, combatInfo)
    ])
}
