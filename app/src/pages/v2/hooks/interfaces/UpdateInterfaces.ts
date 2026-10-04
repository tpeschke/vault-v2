import { Attack, Defense } from "@vault/common/interfaces/v2/page1/combatInfo"
import { CharacteristicPair, Description, Emotion, Flaw, SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import { Favor } from "@vault/common/interfaces/v2/page1/favor"
import { Stats } from "@vault/common/interfaces/v2/page1/statsInterface"
import { ViewPersistAttribute } from "@vault/common/interfaces/v2/page1/viewPersist"
import { Damage, SelfDoubt, Stress } from "@vault/common/interfaces/v2/page1/vitals"
import {
    AdvancedCombatSkill,
    AdvancedGeneralSkill,
    CombatSuiteKey,
    GeneralSuiteKey,
    NativeLanguage,
    SkillNumber
} from "@vault/common/interfaces/v2/page2/page2Interfaces"
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
    insertDescription: (pageID: number, newRow: { key: string, label: string, attackEmotion: string, defenseEmotion: string, rank: Description['rank'] }) => void
    updateDescription: (pageID: number, index: number, next: Description) => void
    insertFlaw: (pageID: number, newRow: { key: string, flaw: string }) => void
    updateFlaw: (pageID: number, index: number, value: string) => void
    updateFavor: (pageID: number, patch: Partial<Favor>) => void
    updateSelfDoubt: (pageID: number, patch: Partial<SelfDoubt>) => void
    updateDamage: (pageID: number, patch: Partial<Damage>) => void
    updateStress: (pageID: number, patch: Partial<Stress>) => void
    updateDefense: (pageID: number, patch: Partial<Defense>) => void
    updateAttack: (pageID: number, index: number, patch: Partial<Attack>) => void
    persistViewField: (pageID: number, attribute: ViewPersistAttribute, value: number) => void
}

export interface PageType2Updates {
    updateGeneralSuiteField: (pageID: number, suite: GeneralSuiteKey, field: 'stat' | 'rank', value: SkillNumber) => void
    updateCombatSuiteRank: (pageID: number, suite: CombatSuiteKey, value: SkillNumber) => void
    updateNativeLanguage: (pageID: number, patch: Partial<NativeLanguage>) => void
    updateArmorSkillAdj: (pageID: number, value: number) => void
    updateGenSkillDiscount: (pageID: number, value: number) => void
    updateCombatSkillDiscount: (pageID: number, value: number) => void
    insertAdvancedGeneralSkill: (pageID: number, newRow: { key: string, name: string, stat: SkillNumber, rank: SkillNumber }) => void
    updateAdvancedGeneralSkill: (pageID: number, index: number, next: AdvancedGeneralSkill) => void
    insertAdvancedCombatSkill: (pageID: number, newRow: { key: string, name: string, rank: SkillNumber }) => void
    updateAdvancedCombatSkill: (pageID: number, index: number, next: AdvancedCombatSkill) => void
    updateAbilities: (pageID: number, value: string) => void
    updateBurdens: (pageID: number, value: string) => void
}

export interface PageGutterUpdates {
    addPageAfter: (afterIndex: number) => void
    addPageType2After: (afterIndex: number) => void
    swapPageWithNext: (index: number) => void
    movePageToTop: (index: number) => void
    movePageToBottom: (index: number) => void
}

export interface V2UpdateFunctions {
    saveCharacterToBackend: () => Promise<boolean>
    revertCharacter: () => void
    pageType1Updates: PageType1Updates
    pageType2Updates: PageType2Updates
    pageGutterUpdates: PageGutterUpdates
}
