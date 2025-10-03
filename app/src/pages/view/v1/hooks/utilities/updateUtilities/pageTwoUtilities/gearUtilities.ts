import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { GearInfoObjectsKeys, GearObject } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces";

export function updateCashUtility(character: CharacterVersion1, key: GearInfoObjectsKeys, value: number) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            gearInfo: {
                ...character.pageTwoInfo.gearInfo,
                [key]: value
            }
        }
    }
}

export function insertGearUtility(character: CharacterVersion1, newGear: GearObject) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            gearInfo: {
                ...character.pageTwoInfo.gearInfo,
                gear: [
                    ...character.pageTwoInfo.gearInfo.gear,
                    newGear
                ]
            }
        }
    }
}

export function updateGearUtility(character: CharacterVersion1, changedIndex: number, newGear: GearObject) {
    const alteredArray = alterGearArray(character.pageTwoInfo.gearInfo.gear, changedIndex, newGear)

    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            gearInfo: {
                ...character.pageTwoInfo.gearInfo,
                gear: alteredArray
            }
        }
    }
}

function alterGearArray(gearArray: GearObject[], changedIndex: number, newGear: GearObject) {
    if (newGear.item || newGear.size) {
        return gearArray.map((object, index) => {
            if (index === changedIndex) {
                return newGear
            }
            return object
        })
    }

    return gearArray.filter((_, index) => index !== changedIndex)
}
