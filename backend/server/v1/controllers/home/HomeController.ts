import { checkForContentTypeBeforeSending } from "../../../controllers/common/sendingFunctions"
import query from "../../../db/database"
import homeSQL from "../../queries/home"
import combatDeleteSQL from "../../queries/combat/deletes"
import gearDeleteSQL from "../../queries/gear/deletes"
import skillDeleteSQL from "../../queries/skill/deletes"
import confrontationDeleteSQL from "../../queries/confrontation/deletes"
import { Request, Response } from '../../../interfaces/apiInterfaces'

export async function viewUsersCharacters(request: Request, response: Response) {
    const userID = request.user?.id
    const data = await query(homeSQL.allUsersCharacters, userID)
    checkForContentTypeBeforeSending(response, data)
}

interface DeleteCharacterRequest extends Request {
    params: {
        characterID: string
    }
}

export async function deleteCharacter(request: DeleteCharacterRequest, response: Response) {
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