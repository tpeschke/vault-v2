import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { ArmorInfoObjectKeys, ArmorModifiersInfoKeys, ArmorModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/armorInterfaces";

export function updateBasicArmorInfoUtility(character: CharacterVersion1, key: ArmorInfoObjectKeys, value: string | number) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                armorInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.armorInfo,
                    [key]: value
                }
            }
        }
    }
}

export function updateArmorModifierUtility(character: CharacterVersion1, modifier: ArmorModifiersInfoKeys, key: ArmorModifiersObjectKeys, value: number) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                armorInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.armorInfo,
                    modifiers: {
                        ...character.pageTwoInfo.combatWorkspaceInfo.armorInfo.modifiers,
                        [modifier]: {
                            ...character.pageTwoInfo.combatWorkspaceInfo.armorInfo.modifiers[modifier],
                            [key]: value
                        }
                    }
                }
            }
        }
    }
}