import deleteCharacteristics from "./pageType1/deleteCharacteristics/deleteCharacteristics";
import deleteCombatInfo from "./pageType1/deleteCombatInfo/deleteCombatInfo";
import deleteVitals from "./pageType1/deleteVitals/deleteVitals";

export default async function deletePageType1(pageID: number) {
    return Promise.all([
        deleteCharacteristics(pageID),
        deleteCombatInfo(pageID),
        deleteVitals(pageID)
    ])
}