import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { ArmorInfoObjectKeys, ArmorModifiersInfoKeys, ArmorModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/armorInterfaces"
import { CombatSkillObject } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills"
import { GearInfoObjectsKeys, GearObject } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces"
import { ShieldInfoObjectKeys, ShieldModifiersInfoKeys, ShieldModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/shieldInterfaces"
import { SkillObject } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces"
import { WeaponInfoObjectKeys, WeaponModifiersInfoKeys, WeaponModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/weaponInterfaces"
import { QuickEditActions } from "@vault/common/interfaces/v1/quickEdit"
import { SetCharacterInfoFunction, QuickSavingWithActionFunction, QuickSavingFunction } from "../../interfaces/CharacterHookInterfaces"
import { updateBasicArmorInfoUtility, updateArmorModifierUtility } from "../../utilities/updateUtilities/pageTwoUtilities/combatUtilities/armorUtilities"
import { updateMartialAdeptUtility, updateCombatSkillSuiteUtility, insertCombatSkillUtility, updateCombatSkillUtility } from "../../utilities/updateUtilities/pageTwoUtilities/combatUtilities/combatSkillUtilities"
import { updateBasicShieldInfoUtility, updateShieldModifierUtility } from "../../utilities/updateUtilities/pageTwoUtilities/combatUtilities/shieldUtilities"
import { updateBasicWeaponInfoUtility, updateWeaponModifierUtility } from "../../utilities/updateUtilities/pageTwoUtilities/combatUtilities/weaponUtilities"
import { updateCashUtility, updateGearUtility, insertGearUtility, updateGearWithID } from "../../utilities/updateUtilities/pageTwoUtilities/gearUtilities"
import { updateSkillAdeptUtility, updateSkillSuiteUtility, updateNativeLanguageUtility, insertSkillUtility, updateSkillUtility } from "../../utilities/updateUtilities/pageTwoUtilities/skillUtilities"
import { PageTwoUpdates } from "../../interfaces/pageTwoInterfaces/UpdateExportInterfaces"

export default function getPage2Updates(
    character: CharacterVersion1 | null,
    setCharacterInfo: SetCharacterInfoFunction,
    quickSavingWithAction: QuickSavingWithActionFunction,
    quickBasicQuickSaving: QuickSavingFunction
): PageTwoUpdates {
    function updateCash(key: GearInfoObjectsKeys, value: number) {
        if (character) {
            setCharacterInfo(updateCashUtility(character, key, value))

            quickBasicQuickSaving(['copper', 'silver', 'gold', 'platinum'], character.id, key, value)
        }
    }

    function updateGear(changedIndex: number, newGear: GearObject) {
        if (character) {
            setCharacterInfo(updateGearUtility(character, changedIndex, newGear))

            const action: QuickEditActions = newGear.item || newGear.size ? 'update' : 'delete'
            quickSavingWithAction(['equipment'], character.id, 'equipment', newGear, action)
        }
    }

    async function insertGear(newGear: GearObject) {
        if (character) {
            const newCharacter = insertGearUtility(character, newGear)
            setCharacterInfo(newCharacter)

            const { data } = await quickSavingWithAction(['equipment'], newCharacter.id, 'equipment', newGear, 'add')
            setCharacterInfo(updateGearWithID(newCharacter, data))
        }
    }

    function updateSkillAdept(value: number) {
        if (character) {
            setCharacterInfo(updateSkillAdeptUtility(character, value))
        }
    }

    function updateSkillSuite(changedIndex: number, newSkillSuite: SkillObject) {
        if (character) {
            setCharacterInfo(updateSkillSuiteUtility(character, changedIndex, newSkillSuite))
        }
    }

    function updateNativeLanguage(nativeLanguage: SkillObject) {
        if (character) {
            setCharacterInfo(updateNativeLanguageUtility(character, nativeLanguage))
        }
    }

    function insertSkill(newSkill: SkillObject) {
        if (character) {
            setCharacterInfo(insertSkillUtility(character, newSkill))
        }
    }

    function updateSkill(changedIndex: number, newSkill: SkillObject) {
        if (character) {
            setCharacterInfo(updateSkillUtility(character, changedIndex, newSkill))
        }
    }

    function updateMartialAdept(value: number) {
        if (character) {
            setCharacterInfo(updateMartialAdeptUtility(character, value))
        }
    }

    function updateCombatSkillSuite(changedIndex: number, alteredCombatSuite: CombatSkillObject) {
        if (character) {
            setCharacterInfo(updateCombatSkillSuiteUtility(character, changedIndex, alteredCombatSuite))
        }
    }

    function insertCombatSkill(newCombatSkill: CombatSkillObject) {
        if (character) {
            setCharacterInfo(insertCombatSkillUtility(character, newCombatSkill))
        }
    }

    function updateCombatSkill(changedIndex: number, newCombatSkill: CombatSkillObject) {
        if (character) {
            setCharacterInfo(updateCombatSkillUtility(character, changedIndex, newCombatSkill))
        }
    }

    function updateBasicArmorInfo(key: ArmorInfoObjectKeys, value: string | number) {
        if (character) {
            setCharacterInfo(updateBasicArmorInfoUtility(character, key, value))
        }
    }

    function updateArmorModifier(modifier: ArmorModifiersInfoKeys, key: ArmorModifiersObjectKeys, value: number) {
        if (character) {
            const newCharacter = updateArmorModifierUtility(character, modifier, key, value)
            setCharacterInfo(newCharacter)

            if (key === 'misc') {
                const { def, fat, rec, init } = newCharacter.pageTwoInfo.combatWorkspaceInfo.armorInfo.modifiers
                quickBasicQuickSaving(['armor'], character.id, 'armor', {
                    armorID: newCharacter.pageTwoInfo.combatWorkspaceInfo.armorInfo.id,
                    def: def.misc,
                    fat: fat.misc,
                    rec: rec.misc,
                    init: init.misc,
                    [modifier]: value
                })
            }
        }
    }

    function updateBasicShieldInfo(key: ShieldInfoObjectKeys, value: string | number) {
        if (character) {
            setCharacterInfo(updateBasicShieldInfoUtility(character, key, value))
        }
    }

    function updateShieldModifier(modifier: ShieldModifiersInfoKeys, key: ShieldModifiersObjectKeys, value: number) {
        if (character) {
            const newCharacter = updateShieldModifierUtility(character, modifier, key, value)
            setCharacterInfo(newCharacter)

            if (key === 'misc') {
                const { def, fat, pry, brk } = newCharacter.pageTwoInfo.combatWorkspaceInfo.shieldInfo.modifiers
                quickBasicQuickSaving(['shield'], character.id, 'shield', {
                    shieldID: newCharacter.pageTwoInfo.combatWorkspaceInfo.shieldInfo.id,
                    def: def.misc,
                    fat: fat.misc,
                    pry: pry.misc,
                    brk: brk.misc,
                    [modifier]: value
                })
            }
        }
    }

    function updateBasicWeaponInfo(changedIndex: number, key: WeaponInfoObjectKeys, value: string | number) {
        if (character) {
            setCharacterInfo(updateBasicWeaponInfoUtility(character, changedIndex, key, value))
        }
    }

    function updateWeaponModifier(changedIndex: number, modifier: WeaponModifiersInfoKeys, key: WeaponModifiersObjectKeys, value: number) {
        if (character) {
            const newCharacter = updateWeaponModifierUtility(character, changedIndex, modifier, key, value)
            setCharacterInfo(newCharacter)

            if (key === 'misc') {
                const { atk, rec, pry, dam } = newCharacter.pageTwoInfo.combatWorkspaceInfo.weaponInfo[changedIndex].modifiers
                quickBasicQuickSaving(['weapon'], character.id, 'weapon', {
                    weaponID: newCharacter.pageTwoInfo.combatWorkspaceInfo.weaponInfo[changedIndex].id,
                    position: changedIndex,
                    atk: atk.misc,
                    rec: rec.misc,
                    pry: pry.misc,
                    dam: dam.misc,
                    [modifier]: value
                })
            }
        }
    }

    return {
        updateCash,
        updateGear,
        insertGear,
        updateSkillInfo: {
            leftColumnUpdates: {
                updateSkillAdept,
                updateSkillSuite,
                updateNativeLanguage,
            },
            insertSkill,
            updateSkill
        },
        updateCombatInfo: {
            combatSkillUpdates: {
                updateMartialAdept,
                updateCombatSkillSuite,
                insertCombatSkill,
                updateCombatSkill
            },
            armorUpdates: {
                updateBasicArmorInfo,
                updateArmorModifier
            },
            shieldUpdates: {
                updateBasicShieldInfo,
                updateShieldModifier
            },
            weaponUpdates: {
                updateBasicWeaponInfo,
                updateWeaponModifier
            }
        }
    }
}