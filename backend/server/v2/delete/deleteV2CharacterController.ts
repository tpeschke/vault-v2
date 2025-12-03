import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response, Request } from '../../interfaces/apiInterfaces'
import deleteFromCharacterPages from './utilities/deleteFromCharacterPages'
import deleteFromOwner from './utilities/deleteFromOwner'
import deletePages from './utilities/deletePages'

export interface ViewRequest extends Request {
    params: {
        characterID: string
    }
}

const checkOwnerSQL = `select ownerID = $1 as isOwner from v2CharacterOwner
where characterID = $2`

export async function deleteV2Character(request: ViewRequest, response: Response) {
    const characterID = +request.params.characterID

    const [{isowner: isOwner}] = await query(checkOwnerSQL, [request.user?.id, characterID])

    if (isOwner) {
        await Promise.all([
            deleteFromOwner(characterID),
            deletePages(characterID),
            deleteFromCharacterPages(characterID)
        ])
    
        checkForContentTypeBeforeSending(response, { message: 'Deleted' })
    } else {
        checkForContentTypeBeforeSending(response, { message: 'You Don\'t Own This Character' })
    }
}