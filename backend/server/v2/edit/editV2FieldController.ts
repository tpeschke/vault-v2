import { ViewPersistAttribute, ViewPersistBody } from '@vault/common/interfaces/v2/page1/viewPersist'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import { Response, Request } from '../../interfaces/apiInterfaces'
import { getCharacterOwnerID } from '../view/assembleV2Character/utilities/ownerInfo'
import saveViewField from './utilities/pageType1/utilities/saveViewField'

const attributes: ViewPersistAttribute[] = ['unspent', 'currentFavor', 'diePenalty', 'damage', 'stress', 'selfDoubtDieIndex', 'damageDieIndex', 'stressDieIndex']

interface FieldRequest extends Request {
    params: {
        characterID: string
    },
    body: ViewPersistBody
}

function isViewPersistAttribute(attribute: string): attribute is ViewPersistAttribute {
    return attributes.includes(attribute as ViewPersistAttribute)
}

export async function editV2Field(request: FieldRequest, response: Response) {
    const characterID = +request.params.characterID
    const { pageID, attribute, value } = request.body

    const ownerID = await getCharacterOwnerID(characterID)

    if (ownerID !== request.user?.id) {
        checkForContentTypeBeforeSending(response, { success: false, message: "You don't own this character" })
        return
    }

    if (!isViewPersistAttribute(attribute)) {
        checkForContentTypeBeforeSending(response, { success: false })
        return
    }

    const nextValue = Number.isFinite(+value) ? +value : 0
    await saveViewField(+pageID, attribute, nextValue)
    checkForContentTypeBeforeSending(response, { success: true })
}
