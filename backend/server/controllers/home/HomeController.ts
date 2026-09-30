import { Request, Response } from '../../interfaces/apiInterfaces'
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
