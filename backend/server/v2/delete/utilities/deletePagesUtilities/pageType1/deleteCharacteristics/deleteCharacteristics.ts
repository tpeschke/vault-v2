import deleteBasicCharacteristics from "./utilities/deleteBasicCharacteristics";
import deleteDescriptions from "./utilities/deleteDescriptions";
import deleteFlaws from "./utilities/deleteFlaws";
import deleteGoals from "./utilities/deleteGoals";
import deleteRelationships from "./utilities/deleteRelationships";
import deleteReputations from "./utilities/deleteReputations";
import deleteSocialSuites from "./utilities/deleteSocialSuites";

export default async function deleteCharacteristics(pageID: number) {
    return Promise.all([
        deleteBasicCharacteristics(pageID),
        deleteDescriptions(pageID),
        deleteFlaws(pageID),
        deleteGoals(pageID),
        deleteRelationships(pageID),
        deleteReputations(pageID),
        deleteSocialSuites(pageID)
    ])
}