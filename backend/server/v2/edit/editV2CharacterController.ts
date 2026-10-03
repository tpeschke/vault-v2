import { CharacterVersion2 } from '@vault/common/interfaces/characterInterfaces'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import { Response, Request } from '../../interfaces/apiInterfaces'
import { getCharacterOwnerID } from '../view/assembleV2Character/utilities/ownerInfo'
import { getV2Character, ViewRequest } from '../view/viewV2CharacterController'
import savePages from './utilities/savePages'

interface EditRequest extends Request {
    params: {
        characterID: string
    },
    body: CharacterVersion2
}

export async function editV2Character(request: EditRequest, response: Response) {
    const characterID = +request.params.characterID
    const { userInfo, pages } = request.body

    const ownerID = await getCharacterOwnerID(characterID)

    if (ownerID === userInfo.userID) {
        await savePages(characterID, pages)
        getV2Character(request as ViewRequest, response)
    } else {
        checkForContentTypeBeforeSending(response, { message: "You don't own this character" })
    }
}
