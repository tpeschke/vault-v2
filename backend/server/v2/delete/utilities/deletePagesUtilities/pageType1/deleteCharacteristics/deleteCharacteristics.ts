import deleteBasicCharacteristics from "./utilities/deleteBasicCharacteristics";
import deleteConvictions from "./utilities/deleteConvictions";
import deleteFlaws from "./utilities/deleteFlaws";
import deleteGoals from "./utilities/deleteGoals";
import deleteRelationships from "./utilities/deleteRelationships";
import deleteReputations from "./utilities/deleteReputations";
import deleteSocialSuites from "./utilities/deleteSocialSuites";

export default async function deleteCharacteristics(pageID: number) {
    return Promise.all([
        deleteBasicCharacteristics(pageID),
        deleteConvictions(pageID),
        deleteFlaws(pageID),
        deleteGoals(pageID),
        deleteRelationships(pageID),
        deleteReputations(pageID),
        deleteSocialSuites(pageID)
    ])
}