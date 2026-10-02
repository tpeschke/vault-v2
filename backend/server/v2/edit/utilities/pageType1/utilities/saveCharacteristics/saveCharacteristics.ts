import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import saveBasicCharacteristics from "./utilities/saveBasicCharacteristics"
import saveCurrentEmotions from "./utilities/saveCurrentEmotions"
import saveDescriptions from "./utilities/saveDescriptions"
import saveFlaws from "./utilities/saveFlaws"
import saveGoals from "./utilities/saveGoals"
import saveRelationships from "./utilities/saveRelationships"
import saveReputations from "./utilities/saveReputations"
import saveSocialSuites from "./utilities/saveSocialSuites"

export default async function saveCharacteristics(pageID: number, characteristics: Characteristics) {
    return Promise.all([
        saveBasicCharacteristics(pageID, characteristics),
        saveCurrentEmotions(pageID, characteristics.currentEmotions ?? []),
        saveDescriptions(pageID, characteristics.descriptions ?? []),
        saveFlaws(pageID, characteristics.flaws ?? []),
        saveGoals(pageID, characteristics.goals ?? []),
        saveRelationships(pageID, characteristics.relationships ?? []),
        saveReputations(pageID, characteristics.reputations ?? []),
        saveSocialSuites(pageID, characteristics.socialSuites)
    ])
}
