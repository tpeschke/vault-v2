import { Emotion } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import {
    Page3GearValue,
    Page3RelationshipPValue,
    ViewPersistAttribute,
    ViewPersistBody,
    ViewPersistValue
} from '@vault/common/interfaces/v2/page1/viewPersist'
import { Page3Coinage, Page3Contact } from '@vault/common/interfaces/v2/page3/page3Interfaces'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import { Response, Request } from '../../interfaces/apiInterfaces'
import { getCharacterOwnerID } from '../view/assembleV2Character/utilities/ownerInfo'
import saveCurrentEmotions from './utilities/pageType1/utilities/saveCharacteristics/utilities/saveCurrentEmotions'
import saveViewField from './utilities/pageType1/utilities/saveViewField'
import savePage3Contacts from './utilities/pageType3/savePage3Contacts'
import savePage3RelationshipP from './utilities/pageType3/savePage3RelationshipP'
import savePage3GearField, { isPage3GearSlot } from './utilities/pageType3/savePage3GearField'
import savePage3Coinage from './utilities/pageType3/savePage3Coinage'
import savePage3Notes from './utilities/pageType3/savePage3Notes'

const attributes: ViewPersistAttribute[] = [
    'unspent', 'currentFavor', 'diePenalty', 'damage', 'stress',
    'selfDoubtDieIndex', 'damageDieIndex', 'stressDieIndex',
    'generalSkillNotes', 'combatSkillNotes', 'currentEmotions',
    'page3Contacts', 'page3RelationshipP', 'page3Gear', 'page3Coinage', 'page3Notes'
]
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

function isPage3ContactsPayload(value: ViewPersistValue): value is Page3Contact[] {
    return Array.isArray(value)
        && value.length <= 18
        && value.every(item => item && typeof item.value === 'string' && item.value.length <= 500)
}

function isSkillNumber(value: unknown): value is number | '' {
    return value === '' || (typeof value === 'number' && Number.isFinite(value))
}

function isPage3RelationshipPPayload(value: ViewPersistValue): value is Page3RelationshipPValue {
    return !!value
        && typeof value === 'object'
        && !Array.isArray(value)
        && typeof (value as Page3RelationshipPValue).id === 'number'
        && (value as Page3RelationshipPValue).id > 0
        && isSkillNumber((value as Page3RelationshipPValue).p)
}

function isPage3GearPayload(value: ViewPersistValue): value is Page3GearValue {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return false
    }
    const patch = value as Page3GearValue
    if (typeof patch.slot !== 'string' || !isPage3GearSlot(patch.slot)) {
        return false
    }
    if (patch.item !== undefined && (typeof patch.item !== 'string' || patch.item.length > 500)) {
        return false
    }
    if (patch.size !== undefined && (typeof patch.size !== 'string' || patch.size.length > 50)) {
        return false
    }
    if (patch.staffSnake !== undefined && typeof patch.staffSnake !== 'boolean') {
        return false
    }
    if (patch.meditating !== undefined && typeof patch.meditating !== 'boolean') {
        return false
    }
    if (patch.w !== undefined && !isSkillNumber(patch.w)) {
        return false
    }
    return true
}

function isPage3CoinagePayload(value: ViewPersistValue): value is Page3Coinage {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return false
    }
    const coinage = value as Page3Coinage
    return Number.isFinite(coinage.copper)
        && Number.isFinite(coinage.silver)
        && Number.isFinite(coinage.gold)
        && Number.isFinite(coinage.platinum)
        && typeof coinage.copperSize === 'string'
        && typeof coinage.silverSize === 'string'
        && typeof coinage.goldSize === 'string'
        && typeof coinage.platinumSize === 'string'
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

    if (attribute === 'page3Contacts') {
        if (!isPage3ContactsPayload(value)) {
            checkForContentTypeBeforeSending(response, { success: false, message: 'Invalid contacts' })
            return
        }
        const page3Contacts = await savePage3Contacts(+pageID, value)
        checkForContentTypeBeforeSending(response, { success: true, page3Contacts })
        return
    }

    if (attribute === 'page3RelationshipP') {
        if (!isPage3RelationshipPPayload(value)) {
            checkForContentTypeBeforeSending(response, { success: false, message: 'Invalid relationship' })
            return
        }
        await savePage3RelationshipP(+pageID, value.id, value.p)
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    if (attribute === 'page3Gear') {
        if (!isPage3GearPayload(value)) {
            checkForContentTypeBeforeSending(response, { success: false, message: 'Invalid gear' })
            return
        }
        await savePage3GearField(+pageID, value)
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    if (attribute === 'page3Coinage') {
        if (!isPage3CoinagePayload(value)) {
            checkForContentTypeBeforeSending(response, { success: false, message: 'Invalid coinage' })
            return
        }
        await savePage3Coinage(+pageID, value)
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    if (attribute === 'page3Notes') {
        await savePage3Notes(+pageID, String(value ?? ''))
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    const nextValue = textAttributes.includes(attribute)
        ? String(value ?? '')
        : Number.isFinite(+value) ? +value : 0
    await saveViewField(+pageID, attribute, nextValue)
    checkForContentTypeBeforeSending(response, { success: true })
}
