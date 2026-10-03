import { CharacterVersion2 } from '@vault/common/interfaces/characterInterfaces'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response, Request } from '../../interfaces/apiInterfaces'
import { getCharacterOwnerID } from '../view/assembleV2Character/utilities/ownerInfo'
import { getV2Character, ViewRequest } from '../view/viewV2CharacterController'
import savePages from './utilities/savePages'

const countType1PagesSQL = `select id from v2CharacterPages where characterID = $1 and pageTypeID = 1`

interface EditRequest extends Request {
    params: {
        characterID: string
    },
    body: CharacterVersion2
}

export async function editV2Character(request: EditRequest, response: Response) {
    const characterID = +request.params.characterID
    const { pages } = request.body

    const ownerID = await getCharacterOwnerID(characterID)

    if (ownerID === request.user?.id) {
        await savePages(characterID, pages)
        const storedType1 = await query(countType1PagesSQL, characterID)
        const postedType1 = pages.filter(page => page.type === 1).length
        if (storedType1.length < postedType1) {
            checkForContentTypeBeforeSending(response, { message: 'Could not save all sheets' })
            return
        }
        getV2Character(request as ViewRequest, response)
    } else {
        checkForContentTypeBeforeSending(response, { message: "You don't own this character" })
    }
}
