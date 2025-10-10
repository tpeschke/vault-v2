import getCarry from "@vault/common/dictionaries/v1/carry";
import { findCarryFromQuarterMastering, findInitiativeSkillMod } from "@vault/common/dictionaries/v1/findSkills";
import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { SkillObject } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces";
import { updateWeaponTablesWithoutMods } from "../pageOneUtilities/updateWeaponTables";

export function updateSkillAdeptUtility(character: CharacterVersion1, value: number) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            skillInfo: {
                ...character.pageTwoInfo.skillInfo,
                adepts: value
            }
        }
    }
}

export function updateSkillSuiteUtility(character: CharacterVersion1, changedIndex: number, alteredSkillSuite: SkillObject) {
    const newCharacter = {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            skillInfo: {
                ...character.pageTwoInfo.skillInfo,
                skillSuites: character.pageTwoInfo.skillInfo.skillSuites.map((suite, index) => {
                    if (index === changedIndex) {
                        return alteredSkillSuite
                    }
                    return suite
                })
            }
        }
    }

    return updateQuarterMasterAndInitiative(newCharacter, newCharacter.pageTwoInfo.skillInfo.advancedSkills)
}

export function updateNativeLanguageUtility(character: CharacterVersion1, nativeLanguage: SkillObject) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            skillInfo: {
                ...character.pageTwoInfo.skillInfo,
                nativeLanguage
            }
        }
    }
}

export function insertSkillUtility(character: CharacterVersion1, newSkill: SkillObject) {
    const alteredArray = [
        ...character.pageTwoInfo.skillInfo.advancedSkills,
        newSkill
    ]

    return updateQuarterMasterAndInitiative(character, alteredArray)
}

export function updateSkillUtility(character: CharacterVersion1, changedIndex: number, newSkill: SkillObject) {
    const alteredArray = alterSkillArray(character.pageTwoInfo.skillInfo.advancedSkills, changedIndex, newSkill)

    return updateQuarterMasterAndInitiative(character, alteredArray)
}

function alterSkillArray(skillArray: SkillObject[], changedIndex: number, newSkill: SkillObject): SkillObject[] {
    if (newSkill.skill || newSkill.cost || newSkill.rank || newSkill.mod) {
        return skillArray.map((object, index) => {
            if (index === changedIndex) {
                return newSkill
            }
            return object
        })
    }

    return skillArray.filter((_, index) => index !== changedIndex)
}

function updateQuarterMasterAndInitiative(character: CharacterVersion1, alteredArray: SkillObject[]): CharacterVersion1 {
    const { skillSuites } = character.pageTwoInfo.skillInfo
    const quarterMasteringMod = findCarryFromQuarterMastering(skillSuites[4], alteredArray)

    const newCharacter = {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            gearInfo: {
                ...character.pageTwoInfo.gearInfo,
                carry: getCarry(character.pageOneInfo.leftColumnInfo.statInfo.str) + quarterMasteringMod
            },
            skillInfo: {
                ...character.pageTwoInfo.skillInfo,
                advancedSkills: alteredArray
            }
        }
    }

    return {
        ...newCharacter,
        pageOneInfo: {
            ...newCharacter.pageOneInfo,
            rightColumnInfo: {
                ...newCharacter.pageOneInfo.rightColumnInfo,
                weapons: updateWeaponTablesWithoutMods(newCharacter),
            }
        }
    }
}