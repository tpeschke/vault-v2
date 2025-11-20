import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import { Response, Request } from '../../interfaces/apiInterfaces'
import { addCharacterToOwnerTable } from '../view/assembleV2Character/utilities/ownerInfo'

export default async function addCharacter(request: Request, response: Response) {
    // TODO add double checking about whether the user can add 
    // I don't want to end this until towards the end to keep the code more manageable

    const userID = request.user?.id

    if (userID) {
        const characterID = await addCharacterToOwnerTable(userID)
        
        // TODO
        // add page type 1
        //  Add page type 2
        //  Add page type 3
        //  Add page type 4

        checkForContentTypeBeforeSending(response, characterID)
    } else {
        checkForContentTypeBeforeSending(response, { color: "red", message: "You must be logged in to add a character"})
    }
}