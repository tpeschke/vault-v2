import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import { Page1, Page2, Page3 } from "@vault/common/interfaces/v2/pageTypes"
import { Emotion } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import { Page3GearValue, Page3RelationshipDeleteValue, Page3RelationshipPValue, Page3RelationshipRValue, Page3RelationshipValue, ViewPersistAttribute } from "@vault/common/interfaces/v2/page1/viewPersist"
import { Page3Coinage, Page3Relationship } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import axios from "axios"
import { useState, useEffect, useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { editV2URL, viewV2URL } from "../../../frontend-config"
import { V2CharacterCacheInfo, cacheCharacterV2 } from "../../../redux/slices/characterCacheSlice"
import { updateCatalogInfo } from "../../../redux/slices/usersCharactersSlice"
import { V2UpdateFunctions } from "./interfaces/UpdateInterfaces"
import getV2Updates from "./updates/getV2Updates"
import { applyCurrentEmotionIds, otherPageType1Names, updateCrP, updateDamage, updateFavor, updateSelfDoubt, updateStress } from "./updates/pageType1Updates"
import { updateCombatSkillNotes, updateGeneralSkillNotes } from "./updates/pageType2Updates"
import { dropPage3RelationshipId, mapPage3, putPage3RelationshipSnapshot, setPage3RelationshipId, updateCoinage, updateContacts, updateGearCell, updateNotes } from "./updates/pageType3Updates"

function firstPage1(character: CharacterVersion2): Page1 | undefined {
    return character.pages.find((page): page is Page1 => page.type === 1)
}

function findPage3(character: CharacterVersion2 | null, pageID: number): Page3 | undefined {
    return character?.pages.find((page): page is Page3 => page.type === 3 && page.pageID === pageID)
}

function sheetName(character: CharacterVersion2): string {
    return (firstPage1(character)?.generalInfo.name ?? character.name ?? '').trim()
}

function viewFieldValue(character: CharacterVersion2 | null, pageID: number, attribute: ViewPersistAttribute): number | string | undefined {
    const page1 = character?.pages.find((candidate): candidate is Page1 => candidate.type === 1 && candidate.pageID === pageID)
    if (page1) {
        switch (attribute) {
            case 'unspent':
                return page1.generalInfo.crp.unspent
            case 'currentFavor':
                return page1.favor.current
            case 'diePenalty':
                return page1.vitalsInfo.selfDoubt.diePenalty
            case 'damage':
                return page1.vitalsInfo.damage.damage
            case 'stress':
                return page1.vitalsInfo.stress.stress
            case 'selfDoubtDieIndex':
                return page1.vitalsInfo.selfDoubt.dieIndex
            case 'damageDieIndex':
                return page1.vitalsInfo.damage.dieIndex
            case 'stressDieIndex':
                return page1.vitalsInfo.stress.dieIndex
            case 'currentEmotions':
            case 'page3Contacts':
            case 'page3RelationshipValue':
            case 'page3RelationshipR':
            case 'page3RelationshipP':
            case 'page3RelationshipInsert':
            case 'page3RelationshipDelete':
            case 'page3Gear':
            case 'page3Coinage':
            case 'page3Notes':
                return undefined
        }
    }
    const page2 = character?.pages.find((candidate): candidate is Page2 => candidate.type === 2 && candidate.pageID === pageID)
    if (!page2) {
        return undefined
    }
    switch (attribute) {
        case 'generalSkillNotes':
            return page2.generalSkillNotes
        case 'combatSkillNotes':
            return page2.combatSkillNotes
        default:
            return undefined
    }
}

function patchViewField(character: CharacterVersion2, pageID: number, attribute: ViewPersistAttribute, value: number | string): CharacterVersion2 {
    switch (attribute) {
        case 'unspent':
            return updateCrP(character, pageID, 'unspent', +value)
        case 'currentFavor':
            return updateFavor(character, pageID, { current: +value })
        case 'diePenalty':
            return updateSelfDoubt(character, pageID, { diePenalty: +value })
        case 'damage':
            return updateDamage(character, pageID, { damage: +value })
        case 'stress':
            return updateStress(character, pageID, { stress: +value })
        case 'selfDoubtDieIndex':
            return updateSelfDoubt(character, pageID, { dieIndex: +value })
        case 'damageDieIndex':
            return updateDamage(character, pageID, { dieIndex: +value })
        case 'stressDieIndex':
            return updateStress(character, pageID, { dieIndex: +value })
        case 'generalSkillNotes':
            return updateGeneralSkillNotes(character, pageID, String(value))
        case 'combatSkillNotes':
            return updateCombatSkillNotes(character, pageID, String(value))
        case 'currentEmotions':
        case 'page3Contacts':
        case 'page3RelationshipValue':
        case 'page3RelationshipR':
        case 'page3RelationshipP':
        case 'page3RelationshipInsert':
        case 'page3RelationshipDelete':
        case 'page3Gear':
        case 'page3Coinage':
        case 'page3Notes':
            return character
    }
}

export default function characterHook(pathname: string, isEditing: boolean) {
    const [character, setCharacter] = useState<CharacterVersion2 | null>(null)
    const [revertedCharacter, setRevertedCharacter] = useState<CharacterVersion2 | null>(null)
    const [notesEpoch, setNotesEpoch] = useState(0)
    const revertedRef = useRef<CharacterVersion2 | null>(null)
    revertedRef.current = revertedCharacter
    const characterRef = useRef<CharacterVersion2 | null>(null)
    characterRef.current = character

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const charactersCache: { [key: number]: V2CharacterCacheInfo } = useSelector((state: any) => state.charactersCache.characterCache[2])

    function captureLoaded(data: CharacterVersion2 | null) {
        setCharacter(data)
        setRevertedCharacter(data)
        revertedRef.current = data
        setNotesEpoch(epoch => epoch + 1)
    }

    useEffect(() => {
        const [_, baseURL, characterID] = pathname.split('/')

        if (charactersCache[+characterID]) {
            charactersCache[+characterID].characterInfo.then(data => {
                captureLoaded(data)
            })
        } else {
            dispatch(cacheCharacterV2({
                id: +characterID,
                version: 2,
                characterInfo: axios.get(viewV2URL + characterID).then(({ data }) => {
                    if (data.message) {
                        navigate('/')
                    } else {
                        captureLoaded(data)
                        return data
                    }
                })
            }))
        }
    }, [pathname])

    function revertCharacter() {
        setCharacter(revertedCharacter)
        setNotesEpoch(epoch => epoch + 1)
    }

    const restoreCatalogFromSnapshot = useCallback(() => {
        if (!revertedCharacter) { return }
        const page = firstPage1(revertedCharacter)
        if (!page) { return }
        const { name, ancestry, class: primaryClass, subclass, level } = page.generalInfo
        dispatch(updateCatalogInfo({
            info: { id: revertedCharacter.id, name, ancestry, class: primaryClass, subclass, level },
            index: 1
        }))
    }, [dispatch, revertedCharacter])

    async function saveCharacterToBackend(): Promise<boolean> {
        if (!character) {
            return false
        }

        if (!sheetName(character)) {
            toast.error('Name cannot be empty')
            return false
        }

        const characterToSend = character
        setCharacter(null)
        try {
            const { data } = await axios.post(editV2URL + characterToSend.id, characterToSend)
            if (data.message && !data.pages) {
                setCharacter(characterToSend)
                toast.error(data.message)
                return false
            }
            captureLoaded(data)
            dispatch(cacheCharacterV2({
                id: data.id,
                version: 2,
                characterInfo: Promise.resolve(data)
            }))
            const page = firstPage1(data)
            dispatch(updateCatalogInfo({
                info: {
                    id: data.id,
                    name: page?.generalInfo.name ?? data.name,
                    ancestry: page?.generalInfo.ancestry ?? '',
                    class: page?.generalInfo.class ?? '',
                    subclass: page?.generalInfo.subclass ?? '',
                    level: page?.generalInfo.level ?? 0,
                    otherPageType1Names: otherPageType1Names(data)
                },
                index: 1
            }))
            return true
        } catch (error) {
            setCharacter(characterToSend)
            const message = axios.isAxiosError(error) && typeof error.response?.data?.message === 'string'
                ? error.response.data.message
                : 'Save failed'
            toast.error(message)
            return false
        }
    }

    const [inFlight, setInFlight] = useState(0)

    function persistViewField(pageID: number, attribute: ViewPersistAttribute, value: number | string) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        if (viewFieldValue(revertedCharacter, pageID, attribute) === value) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute, value })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                const patched = patchViewField(snapshot, pageID, attribute, value)
                revertedRef.current = patched
                setRevertedCharacter(patched)
                dispatch(cacheCharacterV2({
                    id: patched.id,
                    version: 2,
                    characterInfo: Promise.resolve(patched)
                }))
            })
            .catch(error => {
                const message = axios.isAxiosError(error) && typeof error.response?.data?.message === 'string'
                    ? error.response.data.message
                    : 'Save failed'
                toast.error(message)
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistCurrentEmotions(pageID: number, nextRows: Emotion[], blurred: { index: number, value: string } | { insert: true, value: string }) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        const snapshotPage = revertedCharacter?.pages.find((candidate): candidate is Page1 => candidate.type === 1 && candidate.pageID === pageID)
        const snapshotRows = snapshotPage?.characteristicsInfo.currentEmotions ?? []
        if ('insert' in blurred) {
            if (blurred.value === '') {
                return
            }
        } else if ((snapshotRows[blurred.index]?.value ?? '') === blurred.value) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute: 'currentEmotions', value: nextRows })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const returned = data.currentEmotions
                if (!Array.isArray(returned) || returned.length !== nextRows.length) {
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                setCharacter(current => {
                    if (!current) {
                        return current
                    }
                    const liveRows = current.pages.find((candidate): candidate is Page1 => candidate.type === 1 && candidate.pageID === pageID)?.characteristicsInfo.currentEmotions ?? []
                    const source = liveRows.length === returned.length ? liveRows : nextRows
                    const merged = source.map((row, index) => ({ ...row, id: returned[index].id }))
                    return applyCurrentEmotionIds(current, pageID, merged)
                })
                const patchedRows = nextRows.map((row, index) => ({ ...row, id: returned[index].id }))
                const patched = applyCurrentEmotionIds(snapshot, pageID, patchedRows)
                revertedRef.current = patched
                setRevertedCharacter(patched)
                dispatch(cacheCharacterV2({
                    id: patched.id,
                    version: 2,
                    characterInfo: Promise.resolve(patched)
                }))
            })
            .catch(error => {
                const message = axios.isAxiosError(error) && typeof error.response?.data?.message === 'string'
                    ? error.response.data.message
                    : 'Save failed'
                toast.error(message)
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistFailureMessage(error: unknown) {
        return axios.isAxiosError(error) && typeof error.response?.data?.message === 'string'
            ? error.response.data.message
            : 'Save failed'
    }

    function commitSnapshot(patched: CharacterVersion2) {
        revertedRef.current = patched
        setRevertedCharacter(patched)
        dispatch(cacheCharacterV2({
            id: patched.id,
            version: 2,
            characterInfo: Promise.resolve(patched)
        }))
    }

    function persistPage3Contacts(pageID: number, value: string) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        if ((findPage3(revertedCharacter, pageID)?.contacts ?? '') === value) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute: 'page3Contacts', value })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                commitSnapshot(updateContacts(snapshot, pageID, value))
            })
            .catch(error => {
                toast.error(persistFailureMessage(error))
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistPage3RelationshipValue(pageID: number, value: Page3RelationshipValue) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        const snapshotRow = findPage3(revertedCharacter, pageID)?.relationships.find(row => row.id === value.id)
        if (!snapshotRow || snapshotRow.value === value.value) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute: 'page3RelationshipValue', value })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                commitSnapshot(mapPage3(snapshot, pageID, page => ({
                    ...page,
                    relationships: page.relationships.map(row => row.id === value.id ? { ...row, value: value.value } : row)
                })))
            })
            .catch(error => {
                toast.error(persistFailureMessage(error))
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistPage3RelationshipR(pageID: number, value: Page3RelationshipRValue) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        const snapshotRow = findPage3(revertedCharacter, pageID)?.relationships.find(row => row.id === value.id)
        if (!snapshotRow || snapshotRow.r === value.r) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute: 'page3RelationshipR', value })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                commitSnapshot(mapPage3(snapshot, pageID, page => ({
                    ...page,
                    relationships: page.relationships.map(row => row.id === value.id ? { ...row, r: value.r } : row)
                })))
            })
            .catch(error => {
                toast.error(persistFailureMessage(error))
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistPage3RelationshipP(pageID: number, value: Page3RelationshipPValue) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        const snapshotRow = findPage3(revertedCharacter, pageID)?.relationships.find(row => row.id === value.id)
        if (!snapshotRow || snapshotRow.p === value.p) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute: 'page3RelationshipP', value })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                const patched = mapPage3(snapshot, pageID, page => ({
                    ...page,
                    relationships: page.relationships.map(row => row.id === value.id ? { ...row, p: value.p } : row)
                }))
                revertedRef.current = patched
                setRevertedCharacter(patched)
                dispatch(cacheCharacterV2({
                    id: patched.id,
                    version: 2,
                    characterInfo: Promise.resolve(patched)
                }))
            })
            .catch(error => {
                const message = axios.isAxiosError(error) && typeof error.response?.data?.message === 'string'
                    ? error.response.data.message
                    : 'Save failed'
                toast.error(message)
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistPage3Gear(pageID: number, value: Page3GearValue) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        const snapshotCell = findPage3(revertedCharacter, pageID)?.gear[value.slot]
        if (snapshotCell
            && (value.item === undefined || snapshotCell.item === value.item)
            && (value.size === undefined || snapshotCell.size === value.size)
            && (value.staffSnake === undefined || snapshotCell.staffSnake === value.staffSnake)
            && (value.meditating === undefined || snapshotCell.meditating === value.meditating)
            && (value.w === undefined || snapshotCell.w === value.w)
        ) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute: 'page3Gear', value })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                const gearPatch: Parameters<typeof updateGearCell>[3] = {}
                if (value.item !== undefined) { gearPatch.item = value.item }
                if (value.size !== undefined) { gearPatch.size = value.size }
                if (value.staffSnake !== undefined) { gearPatch.staffSnake = value.staffSnake }
                if (value.meditating !== undefined) { gearPatch.meditating = value.meditating }
                if (value.w !== undefined) { gearPatch.w = value.w }
                const patched = updateGearCell(snapshot, pageID, value.slot, gearPatch)
                revertedRef.current = patched
                setRevertedCharacter(patched)
                dispatch(cacheCharacterV2({
                    id: patched.id,
                    version: 2,
                    characterInfo: Promise.resolve(patched)
                }))
            })
            .catch(error => {
                const message = axios.isAxiosError(error) && typeof error.response?.data?.message === 'string'
                    ? error.response.data.message
                    : 'Save failed'
                toast.error(message)
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistPage3Coinage(pageID: number, value: Page3Coinage) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        const snapshot = findPage3(revertedCharacter, pageID)?.coinage
        if (snapshot
            && snapshot.copper === value.copper
            && snapshot.copperSize === value.copperSize
            && snapshot.silver === value.silver
            && snapshot.silverSize === value.silverSize
            && snapshot.gold === value.gold
            && snapshot.goldSize === value.goldSize
            && snapshot.platinum === value.platinum
            && snapshot.platinumSize === value.platinumSize
        ) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute: 'page3Coinage', value })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const currentSnapshot = revertedRef.current
                if (!currentSnapshot) {
                    return
                }
                const patched = updateCoinage(currentSnapshot, pageID, value)
                revertedRef.current = patched
                setRevertedCharacter(patched)
                dispatch(cacheCharacterV2({
                    id: patched.id,
                    version: 2,
                    characterInfo: Promise.resolve(patched)
                }))
            })
            .catch(error => {
                const message = axios.isAxiosError(error) && typeof error.response?.data?.message === 'string'
                    ? error.response.data.message
                    : 'Save failed'
                toast.error(message)
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistPage3Notes(pageID: number, value: string) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        if ((findPage3(revertedCharacter, pageID)?.notes ?? '') === value) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute: 'page3Notes', value })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                const patched = updateNotes(snapshot, pageID, value)
                revertedRef.current = patched
                setRevertedCharacter(patched)
                dispatch(cacheCharacterV2({
                    id: patched.id,
                    version: 2,
                    characterInfo: Promise.resolve(patched)
                }))
            })
            .catch(error => {
                const message = axios.isAxiosError(error) && typeof error.response?.data?.message === 'string'
                    ? error.response.data.message
                    : 'Save failed'
                toast.error(message)
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistPage3RelationshipInsert(pageID: number, row: { key: string, value: string, r: Page3Relationship['r'], p: Page3Relationship['p'] }) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter) {
            return
        }
        if (row.value === '' && row.r === '' && row.p === '') {
            return
        }
        const characterID = character.id

        setInFlight(count => count + 1)
        axios.post(editV2URL + characterID + '/field', {
            pageID,
            attribute: 'page3RelationshipInsert',
            value: { value: row.value, r: row.r, p: row.p }
        })
            .then(({ data }) => {
                if (!data.success || typeof data.id !== 'number' || !(data.id > 0)) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const id = data.id as number
                const liveRow = findPage3(characterRef.current, pageID)?.relationships.find(candidate => candidate.key === row.key)
                if (liveRow) {
                    setCharacter(current => current ? setPage3RelationshipId(current, pageID, row.key, id) : current)
                }
                if (!liveRow) {
                    setInFlight(count => count + 1)
                    axios.post(editV2URL + characterID + '/field', { pageID, attribute: 'page3RelationshipDelete', value: { id } })
                        .then(({ data: deleted }) => {
                            if (!deleted.success) {
                                toast.error(typeof deleted.message === 'string' ? deleted.message : 'Save failed')
                            }
                        })
                        .catch(error => {
                            toast.error(persistFailureMessage(error))
                        })
                        .finally(() => {
                            setInFlight(count => Math.max(0, count - 1))
                        })
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                const liveValue = liveRow.value
                const liveR = liveRow.r
                const liveP = liveRow.p
                commitSnapshot(putPage3RelationshipSnapshot(snapshot, pageID, row.key, id, row))
                const followUps: Array<{ attribute: 'page3RelationshipValue' | 'page3RelationshipR' | 'page3RelationshipP', value: Page3RelationshipValue | Page3RelationshipRValue | Page3RelationshipPValue, patch: (current: CharacterVersion2) => CharacterVersion2 }> = []
                if (liveValue !== row.value) {
                    followUps.push({
                        attribute: 'page3RelationshipValue',
                        value: { id, value: liveValue },
                        patch: current => mapPage3(current, pageID, page => ({
                            ...page,
                            relationships: page.relationships.map(candidate => candidate.id === id ? { ...candidate, value: liveValue } : candidate)
                        }))
                    })
                }
                if (liveR !== row.r) {
                    followUps.push({
                        attribute: 'page3RelationshipR',
                        value: { id, r: liveR },
                        patch: current => mapPage3(current, pageID, page => ({
                            ...page,
                            relationships: page.relationships.map(candidate => candidate.id === id ? { ...candidate, r: liveR } : candidate)
                        }))
                    })
                }
                if (liveP !== row.p) {
                    followUps.push({
                        attribute: 'page3RelationshipP',
                        value: { id, p: liveP },
                        patch: current => mapPage3(current, pageID, page => ({
                            ...page,
                            relationships: page.relationships.map(candidate => candidate.id === id ? { ...candidate, p: liveP } : candidate)
                        }))
                    })
                }
                followUps.forEach(item => {
                    setInFlight(count => count + 1)
                    axios.post(editV2URL + characterID + '/field', { pageID, attribute: item.attribute, value: item.value })
                        .then(({ data: cell }) => {
                            if (!cell.success) {
                                toast.error(typeof cell.message === 'string' ? cell.message : 'Save failed')
                                return
                            }
                            const currentSnapshot = revertedRef.current
                            if (!currentSnapshot) {
                                return
                            }
                            commitSnapshot(item.patch(currentSnapshot))
                        })
                        .catch(error => {
                            toast.error(persistFailureMessage(error))
                        })
                        .finally(() => {
                            setInFlight(count => Math.max(0, count - 1))
                        })
                })
            })
            .catch(error => {
                toast.error(persistFailureMessage(error))
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    function persistPage3RelationshipDelete(pageID: number, value: Page3RelationshipDeleteValue) {
        if (!character || isEditing || !character.userInfo.ownsThisCharacter || !(value.id > 0)) {
            return
        }

        setInFlight(count => count + 1)
        axios.post(editV2URL + character.id + '/field', { pageID, attribute: 'page3RelationshipDelete', value })
            .then(({ data }) => {
                if (!data.success) {
                    toast.error(typeof data.message === 'string' ? data.message : 'Save failed')
                    return
                }
                const snapshot = revertedRef.current
                if (!snapshot) {
                    return
                }
                commitSnapshot(dropPage3RelationshipId(snapshot, pageID, value.id))
            })
            .catch(error => {
                toast.error(persistFailureMessage(error))
            })
            .finally(() => {
                setInFlight(count => Math.max(0, count - 1))
            })
    }

    const page3Persist = {
        persistPage3Contacts,
        persistPage3RelationshipValue,
        persistPage3RelationshipR,
        persistPage3RelationshipP,
        persistPage3RelationshipInsert,
        persistPage3RelationshipDelete,
        persistPage3Gear,
        persistPage3Coinage,
        persistPage3Notes
    }

    const [updates, setUpdates] = useState(() => getV2Updates(character, setCharacter, dispatch, persistViewField, persistCurrentEmotions, page3Persist))

    useEffect(() => {
        setUpdates(getV2Updates(character, setCharacter, dispatch, persistViewField, persistCurrentEmotions, page3Persist))
    }, [character, isEditing, revertedCharacter])

    const updateFunctions: V2UpdateFunctions = {
        saveCharacterToBackend,
        revertCharacter,
        pageType1Updates: updates.pageType1Updates,
        pageType2Updates: updates.pageType2Updates,
        pageType3Updates: updates.pageType3Updates,
        pageType4Updates: updates.pageType4Updates,
        pageGutterUpdates: updates.pageGutterUpdates
    }

    return {
        character,
        isDirty: !!(character && revertedCharacter && character !== revertedCharacter),
        isViewSaving: inFlight > 0,
        notesEpoch,
        restoreCatalogFromSnapshot,
        updateFunctions
    }
}
