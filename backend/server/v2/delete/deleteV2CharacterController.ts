import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import { Response, Request } from '../../interfaces/apiInterfaces'

export interface ViewRequest extends Request {
    params: {
        characterID: string
    }
}

export async function deleteV2Character(request: ViewRequest, response: Response) {
    // const characterID = +request.params.characterID

    checkForContentTypeBeforeSending(response, { message: 'Deleted' })
}