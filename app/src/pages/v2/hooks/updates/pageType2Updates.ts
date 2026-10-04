import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import {
    AdvancedCombatSkill,
    AdvancedGeneralSkill,
    CombatSuiteKey,
    GeneralSuiteKey,
    NativeLanguage,
    SkillNumber
} from "@vault/common/interfaces/v2/page2/page2Interfaces"
import { Page2 } from "@vault/common/interfaces/v2/pageTypes"

export const ADV_GENERAL_CAP = 40
export const ADV_COMBAT_CAP = 24

export function mapPage2(character: CharacterVersion2, pageID: number, updater: (page: Page2) => Page2): CharacterVersion2 {
    return {
        ...character,
        pages: character.pages.map(page => {
            if (page.type === 2 && page.pageID === pageID) {
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

export function updateGeneralSuiteField(
    character: CharacterVersion2,
    pageID: number,
    suite: GeneralSuiteKey,
    field: 'stat' | 'rank',
    value: SkillNumber
): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({
        ...page,
        generalSuites: {
            ...page.generalSuites,
            [suite]: {
                ...page.generalSuites[suite],
                [field]: value
            }
        }
    }))
}

export function updateCombatSuiteRank(
    character: CharacterVersion2,
    pageID: number,
    suite: CombatSuiteKey,
    value: SkillNumber
): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({
        ...page,
        combatSuites: {
            ...page.combatSuites,
            [suite]: { rank: value }
        }
    }))
}

export function updateNativeLanguage(
    character: CharacterVersion2,
    pageID: number,
    patch: Partial<NativeLanguage>
): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({
        ...page,
        nativeLanguage: {
            ...page.nativeLanguage,
            ...patch
        }
    }))
}

export function updateArmorSkillAdj(character: CharacterVersion2, pageID: number, value: number): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({ ...page, armorSkillAdj: value }))
}

export function updateGenSkillDiscount(character: CharacterVersion2, pageID: number, value: number): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({ ...page, genSkillDiscount: value }))
}

export function updateCombatSkillDiscount(character: CharacterVersion2, pageID: number, value: number): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({ ...page, combatSkillDiscount: value }))
}

export function updateAbilities(character: CharacterVersion2, pageID: number, value: string): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({ ...page, abilities: value }))
}

export function updateBurdens(character: CharacterVersion2, pageID: number, value: string): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({ ...page, burdens: value }))
}

export function insertAdvancedGeneralSkill(
    character: CharacterVersion2,
    pageID: number,
    newRow: { key: string, name: string, stat: SkillNumber, rank: SkillNumber }
): CharacterVersion2 {
    return mapPage2(character, pageID, page => {
        const current = page.advancedGeneralSkills ?? []
        if (current.length >= ADV_GENERAL_CAP) { return page }
        return {
            ...page,
            advancedGeneralSkills: [
                ...current,
                { id: 0, key: newRow.key, name: newRow.name, stat: newRow.stat, rank: newRow.rank }
            ]
        }
    })
}

export function updateAdvancedGeneralSkill(
    character: CharacterVersion2,
    pageID: number,
    index: number,
    next: AdvancedGeneralSkill
): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({
        ...page,
        advancedGeneralSkills: mapOrRemove(
            page.advancedGeneralSkills ?? [],
            index,
            next,
            row => row.name === '' && row.stat === '' && row.rank === ''
        )
    }))
}

export function insertAdvancedCombatSkill(
    character: CharacterVersion2,
    pageID: number,
    newRow: { key: string, name: string, rank: SkillNumber }
): CharacterVersion2 {
    return mapPage2(character, pageID, page => {
        const current = page.advancedCombatSkills ?? []
        if (current.length >= ADV_COMBAT_CAP) { return page }
        return {
            ...page,
            advancedCombatSkills: [
                ...current,
                { id: 0, key: newRow.key, name: newRow.name, rank: newRow.rank }
            ]
        }
    })
}

export function updateAdvancedCombatSkill(
    character: CharacterVersion2,
    pageID: number,
    index: number,
    next: AdvancedCombatSkill
): CharacterVersion2 {
    return mapPage2(character, pageID, page => ({
        ...page,
        advancedCombatSkills: mapOrRemove(
            page.advancedCombatSkills ?? [],
            index,
            next,
            row => row.name === '' && row.rank === ''
        )
    }))
}
