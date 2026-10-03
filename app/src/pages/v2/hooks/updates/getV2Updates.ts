import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import { SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import { Favor } from "@vault/common/interfaces/v2/page1/favor"
import { Attack, Defense } from "@vault/common/interfaces/v2/page1/combatInfo"
import { Stats } from "@vault/common/interfaces/v2/page1/statsInterface"
import { ViewPersistAttribute } from "@vault/common/interfaces/v2/page1/viewPersist"
import { Damage, SelfDoubt, Stress } from "@vault/common/interfaces/v2/page1/vitals"
import { Dispatch } from "redux"
import { updateCatalogInfo } from "../../../../redux/slices/usersCharactersSlice"
import { Page1 } from "@vault/common/interfaces/v2/pageTypes"
import { PageType1Updates } from "../interfaces/UpdateInterfaces"
import {
    insertDescription,
    insertEmotion,
    insertFlaw,
    insertReputation,
    insertSocialSuiteDescription,
    updateAttack,
    updateCapacity,
    updateCrP,
    updateCulturalStrength,
    updateDamage,
    updateDefense,
    updateDescription,
    updateEmotion,
    updateFavor,
    updateFlaw,
    updateGeneralInfoField,
    updateReputation,
    updateSelfDoubt,
    updateSocialSkillDiscount,
    updateSocialSuiteDescription,
    updateSocialSuiteField,
    updateStat,
    updateStress
} from "./pageType1Updates"

function findPage1(character: CharacterVersion2, pageID: number): Page1 | undefined {
    return character.pages.find((page): page is Page1 => page.type === 1 && page.pageID === pageID)
}

function dispatchCatalog(character: CharacterVersion2, pageID: number, dispatch: Dispatch) {
    const page = findPage1(character, pageID)
    if (!page) { return }
    const { name, ancestry, class: primaryClass, subclass, level } = page.generalInfo
    dispatch(updateCatalogInfo({
        info: { id: character.id, name, ancestry, class: primaryClass, subclass, level },
        index: 1
    }))
}

export default function getV2Updates(
    character: CharacterVersion2 | null,
    setCharacter: (character: CharacterVersion2) => void,
    dispatch: Dispatch,
    persistViewField: (pageID: number, attribute: ViewPersistAttribute, value: number) => void
): PageType1Updates {
    function apply(next: CharacterVersion2) {
        setCharacter(next)
        return next
    }

    return {
        updateGeneralInfoField: (pageID, key, value) => {
            if (!character) { return }
            const next = apply(updateGeneralInfoField(character, pageID, key, value))
            dispatchCatalog(next, pageID, dispatch)
        },
        updateCrP: (pageID, key, value) => {
            if (!character) { return }
            apply(updateCrP(character, pageID, key, value))
        },
        updateStat: (pageID, key: keyof Stats, value) => {
            if (!character) { return }
            apply(updateStat(character, pageID, key, value))
        },
        insertEmotion: (pageID, newRow) => {
            if (!character) { return }
            apply(insertEmotion(character, pageID, newRow))
        },
        updateEmotion: (pageID, index, value) => {
            if (!character) { return }
            apply(updateEmotion(character, pageID, index, value))
        },
        updateSocialSuiteField: (pageID, suite: keyof SocialSkillSuites, field, value) => {
            if (!character) { return }
            apply(updateSocialSuiteField(character, pageID, suite, field, value))
        },
        insertSocialSuiteDescription: (pageID, suite: keyof SocialSkillSuites, newRow) => {
            if (!character) { return }
            apply(insertSocialSuiteDescription(character, pageID, suite, newRow))
        },
        updateSocialSuiteDescription: (pageID, suite: keyof SocialSkillSuites, index, next) => {
            if (!character) { return }
            apply(updateSocialSuiteDescription(character, pageID, suite, index, next))
        },
        insertReputation: (pageID, newRow) => {
            if (!character) { return }
            apply(insertReputation(character, pageID, newRow))
        },
        updateReputation: (pageID, index, next) => {
            if (!character) { return }
            apply(updateReputation(character, pageID, index, next))
        },
        updateCapacity: (pageID, value) => {
            if (!character) { return }
            apply(updateCapacity(character, pageID, value))
        },
        updateCulturalStrength: (pageID, value) => {
            if (!character) { return }
            apply(updateCulturalStrength(character, pageID, value))
        },
        updateSocialSkillDiscount: (pageID, value) => {
            if (!character) { return }
            apply(updateSocialSkillDiscount(character, pageID, value))
        },
        insertDescription: (pageID, newRow) => {
            if (!character) { return }
            apply(insertDescription(character, pageID, newRow))
        },
        updateDescription: (pageID, index, next) => {
            if (!character) { return }
            apply(updateDescription(character, pageID, index, next))
        },
        insertFlaw: (pageID, newRow) => {
            if (!character) { return }
            apply(insertFlaw(character, pageID, newRow))
        },
        updateFlaw: (pageID, index, value) => {
            if (!character) { return }
            apply(updateFlaw(character, pageID, index, value))
        },
        updateFavor: (pageID, patch: Partial<Favor>) => {
            if (!character) { return }
            apply(updateFavor(character, pageID, patch))
        },
        updateSelfDoubt: (pageID, patch: Partial<SelfDoubt>) => {
            if (!character) { return }
            apply(updateSelfDoubt(character, pageID, patch))
        },
        updateDamage: (pageID, patch: Partial<Damage>) => {
            if (!character) { return }
            apply(updateDamage(character, pageID, patch))
        },
        updateStress: (pageID, patch: Partial<Stress>) => {
            if (!character) { return }
            apply(updateStress(character, pageID, patch))
        },
        updateDefense: (pageID, patch: Partial<Defense>) => {
            if (!character) { return }
            apply(updateDefense(character, pageID, patch))
        },
        updateAttack: (pageID, index, patch: Partial<Attack>) => {
            if (!character) { return }
            apply(updateAttack(character, pageID, index, patch))
        },
        persistViewField
    }
}
