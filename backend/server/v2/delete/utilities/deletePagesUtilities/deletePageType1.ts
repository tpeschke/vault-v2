import deleteCharacteristics from "./pageType1/deleteCharacteristics/deleteCharacteristics";
import deleteCombatInfo from "./pageType1/deleteCombatInfo/deleteCombatInfo";
import deleteFavor from "./pageType1/deleteFavor";
import deleteGeneralInfo from "./pageType1/deleteGeneralInfo";
import deleteMovement from "./pageType1/deleteMovement";
import deleteStats from "./pageType1/deleteStats";
import deleteVitals from "./pageType1/deleteVitals/deleteVitals";

export default async function deletePageType1(pageID: number) {
    return Promise.all([
        deleteCharacteristics(pageID),
        deleteCombatInfo(pageID),
        deleteVitals(pageID),
        deleteFavor(pageID),
        deleteGeneralInfo(pageID),
        deleteMovement(pageID),
        deleteStats(pageID)
    ])
}