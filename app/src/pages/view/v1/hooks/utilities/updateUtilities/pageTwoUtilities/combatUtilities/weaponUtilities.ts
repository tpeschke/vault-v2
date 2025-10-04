import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { WeaponInfoObjectKeys, WeaponModifiersInfoKeys, WeaponModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/weaponInterfaces";

export function updateBasicWeaponInfoUtility(character: CharacterVersion1, changedIndex: number, key: WeaponInfoObjectKeys, value: string | number) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                weaponInfo: character.pageTwoInfo.combatWorkspaceInfo.weaponInfo.map((info, index) => {
                    if (index === changedIndex) {
                        return {
                            ...info,
                            [key]: value
                        }
                    }
                    return info
                })
            }
        }
    }
}

export function updateWeaponModifierUtility(character: CharacterVersion1, changedIndex: number, modifier: WeaponModifiersInfoKeys, key: WeaponModifiersObjectKeys, value: number) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                weaponInfo: character.pageTwoInfo.combatWorkspaceInfo.weaponInfo.map((info, index) => {
                    if (index === changedIndex) {
                        console.log(info.modifiers[modifier][key], value)
                        return {
                            ...info,
                            modifiers: {
                                ...info.modifiers,
                                [modifier]: {
                                    ...info.modifiers[modifier],
                                    [key]: value
                                }
                            }
                        }
                    }
                    return info
                })
            }
        }
    }
}