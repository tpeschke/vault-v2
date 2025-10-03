import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { SkillObject } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces";

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
    return {
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
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            skillInfo: {
                ...character.pageTwoInfo.skillInfo,
                advancedSkills: [
                    ...character.pageTwoInfo.skillInfo.advancedSkills,
                    newSkill
                ]
            }
        }
    }
}

export function updateSkillUtility(character: CharacterVersion1, changedIndex: number, newSkill: SkillObject) {
    const alteredArray = alterSkillArray(character.pageTwoInfo.skillInfo.advancedSkills, changedIndex, newSkill)

    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            skillInfo: {
                ...character.pageTwoInfo.skillInfo,
                advancedSkills: alteredArray
            }
        }
    }
}

function alterSkillArray(skillArray: SkillObject[], changedIndex: number, newSkill: SkillObject) {
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