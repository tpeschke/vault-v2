import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { ArmorInfoObjectKeys, ArmorModifiersInfoKeys, ArmorModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/armorInterfaces";
import { calculateArmorDefenseTotal, calculateArmorFatigueTotal, calculateArmorRecoveryOrInitiativeTotal } from "@vault/common/utilities/v1/armorUtilities";

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
    let newModifiers = {
        ...character.pageTwoInfo.combatWorkspaceInfo.armorInfo.modifiers,
        [modifier]: {
            ...character.pageTwoInfo.combatWorkspaceInfo.armorInfo.modifiers[modifier],
            [key]: value
        }
    }

    newModifiers = {
        def: {
            ...newModifiers.def,
            total: calculateArmorDefenseTotal(newModifiers.def.base, newModifiers.def.skill, newModifiers.def.misc)
        },
        fat: {
            ...newModifiers.fat,
            total: calculateArmorFatigueTotal(newModifiers.fat.base, newModifiers.fat.skill, newModifiers.fat.misc)
        },
        rec: {
            ...newModifiers.rec,
            total: calculateArmorRecoveryOrInitiativeTotal(newModifiers.rec.base, newModifiers.rec.skill, newModifiers.rec.misc)
        },
        init: {
            ...newModifiers.init,
            total: calculateArmorRecoveryOrInitiativeTotal(newModifiers.init.base, newModifiers.init.skill, newModifiers.init.misc)
        }
    }

    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                armorInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.armorInfo,
                    modifiers: newModifiers
                }
            }
        }
    }
}