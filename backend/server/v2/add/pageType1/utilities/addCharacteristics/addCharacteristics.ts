import addBasicCharacteristicInfo from "./utilities/addBasicCharacteristicInfo";
import addSocialSuites from "./utilities/addSocialSuites";

export default async function addCharacteristics(pageID: number) {
    return Promise.all([
        addBasicCharacteristicInfo(pageID),
        addSocialSuites(pageID)
    ])
}