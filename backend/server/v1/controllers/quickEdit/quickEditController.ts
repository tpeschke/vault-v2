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
import { saveCopper } from './utilities/numberUpdates/copper'
import { saveSilver } from './utilities/numberUpdates/silver'
import { saveGold } from './utilities/numberUpdates/gold'
import { savePlatinum } from './utilities/numberUpdates/platinum'
import { saveAssets } from './utilities/stringUpdates/assets'
import { saveNotes } from './utilities/stringUpdates/notes'
import { saveMiscArmorMods } from './utilities/complexUpdates/armor'
import { saveMiscShieldMods } from './utilities/complexUpdates/shield'
import { saveWeapon } from './utilities/complexUpdates/weapon'
import { saveWounds } from './utilities/complexUpdates/wound'
import { saveGear } from './utilities/complexUpdates/equipment'

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
                sendSuccess = await saveCopper(characterID, value)
                break
            case 'silver':
                sendSuccess = await saveSilver(characterID, value)
                break
            case 'gold':
                sendSuccess = await saveGold(characterID, value)
                break
            case 'platinum':
                sendSuccess = await savePlatinum(characterID, value)
                break
            case 'assets':
                sendSuccess = await saveAssets(characterID, value)
                break
            case 'notes':
                sendSuccess = await saveNotes(characterID, value)
                break
            case 'armor':
                sendSuccess = await saveMiscArmorMods(value)
                break
            case 'shield':
                sendSuccess = await saveMiscShieldMods(value)
                break
            case 'weapon':
                sendSuccess = await saveWeapon(value)
                break
            case 'wound':
                {
                    const { action } = request.body
                    const resolvedAction = await saveWounds(characterID, value, action)
                    if (typeof resolvedAction === 'boolean') {
                        sendSuccess = true
                    } else {
                        checkForContentTypeBeforeSending(response, resolvedAction)
                    }
                }
                break
            case 'equipment':
                {
                    const { action } = request.body
                    const resolvedAction = await saveGear(characterID, value, action)
                    if (typeof resolvedAction === 'boolean') {
                        sendSuccess = true
                    } else {
                        checkForContentTypeBeforeSending(response, resolvedAction)
                    }
                }
                break
            default:
                checkForContentTypeBeforeSending(response, { success: false })
        }

        if (sendSuccess) {
            checkForContentTypeBeforeSending(response, { success: true })
        } else {
            checkForContentTypeBeforeSending(response, { success: false })
        }
    } else {
        checkForContentTypeBeforeSending(response, { success: false, message: "You Don't Own This Character" })
    }
}