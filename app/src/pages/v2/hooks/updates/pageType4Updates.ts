import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"

export function updateNotesScene(character: CharacterVersion2, pageID: number, scene: string): CharacterVersion2 {
    return {
        ...character,
        pages: character.pages.map(page => {
            if (page.type === 4 && page.pageID === pageID) {
                return { ...page, scene }
            }
            return page
        })
    }
}
