import addBasicCharacteristicInfo from "./utilities/addBasicCharacteristicInfo";

export default async function addCharacteristics(characterID: number) {
    return Promise.all([
        addBasicCharacteristicInfo(characterID)
    ])
}