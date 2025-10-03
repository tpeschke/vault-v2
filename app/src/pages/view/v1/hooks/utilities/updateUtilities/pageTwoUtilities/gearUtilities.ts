import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { GearInfoObjectsKeys } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces";

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