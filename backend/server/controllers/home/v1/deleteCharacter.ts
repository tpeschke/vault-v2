import query from '../../../db/database'
import { Request, Response } from '../../../interfaces/apiInterfaces'
import { checkForContentTypeBeforeSending } from '../../common/sendingFunctions'

import homeSQL from '../../../v1/queries/home'
import combatDeleteSQL from "../../../v1/queries/combat/deletes"
import gearDeleteSQL from "../../../v1/queries/gear/deletes"
import skillDeleteSQL from "../../../v1/queries/skill/deletes"
import confrontationDeleteSQL from "../../../v1/queries/confrontation/deletes"

interface DeleteCharacterRequest extends Request {
    params: {
        characterID: string
    }
}

export default async function deleteCharacter(request: DeleteCharacterRequest, response: Response) {
    const characterID: number = +request.params.characterID
    const userID = request.user?.id

    const [{ userid: characterUserID }] = await query(homeSQL.characterUser, characterID)

    if (characterUserID === userID) {
        let promiseArray: Promise<any>[] = []

        promiseArray.push(query(combatDeleteSQL.allDamageOne, [characterID]))
        promiseArray.push(query(combatDeleteSQL.allDamageTwo, [characterID]))
        promiseArray.push(query(combatDeleteSQL.allSkills, [characterID]))
        promiseArray.push(query(combatDeleteSQL.allSuites, [characterID]))

        promiseArray.push(query(gearDeleteSQL.allGearOne, [characterID]))
        promiseArray.push(query(gearDeleteSQL.allGearTwo, [characterID]))
        promiseArray.push(query(gearDeleteSQL.allGearThree, [characterID]))
        promiseArray.push(query(gearDeleteSQL.allGearFour, [characterID]))

        promiseArray.push(query(skillDeleteSQL.allSkills, [characterID]))
        promiseArray.push(query(skillDeleteSQL.allSuites, [characterID]))

        promiseArray.push(query(confrontationDeleteSQL.allDescriptions, [characterID]))
        promiseArray.push(query(confrontationDeleteSQL.allDevotions, [characterID]))
        promiseArray.push(query(confrontationDeleteSQL.allFlaws, [characterID]))
        promiseArray.push(query(confrontationDeleteSQL.allGoals, [characterID]))
        promiseArray.push(query(confrontationDeleteSQL.allReputation, [characterID]))
        promiseArray.push(query(confrontationDeleteSQL.allTraits, [characterID]))

        await Promise.all(promiseArray)

        await query(homeSQL.deleteCharacter, [userID, characterID])

        checkForContentTypeBeforeSending(response, { message: "Successfully Deleted" })
    } else {
        checkForContentTypeBeforeSending(response, { message: "This isn't your character to delete" })
    }
}