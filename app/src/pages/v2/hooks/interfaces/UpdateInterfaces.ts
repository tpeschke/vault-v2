import { Attack, Defense } from "@vault/common/interfaces/v2/page1/combatInfo"
import { CharacteristicPair, Description, Emotion, Flaw, SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import { Favor } from "@vault/common/interfaces/v2/page1/favor"
import { Stats } from "@vault/common/interfaces/v2/page1/statsInterface"
import { Damage, SelfDoubt, Stress } from "@vault/common/interfaces/v2/page1/vitals"
import { SkillPair } from "@vault/common/interfaces/v2/pairInterfaces"

export interface PageType1Updates {
    updateGeneralInfoField: (pageID: number, key: 'name' | 'ancestry' | 'class' | 'subclass' | 'level', value: string | number) => void
    updateCrP: (pageID: number, key: 'unspent' | 'spent', value: number) => void
    updateStat: (pageID: number, key: keyof Stats, value: number) => void
    insertEmotion: (pageID: number, newRow: { key: string, value: string }) => void
    updateEmotion: (pageID: number, index: number, value: string) => void
    updateSocialSuiteField: (pageID: number, suite: keyof SocialSkillSuites, field: 'stat' | 'rank', value: number) => void
    insertSocialSuiteDescription: (pageID: number, suite: keyof SocialSkillSuites, newRow: { key: string, value: string, rank: SkillPair['rank'] }) => void
    updateSocialSuiteDescription: (pageID: number, suite: keyof SocialSkillSuites, index: number, next: SkillPair) => void
    insertReputation: (pageID: number, newRow: { key: string, value: string, rank: string }) => void
    updateReputation: (pageID: number, index: number, next: CharacteristicPair) => void
    updateCapacity: (pageID: number, value: number) => void
    updateCulturalStrength: (pageID: number, value: string) => void
    updateSocialSkillDiscount: (pageID: number, value: number) => void
    insertDescription: (pageID: number, newRow: { key: string, value: string }) => void
    updateDescription: (pageID: number, index: number, value: string) => void
    insertFlaw: (pageID: number, newRow: { key: string, flaw: string }) => void
    updateFlaw: (pageID: number, index: number, value: string) => void
    updateFavor: (pageID: number, patch: Partial<Favor>) => void
    updateSelfDoubt: (pageID: number, patch: Partial<SelfDoubt>) => void
    updateDamage: (pageID: number, patch: Partial<Damage>) => void
    updateStress: (pageID: number, patch: Partial<Stress>) => void
    updateDefense: (pageID: number, patch: Partial<Defense>) => void
    updateAttack: (pageID: number, index: number, patch: Partial<Attack>) => void
}

export interface V2UpdateFunctions {
    saveCharacterToBackend: () => void
    revertCharacter: () => void
    pageType1Updates: PageType1Updates
}
