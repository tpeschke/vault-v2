import homeSQL from "../../v1/queries/home"
import { Request, Response } from '../../interfaces/apiInterfaces'
import { isOwner } from "../../controllers/user/ownerFunctions"
import query from "../../db/database"
import { checkForContentTypeBeforeSending } from "../common/sendingFunctions"
import getV1Characters from "./v1/getCharacters"
import getV2Characters from "./v2/getCharacters"

export async function viewUsersCharacters(request: Request, response: Response) {
    const userID = request.user?.id
    if (!userID) {
        checkForContentTypeBeforeSending(response, { message: 'User Not Logged In' })
    } else {
        const data = await Promise.all([
            getV1Characters(userID),
            getV2Characters(userID)
        ])
        checkForContentTypeBeforeSending(response, data)
    }
}

export async function addCharacter(request: Request, response: Response) {
    const userID = request.user?.id
    const patreon = request.user?.patreon

    if (patreon) {
        const limit = (patreon * 20) + 10
        const [{ count: currentCharacterCount }] = await query(homeSQL.characterCount, userID)

        if (isOwner(userID) || currentCharacterCount < limit) {
            const [{ id: newCharacterID }] = await query(homeSQL.insertCharacter, userID)

            checkForContentTypeBeforeSending(response, { newCharacterID })
        } else {
            checkForContentTypeBeforeSending(response, { message: "You've Hit Your Character Limit. Upgrade Your Patreon to Add More." })
        }
    } else {
        checkForContentTypeBeforeSending(response, { message: "You Need to Log On" })
    }
}