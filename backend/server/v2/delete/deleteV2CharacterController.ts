import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import { Response, Request } from '../../interfaces/apiInterfaces'

export interface ViewRequest extends Request {
    params: {
        characterID: string
    }
}

export async function deleteV2Character(request: ViewRequest, response: Response) {
    // const characterID = +request.params.characterID

    // delete from owner
    // get pages
    // loop through pages, delete by type
    // delete from pages

    checkForContentTypeBeforeSending(response, { message: 'Deleted' })
}