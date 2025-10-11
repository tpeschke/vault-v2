import { Response, Request } from '../../../interfaces/apiInterfaces'
import viewSQL from '../../queries/basic/get'
import query from '../../../db/database'
import { checkForContentTypeBeforeSending } from '../../../controllers/common/sendingFunctions'
import { assembleCharacter } from './utilities/assembleCharacter'
import { assembleBlankCharacter } from './utilities/assembleBlankCharacters'

export interface ViewRequest extends Request {
    params: {
        characterId: string
    }
}

export async function getCharacter(request: ViewRequest, response: Response) {
    const characterId = +request.params.characterId
    
    if (isNaN(characterId)) {
        if (request.params.characterId.toUpperCase() === 'BLANK') {
            assembleBlankCharacter(response)
        } else {
            checkForContentTypeBeforeSending(response, { message: 'Bad ID' })
        }
    } else {
        const [characterInfoArray]: any[] = await query(viewSQL.character, characterId)
        
        if (!characterInfoArray) {
            checkForContentTypeBeforeSending(response, { message: 'Bad ID' })
        } else {
            assembleCharacter(request, response, characterId, characterInfoArray)
        }
    }
}