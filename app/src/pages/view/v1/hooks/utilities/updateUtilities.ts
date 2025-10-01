import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"

export function alterCharacteristicArray(characteristicArray: PairObject[], changedIndex: number, newObject: PairObject) {
    if ((newObject.title && newObject.title !== '') || newObject.value !== '') {
        return characteristicArray.map((object, index) => {
            if (index === changedIndex) {
                return newObject
            }
            return object
        })
    }

    return characteristicArray.filter((_, index) => index !== changedIndex)
}
