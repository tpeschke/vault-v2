import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response, Request } from '../../interfaces/apiInterfaces'
import assembleV2Character from './assembleV2Character/assembleV2Character'
import { CharacterPageReturns } from './viewV2CharacterInterfaces'

export interface ViewRequest extends Request {
    params: {
        characterID: string
    }
}

const getCharacterPages = `select * from v2CharacterPages where characterID = $1`

export async function getV2Character(request: ViewRequest, response: Response) {
    const characterID = +request.params.characterID

    if (isNaN(characterID)) {
            if (request.params.characterID.toUpperCase() === 'BLANK') {
                // TODO Blank
                // assembleBlankCharacter(response)
            } else {
                checkForContentTypeBeforeSending(response, { message: 'Bad ID' })
            }
        } else {
            const characterPages: CharacterPageReturns[] = await query(getCharacterPages, characterID)
            
            if (characterPages.length === 0) {
                checkForContentTypeBeforeSending(response, { message: 'No Pages' })
            } else {
                assembleV2Character(request, response, characterID, characterPages)
            }
        }
}