import { checkForContentTypeBeforeSending } from '../../../controllers/common/sendingFunctions'
import { Response, Request } from '../../../interfaces/apiInterfaces'
import { QuickEditBody } from '@vault/common/interfaces/v1/quickEdit'
import { saveCrpSpent } from './utilities/numberUpdates/crpSpent'
import query from '../../../db/database'
import userSQL from '../../queries/user'
import { saveUnspentCrp } from './utilities/numberUpdates/crpUnspent'
import { saveFavor } from './utilities/numberUpdates/favor'
import { saveGritDice } from './utilities/numberUpdates/gritDice'
import { saveIntegrity } from './utilities/numberUpdates/integrity'
import { saveStress } from './utilities/numberUpdates/stress'
import { saveRelaxation } from './utilities/numberUpdates/relaxation'

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
                sendSuccess = await saveFavor(characterID, value)
                break
            case 'stress':
                sendSuccess = await saveStress(characterID, value)
                break
            case 'relaxation':
                sendSuccess = await saveRelaxation(characterID, value)
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