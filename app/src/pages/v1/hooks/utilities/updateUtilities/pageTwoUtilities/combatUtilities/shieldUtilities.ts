import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { ShieldInfoObjectKeys, ShieldModifiersInfoKeys, ShieldModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/shieldInterfaces";
import { calculateShieldDefense, calculateShieldFatigue, calculateShieldParry, calculateShieldBreakage } from '@vault/common/utilities/v1/shieldUtilities'
import { updateWeaponTablesWithoutMods } from "../../pageOneUtilities/updateWeaponTables";

export function updateBasicShieldInfoUtility(character: CharacterVersion1, key: ShieldInfoObjectKeys, value: string | number) {
    const newCharacter = {
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

    return {
        ...newCharacter,
        pageOneInfo: {
            ...newCharacter.pageOneInfo,
            rightColumnInfo: {
                ...newCharacter.pageOneInfo.rightColumnInfo,
                weapons: updateWeaponTablesWithoutMods(newCharacter)
            }
        }
    }
}

export function updateShieldModifierUtility(character: CharacterVersion1, modifier: ShieldModifiersInfoKeys, key: ShieldModifiersObjectKeys, value: number) {
    let newModifiers = {
        ...character.pageTwoInfo.combatWorkspaceInfo.shieldInfo.modifiers,
        [modifier]: {
            ...character.pageTwoInfo.combatWorkspaceInfo.shieldInfo.modifiers[modifier],
            [key]: value
        }
    }

    newModifiers = {
        def: {
            ...newModifiers.def,
            total: calculateShieldDefense(newModifiers.def.base, newModifiers.def.misc)
        },
        fat: {
            ...newModifiers.fat,
            total: calculateShieldFatigue(newModifiers.fat.base, newModifiers.fat.skill, newModifiers.fat.misc)
        },
        pry: {
            ...newModifiers.pry,
            total: calculateShieldParry(newModifiers.pry.base, newModifiers.pry.skill, newModifiers.pry.misc)
        },
        brk: {
            ...newModifiers.brk,
            total: calculateShieldBreakage(newModifiers.brk.base, newModifiers.brk.skill, newModifiers.brk.misc)
        }
    }

    const newCharacter = {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                shieldInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.shieldInfo,
                    modifiers: newModifiers
                }
            }
        }
    }

    return {
        ...newCharacter,
        pageOneInfo: {
            ...newCharacter.pageOneInfo,
            rightColumnInfo: {
                ...newCharacter.pageOneInfo.rightColumnInfo,
                weapons: updateWeaponTablesWithoutMods(newCharacter)
            }
        }
    }
}