import { Response, Request } from '../../interfaces/apiInterfaces'
import { checkForContentTypeBeforeSending } from '../common/sendingFunctions'
import { isJustMainOwner } from './ownerFunctions'

export async function checkIfLoggedIn(request: Request, response: Response) {
    const { user } = request

    const userInfo = {
        isUserLoggedIn: user && user.id,
        patreon: user?.patreon ? user.patreon : 0,
        isOwner: isJustMainOwner(user?.id)
    }

    checkForContentTypeBeforeSending(response, userInfo)
}