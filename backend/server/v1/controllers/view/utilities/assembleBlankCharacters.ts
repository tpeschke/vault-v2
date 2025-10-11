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
        generalNotes: {
            notes: '',
            isSecret: false
        }
    }

    checkForContentTypeBeforeSending(response, character)
}