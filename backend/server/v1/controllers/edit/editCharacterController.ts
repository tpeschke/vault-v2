import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'
import { Response, Request } from '../../../interfaces/apiInterfaces'
import { getCharacter } from '../view/viewCharacterController'

interface EditRequest extends Request {
    params: {
        characterId: string
    },
    body: CharacterVersion1
}

export async function editCharacter(request: EditRequest, response: Response) {
    const { body: characterToSave } = request
    console.log(characterToSave)

    // TODO
    // Check if owner via db

    getCharacter(request, response)
}