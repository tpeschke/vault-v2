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