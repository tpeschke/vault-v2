import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import {
    Page3Coinage,
    Page3Contact,
    Page3GearCell,
    Page3GearSlot,
    Page3Relationship
} from "@vault/common/interfaces/v2/page3/page3Interfaces"
import { Page3 } from "@vault/common/interfaces/v2/pageTypes"

export const PAGE3_CONTACT_CAP = 18
export const PAGE3_RELATIONSHIP_CAP = 18

export function mapPage3(character: CharacterVersion2, pageID: number, updater: (page: Page3) => Page3): CharacterVersion2 {
    return {
        ...character,
        pages: character.pages.map(page => {
            if (page.type === 3 && page.pageID === pageID) {
                return updater(page)
            }
            return page
        })
    }
}

function mapOrRemove<T>(items: T[], index: number, next: T, isEmpty: (row: T) => boolean): T[] {
    if (isEmpty(next)) {
        return items.filter((_, itemIndex) => itemIndex !== index)
    }
    return items.map((row, itemIndex) => itemIndex === index ? next : row)
}

export function applyPage3ContactIds(character: CharacterVersion2, pageID: number, rows: Page3Contact[]): CharacterVersion2 {
    return mapPage3(character, pageID, page => ({
        ...page,
        contacts: rows
    }))
}

export function insertContact(
    character: CharacterVersion2,
    pageID: number,
    newRow: { key: string, value: string }
): CharacterVersion2 {
    return mapPage3(character, pageID, page => {
        const current = page.contacts ?? []
        if (current.length >= PAGE3_CONTACT_CAP) { return page }
        return {
            ...page,
            contacts: [...current, { id: 0, key: newRow.key, value: newRow.value }]
        }
    })
}

export function updateContact(
    character: CharacterVersion2,
    pageID: number,
    index: number,
    value: string
): CharacterVersion2 {
    return mapPage3(character, pageID, page => {
        const current = page.contacts ?? []
        const currentRow = current[index]
        if (!currentRow) { return page }
        return {
            ...page,
            contacts: mapOrRemove<Page3Contact>(
                current,
                index,
                { ...currentRow, value },
                row => row.value === ''
            )
        }
    })
}

export function insertRelationship(
    character: CharacterVersion2,
    pageID: number,
    newRow: { key: string, value: string, r: Page3Relationship['r'], p: Page3Relationship['p'] }
): CharacterVersion2 {
    return mapPage3(character, pageID, page => {
        const current = page.relationships ?? []
        if (current.length >= PAGE3_RELATIONSHIP_CAP) { return page }
        return {
            ...page,
            relationships: [
                ...current,
                { id: 0, key: newRow.key, value: newRow.value, r: newRow.r, p: newRow.p }
            ]
        }
    })
}

export function updateRelationship(
    character: CharacterVersion2,
    pageID: number,
    index: number,
    next: Page3Relationship
): CharacterVersion2 {
    return mapPage3(character, pageID, page => ({
        ...page,
        relationships: mapOrRemove(
            page.relationships ?? [],
            index,
            next,
            row => row.value === '' && row.r === '' && row.p === ''
        )
    }))
}

export function updateGearCell(
    character: CharacterVersion2,
    pageID: number,
    slot: Page3GearSlot,
    patch: Partial<Omit<Page3GearCell, 'slot'>>
): CharacterVersion2 {
    return mapPage3(character, pageID, page => ({
        ...page,
        gear: {
            ...page.gear,
            [slot]: {
                ...page.gear[slot],
                ...patch,
                slot
            }
        }
    }))
}

export function updateCoinage(
    character: CharacterVersion2,
    pageID: number,
    patch: Partial<Page3Coinage>
): CharacterVersion2 {
    return mapPage3(character, pageID, page => ({
        ...page,
        coinage: {
            ...page.coinage,
            ...patch
        }
    }))
}

export function updateNotes(character: CharacterVersion2, pageID: number, value: string): CharacterVersion2 {
    return mapPage3(character, pageID, page => ({ ...page, notes: value }))
}
