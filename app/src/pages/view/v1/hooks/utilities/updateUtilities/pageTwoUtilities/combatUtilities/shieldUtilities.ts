import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { ShieldInfoObjectKeys, ShieldModifiersInfoKeys, ShieldModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/shieldInterfaces";

export function updateBasicShieldInfoUtility(character: CharacterVersion1, key: ShieldInfoObjectKeys, value: string | number) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                shieldInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.shieldInfo,
                    [key]: value
                }
            }
        }
    }
}

export function updateShieldModifierUtility(character: CharacterVersion1, modifier: ShieldModifiersInfoKeys, key: ShieldModifiersObjectKeys, value: number) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                shieldInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.shieldInfo,
                    modifiers: {
                        ...character.pageTwoInfo.combatWorkspaceInfo.shieldInfo.modifiers,
                        [modifier]: {
                            ...character.pageTwoInfo.combatWorkspaceInfo.shieldInfo.modifiers[modifier],
                            [key]: value
                        }
                    }
                }
            }
        }
    }
}