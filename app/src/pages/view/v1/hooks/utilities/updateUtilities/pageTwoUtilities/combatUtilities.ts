import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { CombatSkillObject } from "@vault/common/interfaces/v1/pageTwo/combatSkills";

export function updateMartialAdeptUtility(character: CharacterVersion1, value: number) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                combatSkillInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.combatSkillInfo,
                    martialAdepts: value
                }
            }
        }
    }
}

export function updateCombatSkillSuiteUtility(character: CharacterVersion1, changedIndex: number, alteredSkillSuite: CombatSkillObject) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                combatSkillInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.combatSkillInfo,
                    combatSkillSuites: character.pageTwoInfo.combatWorkspaceInfo.combatSkillInfo.combatSkillSuites.map((suite, index) => {
                        if (index === changedIndex) {
                            return alteredSkillSuite
                        }
                        return suite
                    })
                }
            }
        }
    }
}