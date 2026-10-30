import { CharacterVersion2 } from '@vault/common/interfaces/characterInterfaces'
import { PageV2 } from '@vault/common/interfaces/v2/pageTypes'
import { textareaCaps, textareaCharCount, TextareaLimitError } from '@vault/common/textareaLimits'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response, Request } from '../../interfaces/apiInterfaces'
import { getCharacterOwnerID } from '../view/assembleV2Character/utilities/ownerInfo'
import { getV2Character, ViewRequest } from '../view/viewV2CharacterController'
import savePages from './utilities/savePages'
import notesScenesWithinCap from './utilities/pageType4/notesScenesWithinCap'
import { SHEET_PAGE_CAP_MESSAGE, SHEET_PAGE_MAX } from '@vault/common/interfaces/v2/sheetPageCap'
import { deleteOmittedPages, omittedPageIDs, omittedPagesRemain } from './utilities/deleteOmittedPages'

const countType1PagesSQL = `select id from v2CharacterPages where characterID = $1 and pageTypeID = 1`
const countType2PagesSQL = `select id from v2CharacterPages where characterID = $1 and pageTypeID = 2`
const countType3PagesSQL = `select id from v2CharacterPages where characterID = $1 and pageTypeID = 3`
const countType4PagesSQL = `select id from v2CharacterPages where characterID = $1 and pageTypeID = 4`

interface EditRequest extends Request {
    params: {
        characterID: string
    },
    body: CharacterVersion2
}

function postedTextareaTooLong(pages: PageV2[]) {
    return pages.some(page => {
        if (page.type === 1) {
            return textareaCharCount(page.favor.divineRelationship ?? '') > textareaCaps.divineRelationship
                || textareaCharCount(page.combatInfo.defenses.notes ?? '') > textareaCaps.defenseNotes
                || page.combatInfo.attacks.some(attack => textareaCharCount(attack.notes ?? '') > textareaCaps.attackNotes)
        }
        if (page.type === 2) {
            return textareaCharCount(page.generalSkillNotes ?? '') > textareaCaps.generalSkillNotes
                || textareaCharCount(page.combatSkillNotes ?? '') > textareaCaps.combatSkillNotes
                || textareaCharCount(page.abilities ?? '') > textareaCaps.abilities
                || textareaCharCount(page.burdens ?? '') > textareaCaps.burdens
        }
        if (page.type === 3) {
            return textareaCharCount(page.contacts ?? '') > textareaCaps.page3Contacts
                || textareaCharCount(page.notes ?? '') > textareaCaps.page3Notes
        }
        return false
    })
}

export async function editV2Character(request: EditRequest, response: Response) {
    const characterID = +request.params.characterID
    const { pages } = request.body

    const ownerID = await getCharacterOwnerID(characterID)

    if (ownerID === request.user?.id) {
        if (pages.length > SHEET_PAGE_MAX) {
            checkForContentTypeBeforeSending(response, { message: SHEET_PAGE_CAP_MESSAGE })
            return
        }
        if (!pages.some(page => page.type === 1)) {
            checkForContentTypeBeforeSending(response, { message: "Pages weren't able to be removed" })
            return
        }
        if (!notesScenesWithinCap(pages)) {
            checkForContentTypeBeforeSending(response, { message: 'Notes sheet is limited to 100 MB' })
            return
        }
        const omittedIDs = await omittedPageIDs(characterID, pages)
        await savePages(characterID, pages)
        if (postedTextareaTooLong(pages)) {
            checkForContentTypeBeforeSending(response, { message: 'Text is too long' })
            return
        }
        try {
            await savePages(characterID, pages)
        } catch (error) {
            if (error instanceof TextareaLimitError) {
                checkForContentTypeBeforeSending(response, { message: 'Text is too long' })
                return
            }
            throw error
        }
        await deleteOmittedPages(characterID, omittedIDs)
        if (await omittedPagesRemain(characterID, omittedIDs)) {
            checkForContentTypeBeforeSending(response, { message: "Pages weren't able to be removed" })
            return
        }
        const storedType1 = await query(countType1PagesSQL, characterID)
        const storedType2 = await query(countType2PagesSQL, characterID)
        const storedType3 = await query(countType3PagesSQL, characterID)
        const storedType4 = await query(countType4PagesSQL, characterID)
        const postedType1 = pages.filter(page => page.type === 1).length
        const postedType2 = pages.filter(page => page.type === 2).length
        const postedType3 = pages.filter(page => page.type === 3).length
        const postedType4 = pages.filter(page => page.type === 4).length
        if (storedType1.length < postedType1 || storedType2.length < postedType2 || storedType3.length < postedType3 || storedType4.length < postedType4) {
            checkForContentTypeBeforeSending(response, { message: 'Could not save all sheets' })
            return
        }
        getV2Character(request as ViewRequest, response)
    } else {
        checkForContentTypeBeforeSending(response, { message: "You don't own this character" })
    }
}
