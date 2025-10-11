import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { checkForContentTypeBeforeSending } from "../../../../controllers/common/sendingFunctions"
import { Response } from '../../../../interfaces/apiInterfaces'

export async function assembleBlankCharacter(response: Response) {
    const character: CharacterVersion1 = {
        version: 1,
        id: null,
        userInfo: {
            userID: null,
            ownsThisCharacter: false
        },
        pageOneInfo: {
            leftColumnInfo: {
                characteristicInfo: {
                    goals: [],
                    descriptions: [],
                    convictions: [],
                    relationships: [],
                    flaws: [],
                    culturalStrength: '',
                    reputation: [],
                }
            },
            rightColumnInfo: {
                weapons: [{}, {}, {}, {}],
            },
            abilitiesNBurdensInfo: {
                abilityOne: '',
                abilityTwo: '',
                removedAbility: '',
                burdens: '',
            }
        },
        pageTwoInfo: {
            gearInfo: {
                gear: []
            },
            skillInfo: {
                skillSuites: [
                    { id: 1, skill: 'Athletics', cost: 30, isTrained: true },
                    { id: 2, skill: 'Lore', cost: 30, isTrained: true },
                    { id: 5, skill: 'Strategy', cost: 30, isTrained: true },
                    { id: 3, skill: 'Streetwise', cost: 30, isTrained: true },
                    { id: 4, skill: 'Survival', cost: 30, isTrained: true },
                    { id: 6, skill: 'Trades', cost: 30, isTrained: true },
                    { id: 7, skill: 'Weirdcraft', cost: 30, isTrained: true }
                ],
                advancedSkills: [],
                nativeLanguage: {
                    skill: ''
                }
            },
            combatWorkspaceInfo: {
                combatSkillInfo: {
                    combatSkillSuites: [
                        { id: 1, skill: 'Armor', cost: 40, isTrained: true },
                        { id: 2, skill: 'Melee', cost: 40, isTrained: true },
                        { id: 3, skill: 'Ranged', cost: 40, isTrained: true },
                        { id: 4, skill: 'Shields', cost: 40, isTrained: true },
                        { id: 5, skill: 'Unarmed', cost: 40, isTrained: true }
                    ],
                    combatAdvSkills: []
                },
                weaponInfo: []
            }
        },
        generalNotes: {
            isSecret: false
        }
    }

    checkForContentTypeBeforeSending(response, character)
}