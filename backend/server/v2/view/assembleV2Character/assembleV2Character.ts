import { CharacterVersion2 } from '@vault/common/interfaces/characterInterfaces';
import { checkForContentTypeBeforeSending } from '../../../controllers/common/sendingFunctions';
import { Response, Request } from '../../../interfaces/apiInterfaces'
import { CharacterPageReturns } from '../viewV2CharacterInterfaces';
import assemblePageType1 from './utilities/pageType1/assemblePageType1';
import { Page404Error, PageV2 } from '@vault/common/interfaces/v2/pageTypes'
import { getCharacterOwnerID } from './utilities/ownerInfo';

export default async function assembleV2Character(request: Request, response: Response, characterID: number, characterPages: CharacterPageReturns[]) {
    const loggedInUserID = request.user?.id

    const characterOwnerID = await getCharacterOwnerID(characterID)

    const collectedPages: Promise<PageV2>[] = characterPages.map(({ pagetypeid: pageTypeID }) => {
        switch (pageTypeID) {
            case 1:
                return assemblePageType1(characterID)
            default:
                return getPage404Error()
        }
    })

    const pages = await Promise.all(collectedPages)

    const finalCharacter: CharacterVersion2 = {
        version: 2,
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