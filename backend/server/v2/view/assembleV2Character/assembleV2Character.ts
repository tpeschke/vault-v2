import { CharacterVersion2 } from '@vault/common/interfaces/characterInterfaces';
import { checkForContentTypeBeforeSending } from '../../../controllers/common/sendingFunctions';
import { Response, Request } from '../../../interfaces/apiInterfaces'
import { CharacterPageReturns } from '../viewV2CharacterInterfaces';
import assemblePageType1 from './utilities/pageType1/assemblePageType1';
import { Page404Error, PageV2 } from '@vault/common/interfaces/v2/pageTypes'
import { getCharacterOwnerID } from './utilities/ownerInfo';
import query from '../../../db/database';

const getCharacterName = `select pageID as id, name, ancestry, class, subclass, level from v2GeneralInfo gi
where pageID = (
	select id from v2CharacterPages
	where characterID = $1
		and pageTypeID = 1
	order by index
	limit 1
)`

export default async function assembleV2Character(request: Request, response: Response, characterID: number, characterPages: CharacterPageReturns[]) {
    const loggedInUserID = request.user?.id

    const characterOwnerID = await getCharacterOwnerID(characterID)
    const [{name}] = await query(getCharacterName, characterID)

    const collectedPages: Promise<PageV2>[] = characterPages.map(({ pagetypeid: pageTypeID, id: pageID }) => {
        switch (pageTypeID) {
            case 1:
                return assemblePageType1(pageID)
            default:
                return getPage404Error()
        }
    })

    const pages = await Promise.all(collectedPages)

    const finalCharacter: CharacterVersion2 = {
        version: 2,
        name,
        id: characterID,
        userInfo: {
            userID: characterOwnerID,
            ownsThisCharacter: loggedInUserID === characterOwnerID
        },
        pages
    }

    checkForContentTypeBeforeSending(response, finalCharacter)
}

async function getPage404Error(): Promise<Page404Error> {
    return { type: 404 }
}