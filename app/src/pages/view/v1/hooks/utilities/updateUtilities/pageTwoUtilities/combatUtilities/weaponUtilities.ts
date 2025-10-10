import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { WeaponInfoObjectKeys, WeaponModifiersInfoKeys, WeaponModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/weaponInterfaces";
import { calculateWeaponAttack, calculateWeaponRecovery, calculateWeaponParry, calculateWeaponDamage } from '@vault/common/utilities/v1/weaponUtilities'

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
    let newWeaponInfo = character.pageTwoInfo.combatWorkspaceInfo.weaponInfo.map((info, index) => {
        if (index === changedIndex) {
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

    newWeaponInfo[changedIndex] = {
        ...newWeaponInfo[changedIndex],
        modifiers: {
            atk: {
                ...newWeaponInfo[changedIndex].modifiers.atk,
                total: calculateWeaponAttack(newWeaponInfo[changedIndex].modifiers.atk.skill, newWeaponInfo[changedIndex].modifiers.atk.misc)
            },
            rec: {
                ...newWeaponInfo[changedIndex].modifiers.rec,
                total: calculateWeaponRecovery(newWeaponInfo[changedIndex].modifiers.rec.skill, newWeaponInfo[changedIndex].modifiers.rec.misc)
            },
            pry: {
                ...newWeaponInfo[changedIndex].modifiers.pry,
                total: calculateWeaponParry(newWeaponInfo[changedIndex].modifiers.pry.skill, newWeaponInfo[changedIndex].modifiers.pry.misc)
            },
            dam: {
                ...newWeaponInfo[changedIndex].modifiers.dam,
                total: calculateWeaponDamage(newWeaponInfo[changedIndex].modifiers.dam.skill, newWeaponInfo[changedIndex].modifiers.dam.misc)
            }
        }
    }

    const newCharacter = {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                weaponInfo: newWeaponInfo
            }
        }
    }

    return {
        ...newCharacter,
        pageTwoInfo: {
            ...newCharacter.pageTwoInfo,
            combatWorkspaceInfo: {
                ...newCharacter.pageTwoInfo.combatWorkspaceInfo
            }
        }
    }
}