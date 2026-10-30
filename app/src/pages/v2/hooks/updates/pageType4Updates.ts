import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import { Page4 } from "@vault/common/interfaces/v2/pageTypes"

function sameNotesPage(page: Page4, pageID: number, key?: string): boolean {
    return key ? page.key === key : page.pageID === pageID
}

export function findNotesPage(character: CharacterVersion2 | null, pageID: number, key?: string): Page4 | undefined {
    return character?.pages.find((page): page is Page4 => page.type === 4 && sameNotesPage(page, pageID, key))
}

export function updateNotesScene(character: CharacterVersion2, pageID: number, scene: string, key?: string): CharacterVersion2 {
    return {
        ...character,
        pages: character.pages.map(page => {
            if (page.type === 4 && sameNotesPage(page, pageID, key)) {
                return { ...page, scene }
            }
            return page
        })
    }
}

export function replaceNotesPageID(character: CharacterVersion2, tempPageID: number, key: string | undefined, pageID: number, scene: string, index: number): CharacterVersion2 {
    const pages = character.pages.slice()
    const found = pages.findIndex(page => page.type === 4 && sameNotesPage(page, tempPageID, key))
    if (found >= 0) {
        const page = pages[found]
        if (page.type === 4) {
            pages[found] = { ...page, pageID }
        }
        return { ...character, pages }
    }
    const at = Math.min(Math.max(index, 0), pages.length)
    pages.splice(at, 0, { type: 4, pageID, scene, ...(key ? { key } : {}) })
    return { ...character, pages }
}
