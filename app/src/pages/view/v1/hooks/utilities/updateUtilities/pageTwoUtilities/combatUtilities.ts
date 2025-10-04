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

export function insertCombatSkillUtility(character: CharacterVersion1, newCombatSkill: CombatSkillObject) {
    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                combatSkillInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.combatSkillInfo,
                    combatAdvSkills: [
                        ...character.pageTwoInfo.combatWorkspaceInfo.combatSkillInfo.combatAdvSkills,
                        newCombatSkill
                    ]
                }
            }
        }
    }
}

export function updateCombatSkillUtility(character: CharacterVersion1, changedIndex: number, newCombatSkill: CombatSkillObject) {
    const alteredArray = alterSkillArray(character.pageTwoInfo.combatWorkspaceInfo.combatSkillInfo.combatAdvSkills, changedIndex, newCombatSkill)

    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                combatSkillInfo: {
                    ...character.pageTwoInfo.combatWorkspaceInfo.combatSkillInfo,
                    combatAdvSkills: alteredArray
                }
            }
        }
    }
}

function alterSkillArray(skillArray: CombatSkillObject[], changedIndex: number, newCombatSkill: CombatSkillObject) {
    if (newCombatSkill.skill || newCombatSkill.cost || newCombatSkill.rank) {
        return skillArray.map((object, index) => {
            if (index === changedIndex) {
                return newCombatSkill
            }
            return object
        })
    }

    return skillArray.filter((_, index) => index !== changedIndex)
}