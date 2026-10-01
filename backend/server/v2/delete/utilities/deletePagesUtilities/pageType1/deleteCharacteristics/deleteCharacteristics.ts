import deleteBasicCharacteristics from "./utilities/deleteBasicCharacteristics";
import deleteCurrentEmotions from "./utilities/deleteCurrentEmotions";
import deleteDescriptions from "./utilities/deleteDescriptions";
import deleteFlaws from "./utilities/deleteFlaws";
import deleteGoals from "./utilities/deleteGoals";
import deleteRelationships from "./utilities/deleteRelationships";
import deleteReputations from "./utilities/deleteReputations";
import deleteSocialSuites from "./utilities/deleteSocialSuites";

export default async function deleteCharacteristics(pageID: number) {
    return Promise.all([
        deleteBasicCharacteristics(pageID),
        deleteCurrentEmotions(pageID),
        deleteDescriptions(pageID),
        deleteFlaws(pageID),
        deleteGoals(pageID),
        deleteRelationships(pageID),
        deleteReputations(pageID),
        deleteSocialSuites(pageID)
    ])
}