import { checkForContentTypeBeforeSending } from '../../../controllers/common/sendingFunctions';
import { Response, Request } from '../../../interfaces/apiInterfaces'
import { CharacterPageReturns } from '../view2CharacterInterfaces';
import assemblePageType1 from './utilities/pageType1/assemblePageType1';
import { Page404Error, PageV2 } from '@vault/common/interfaces/v2/pageTypes'


export default async function assembleV2Character(request: Request, response: Response, characterID: number, characterPages: CharacterPageReturns[]) {
    const character: Promise<PageV2>[] = characterPages.map(({ pagetypeid: pageTypeID }) => {
        switch (pageTypeID) {
            case 1:
                return assemblePageType1(characterID)
            default:
                return getPage404Error()
        }
    })

    await Promise.all(character)

    checkForContentTypeBeforeSending(response, character)
}

async function getPage404Error(): Promise<Page404Error> {
    return { type: 404 }
}