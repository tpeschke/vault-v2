import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response, Request } from '../../interfaces/apiInterfaces'
import { addCharacterToOwnerTable } from '../view/assembleV2Character/utilities/ownerInfo'
import addPageType1 from './pageType1/addPageType1'
import addPageType2 from './pageType2/addPageType2'
import addPageType3 from './pageType3/addPageType3'

const addPageSQL = `insert into v2CharacterPages (index, pageTypeID, characterID) values ($1, $2, $3) returning id`

export default async function addV2Character(request: Request, response: Response) {
    // TODO add double checking about whether the user can add 
    // I don't want to end this until towards the end to keep the code more manageable

    const userID = request.user?.id

    if (userID) {
        const characterID = await addCharacterToOwnerTable(userID)

        const [{ id: pageID }] = await query(addPageSQL, [0, 1, characterID])
        const [{ id: pageType2ID }] = await query(addPageSQL, [1, 2, characterID])
        const [{ id: pageType3ID }] = await query(addPageSQL, [2, 3, characterID])

        await Promise.all([
            addPageType1(pageID),
            addPageType2(pageType2ID),
            addPageType3(pageType3ID)
        ])

        checkForContentTypeBeforeSending(response, characterID)
    } else {
        checkForContentTypeBeforeSending(response, { color: "red", message: "You must be logged in to add a character" })
    }
}