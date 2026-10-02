import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import { Attack, AttacksArray, Defense } from "@vault/common/interfaces/v2/page1/combatInfo"
import { CharacteristicPair, Description, Emotion, Flaw, SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import { Favor } from "@vault/common/interfaces/v2/page1/favor"
import { GeneralInfo } from "@vault/common/interfaces/v2/page1/generalInfoInterfaces"
import { Stats } from "@vault/common/interfaces/v2/page1/statsInterface"
import { Damage, SelfDoubt, Stress } from "@vault/common/interfaces/v2/page1/vitals"
import { Page1 } from "@vault/common/interfaces/v2/pageTypes"
import { SkillPair } from "@vault/common/interfaces/v2/pairInterfaces"

export function mapPage1(character: CharacterVersion2, pageID: number, updater: (page: Page1) => Page1): CharacterVersion2 {
    return {
        ...character,
        pages: character.pages.map(page => {
            if (page.type === 1 && page.pageID === pageID) {
                return updater(page)
            }
            return page
        })
    }
}

function getToLvl(level: number): number {
    if (level < 1 || level > 9) { return 0 }
    const spentCrPToLevel = [0, 40, 80, 120, 190, 260, 330, 420, 520, 630]
    return spentCrPToLevel[level]
}

function mapOrRemove<T>(items: T[], index: number, next: T, isEmpty: (row: T) => boolean): T[] {
    if (isEmpty(next)) {
        return items.filter((_, itemIndex) => itemIndex !== index)
    }
    return items.map((row, itemIndex) => itemIndex === index ? next : row)
}

export function updateGeneralInfoField(character: CharacterVersion2, pageID: number, key: 'name' | 'ancestry' | 'class' | 'subclass' | 'level', value: string | number): CharacterVersion2 {
    const next = mapPage1(character, pageID, page => {
        const generalInfo: GeneralInfo = {
            ...page.generalInfo,
            [key]: value
        }
        if (key === 'level') {
            generalInfo.crp = {
                ...generalInfo.crp,
                toLvl: getToLvl(+value)
            }
        }
        return { ...page, generalInfo }
    })
    if (key === 'name') {
        return { ...next, name: String(value) }
    }
    return next
}

export function updateCrP(character: CharacterVersion2, pageID: number, key: 'unspent' | 'spent', value: number): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        generalInfo: {
            ...page.generalInfo,
            crp: {
                ...page.generalInfo.crp,
                [key]: value
            }
        }
    }))
}

export function updateStat(character: CharacterVersion2, pageID: number, key: keyof Stats, value: number): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        stats: {
            ...page.stats,
            [key]: value
        }
    }))
}

export function insertEmotion(character: CharacterVersion2, pageID: number, newRow: { key: string, value: string }): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        characteristicsInfo: {
            ...page.characteristicsInfo,
            currentEmotions: [
                ...(page.characteristicsInfo.currentEmotions ?? []),
                { id: 0, key: newRow.key, value: newRow.value }
            ]
        }
    }))
}

export function updateEmotion(character: CharacterVersion2, pageID: number, index: number, value: string): CharacterVersion2 {
    return mapPage1(character, pageID, page => {
        const current = page.characteristicsInfo.currentEmotions ?? []
        const currentRow = current[index]
        if (!currentRow) { return page }
        const currentEmotions = mapOrRemove<Emotion>(
            current,
            index,
            { ...currentRow, value },
            row => row.value === ''
        )
        return {
            ...page,
            characteristicsInfo: {
                ...page.characteristicsInfo,
                currentEmotions
            }
        }
    })
}

export function updateSocialSuiteField(character: CharacterVersion2, pageID: number, suite: keyof SocialSkillSuites, field: 'stat' | 'rank', value: number): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        characteristicsInfo: {
            ...page.characteristicsInfo,
            socialSuites: {
                ...page.characteristicsInfo.socialSuites,
                [suite]: {
                    ...page.characteristicsInfo.socialSuites[suite],
                    [field]: value
                }
            }
        }
    }))
}

export function insertSocialSuiteDescription(character: CharacterVersion2, pageID: number, suite: keyof SocialSkillSuites, newRow: { key: string, value: string, rank: SkillPair['rank'] }): CharacterVersion2 {
    return mapPage1(character, pageID, page => {
        const current = page.characteristicsInfo.socialSuites[suite]
        return {
            ...page,
            characteristicsInfo: {
                ...page.characteristicsInfo,
                socialSuites: {
                    ...page.characteristicsInfo.socialSuites,
                    [suite]: {
                        ...current,
                        descriptions: [
                            ...(current.descriptions ?? []),
                            { id: 0, key: newRow.key, value: newRow.value, rank: newRow.rank }
                        ]
                    }
                }
            }
        }
    })
}

export function updateSocialSuiteDescription(character: CharacterVersion2, pageID: number, suite: keyof SocialSkillSuites, index: number, next: SkillPair): CharacterVersion2 {
    return mapPage1(character, pageID, page => {
        const current = page.characteristicsInfo.socialSuites[suite]
        const descriptions = mapOrRemove<SkillPair>(
            current.descriptions ?? [],
            index,
            next,
            row => row.value === '' && row.rank === ''
        )
        return {
            ...page,
            characteristicsInfo: {
                ...page.characteristicsInfo,
                socialSuites: {
                    ...page.characteristicsInfo.socialSuites,
                    [suite]: {
                        ...current,
                        descriptions
                    }
                }
            }
        }
    })
}

export function insertReputation(character: CharacterVersion2, pageID: number, newRow: { key: string, value: string, rank: string }): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        characteristicsInfo: {
            ...page.characteristicsInfo,
            reputations: [
                ...(page.characteristicsInfo.reputations ?? []),
                { id: 0, key: newRow.key, value: newRow.value, rank: newRow.rank }
            ]
        }
    }))
}

export function updateReputation(character: CharacterVersion2, pageID: number, index: number, next: CharacteristicPair): CharacterVersion2 {
    return mapPage1(character, pageID, page => {
        const reputations = mapOrRemove<CharacteristicPair>(
            page.characteristicsInfo.reputations ?? [],
            index,
            next,
            row => row.value === '' && row.rank === ''
        )
        return {
            ...page,
            characteristicsInfo: {
                ...page.characteristicsInfo,
                reputations
            }
        }
    })
}

export function updateCulturalStrength(character: CharacterVersion2, pageID: number, value: string): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        characteristicsInfo: {
            ...page.characteristicsInfo,
            culturalStrength: value
        }
    }))
}

export function updateSocialSkillDiscount(character: CharacterVersion2, pageID: number, value: number): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        characteristicsInfo: {
            ...page.characteristicsInfo,
            socialSkillDiscount: value
        }
    }))
}

export function insertDescription(character: CharacterVersion2, pageID: number, newRow: { key: string, value: string }): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        characteristicsInfo: {
            ...page.characteristicsInfo,
            descriptions: [
                ...(page.characteristicsInfo.descriptions ?? []),
                { id: 0, key: newRow.key, value: newRow.value }
            ]
        }
    }))
}

export function updateDescription(character: CharacterVersion2, pageID: number, index: number, value: string): CharacterVersion2 {
    return mapPage1(character, pageID, page => {
        const current = page.characteristicsInfo.descriptions ?? []
        const currentRow = current[index]
        if (!currentRow) { return page }
        const descriptions = mapOrRemove<Description>(
            current,
            index,
            { ...currentRow, value },
            row => row.value === ''
        )
        return {
            ...page,
            characteristicsInfo: {
                ...page.characteristicsInfo,
                descriptions
            }
        }
    })
}

export function insertFlaw(character: CharacterVersion2, pageID: number, newRow: { key: string, flaw: string }): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        characteristicsInfo: {
            ...page.characteristicsInfo,
            flaws: [
                ...(page.characteristicsInfo.flaws ?? []),
                { id: 0, key: newRow.key, flaw: newRow.flaw }
            ]
        }
    }))
}

export function updateFlaw(character: CharacterVersion2, pageID: number, index: number, value: string): CharacterVersion2 {
    return mapPage1(character, pageID, page => {
        const current = page.characteristicsInfo.flaws ?? []
        const currentRow = current[index]
        if (!currentRow) { return page }
        const flaws = mapOrRemove<Flaw>(
            current,
            index,
            { ...currentRow, flaw: value },
            row => row.flaw === ''
        )
        return {
            ...page,
            characteristicsInfo: {
                ...page.characteristicsInfo,
                flaws
            }
        }
    })
}

export function updateFavor(character: CharacterVersion2, pageID: number, patch: Partial<Favor>): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        favor: {
            ...page.favor,
            ...patch
        }
    }))
}

export function updateSelfDoubt(character: CharacterVersion2, pageID: number, patch: Partial<SelfDoubt>): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        vitalsInfo: {
            ...page.vitalsInfo,
            selfDoubt: {
                ...page.vitalsInfo.selfDoubt,
                ...patch
            }
        }
    }))
}

export function updateDamage(character: CharacterVersion2, pageID: number, patch: Partial<Damage>): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        vitalsInfo: {
            ...page.vitalsInfo,
            damage: {
                ...page.vitalsInfo.damage,
                ...patch
            }
        }
    }))
}

export function updateStress(character: CharacterVersion2, pageID: number, patch: Partial<Stress>): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        vitalsInfo: {
            ...page.vitalsInfo,
            stress: {
                ...page.vitalsInfo.stress,
                ...patch
            }
        }
    }))
}

export function updateDefense(character: CharacterVersion2, pageID: number, patch: Partial<Defense>): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        combatInfo: {
            ...page.combatInfo,
            defenses: {
                ...page.combatInfo.defenses,
                ...patch
            }
        }
    }))
}

export function updateAttack(character: CharacterVersion2, pageID: number, index: number, patch: Partial<Attack>): CharacterVersion2 {
    return mapPage1(character, pageID, page => ({
        ...page,
        combatInfo: {
            ...page.combatInfo,
            attacks: page.combatInfo.attacks.map((attack, attackIndex) => (
                attackIndex === index ? { ...attack, ...patch } : attack
            )) as AttacksArray
        }
    }))
}
