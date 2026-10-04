import { Emotion } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import { ViewPersistAttribute, ViewPersistBody, ViewPersistValue } from '@vault/common/interfaces/v2/page1/viewPersist'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import { Response, Request } from '../../interfaces/apiInterfaces'
import { getCharacterOwnerID } from '../view/assembleV2Character/utilities/ownerInfo'
import saveCurrentEmotions from './utilities/pageType1/utilities/saveCharacteristics/utilities/saveCurrentEmotions'
import saveViewField from './utilities/pageType1/utilities/saveViewField'

const attributes: ViewPersistAttribute[] = ['unspent', 'currentFavor', 'diePenalty', 'damage', 'stress', 'selfDoubtDieIndex', 'damageDieIndex', 'stressDieIndex', 'generalSkillNotes', 'combatSkillNotes', 'currentEmotions']
const textAttributes: ViewPersistAttribute[] = ['generalSkillNotes', 'combatSkillNotes']

interface FieldRequest extends Request {
    params: {
        characterID: string
    },
    body: ViewPersistBody
}

function isViewPersistAttribute(attribute: string): attribute is ViewPersistAttribute {
    return attributes.includes(attribute as ViewPersistAttribute)
}

function isCurrentEmotionsPayload(value: ViewPersistValue): value is Emotion[] {
    return Array.isArray(value)
        && value.length <= 9
        && value.every(item => item && typeof item.value === 'string' && item.value.length <= 25)
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

    if (attribute === 'currentEmotions') {
        if (!isCurrentEmotionsPayload(value)) {
            checkForContentTypeBeforeSending(response, { success: false, message: 'Invalid current emotions' })
            return
        }
        const currentEmotions = await saveCurrentEmotions(+pageID, value)
        checkForContentTypeBeforeSending(response, { success: true, currentEmotions })
        return
    }

    const nextValue = textAttributes.includes(attribute)
        ? String(value ?? '')
        : Number.isFinite(+value) ? +value : 0
    await saveViewField(+pageID, attribute, nextValue)
    checkForContentTypeBeforeSending(response, { success: true })
}
