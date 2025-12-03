import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import { Response, Request } from '../../interfaces/apiInterfaces'
import deleteFromOwner from './utilities/deleteFromOwner'
import deletePages from './utilities/deletePages'

export interface ViewRequest extends Request {
    params: {
        characterID: string
    }
}

export async function deleteV2Character(request: ViewRequest, response: Response) {
    const characterID = +request.params.characterID

    await Promise.all([
        deleteFromOwner(characterID),
        deletePages(characterID)
        // delete from pages
    ])

    checkForContentTypeBeforeSending(response, { message: 'Deleted' })
}