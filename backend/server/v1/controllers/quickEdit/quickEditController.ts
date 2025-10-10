import { checkForContentTypeBeforeSending } from '../../../controllers/common/sendingFunctions'
import { Response, Request } from '../../../interfaces/apiInterfaces'
import { QuickEditBody } from '@vault/common/interfaces/v1/quickEdit'
import { saveUnspentCrp } from './utilities/crpUnspent'
import { saveCrpSpent } from './utilities/crpSpent'
import { saveIntegrity } from './utilities/integrity'
import { saveGritDice } from './utilities/gritDice'
import query from '../../../db/database'
import userSQL from '../../queries/user'

interface EditRequest extends Request {
    params: {
        characterId: string
    },
    body: QuickEditBody
}

export async function quickEditCharacter(request: EditRequest, response: Response) {
    const { characterID, attribute, value } = request.body

    const [{ userid: userIDFromDB }] = await query(userSQL.getCharacterUserID, characterID)
    
    if (userIDFromDB === request.user?.id) {
        let sendSuccess = false

        switch (attribute) {
            case 'crpUnspent':
                sendSuccess = await saveUnspentCrp(characterID, value)
                break
            case 'crpSpent':
                sendSuccess = await saveCrpSpent(characterID, value)
                break
            case 'integrity':
                sendSuccess = await saveIntegrity(characterID, value)
                break
            case 'gritDice':
                sendSuccess = await saveGritDice(characterID, value)
                break
            case 'favor':
                break
            case 'stress':
                break
            case 'relaxation':
                break
            case 'copper':
                break
            case 'silver':
                break
            case 'gold':
                break
            case 'platinum':
                break
            case 'assets':
                break
            case 'notes':
                break
            default:
                checkForContentTypeBeforeSending(response, { success: false })
        }

        // wounds
        // equipment

        // armor misc modifiers
        // shield misc modifiers
        // weapon misc modifiers

        if (sendSuccess) {
            checkForContentTypeBeforeSending(response, { success: true })
        } else {
            checkForContentTypeBeforeSending(response, { success: false })
        }
    } else {
        checkForContentTypeBeforeSending(response, { success: false, message: "You Don't Own This Character" })
    }
}