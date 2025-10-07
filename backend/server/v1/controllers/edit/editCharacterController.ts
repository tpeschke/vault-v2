import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'
import { Response, Request } from '../../../interfaces/apiInterfaces'
import { getCharacter } from '../view/viewCharacterController'
import query from '../../../db/database'
import userSQL from '../../queries/user'
import { checkForContentTypeBeforeSending } from '../../../controllers/common/sendingFunctions'
import { savePageOneInfo } from './utilities/pageOne/pageOneMainUtility'
import { savePageTwoInfo } from './utilities/pageTwo/pageTwoMainUtility'

interface EditRequest extends Request {
    params: {
        characterId: string
    },
    body: CharacterVersion1
}

export async function editCharacter(request: EditRequest, response: Response) {
    const { id: characterID, userInfo, pageOneInfo, pageTwoInfo } = request.body

    const [{ userid: userIDFromDB }] = await query(userSQL.getCharacterUserID, characterID)

    if (userIDFromDB === userInfo.userID) {
        let promiseArray: Promise<any>[] = []

        promiseArray.push(savePageOneInfo(characterID, pageOneInfo))
        promiseArray.push(savePageTwoInfo(characterID, pageTwoInfo))
        // generalNotes

        await Promise.all(promiseArray)
        getCharacter(request, response)
    } else {
        checkForContentTypeBeforeSending(response, { message: "You don't own this character"})
    }
}