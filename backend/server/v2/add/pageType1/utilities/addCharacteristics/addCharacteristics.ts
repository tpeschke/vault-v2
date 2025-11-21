import addBasicCharacteristicInfo from "./utilities/addBasicCharacteristicInfo";
import addSocialSuites from "./utilities/addSocialSuites";

export default async function addCharacteristics(characterID: number) {
    return Promise.all([
        addBasicCharacteristicInfo(characterID),
        addSocialSuites(characterID)
    ])
}