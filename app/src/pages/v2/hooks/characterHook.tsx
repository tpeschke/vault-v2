import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import { Page1 } from "@vault/common/interfaces/v2/pageTypes"
import { ViewPersistAttribute } from "@vault/common/interfaces/v2/page1/viewPersist"
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
import { updateCrP, updateDamage, updateFavor, updateSelfDoubt, updateStress } from "./updates/pageType1Updates"

function firstPage1(character: CharacterVersion2): Page1 | undefined {
    return character.pages.find((page): page is Page1 => page.type === 1)
}

function sheetName(character: CharacterVersion2): string {
    return (firstPage1(character)?.generalInfo.name ?? character.name ?? '').trim()
}

function viewFieldValue(character: CharacterVersion2 | null, pageID: number, attribute: ViewPersistAttribute): number | undefined {
    const page = character?.pages.find((candidate): candidate is Page1 => candidate.type === 1 && candidate.pageID === pageID)
    if (!page) {
        return undefined
    }
    switch (attribute) {
        case 'unspent':
            return page.generalInfo.crp.unspent
        case 'currentFavor':
            return page.favor.current
        case 'diePenalty':
            return page.vitalsInfo.selfDoubt.diePenalty
        case 'damage':
            return page.vitalsInfo.damage.damage
        case 'stress':
            return page.vitalsInfo.stress.stress
        case 'selfDoubtDieIndex':
            return page.vitalsInfo.selfDoubt.dieIndex
        case 'damageDieIndex':
            return page.vitalsInfo.damage.dieIndex
        case 'stressDieIndex':
            return page.vitalsInfo.stress.dieIndex
    }
}

function patchViewField(character: CharacterVersion2, pageID: number, attribute: ViewPersistAttribute, value: number): CharacterVersion2 {
    switch (attribute) {
        case 'unspent':
            return updateCrP(character, pageID, 'unspent', value)
        case 'currentFavor':
            return updateFavor(character, pageID, { current: value })
        case 'diePenalty':
            return updateSelfDoubt(character, pageID, { diePenalty: value })
        case 'damage':
            return updateDamage(character, pageID, { damage: value })
        case 'stress':
            return updateStress(character, pageID, { stress: value })
        case 'selfDoubtDieIndex':
            return updateSelfDoubt(character, pageID, { dieIndex: value })
        case 'damageDieIndex':
            return updateDamage(character, pageID, { dieIndex: value })
        case 'stressDieIndex':
            return updateStress(character, pageID, { dieIndex: value })
    }
}

export default function characterHook(pathname: string, isEditing: boolean) {
    const [character, setCharacter] = useState<CharacterVersion2 | null>(null)
    const [revertedCharacter, setRevertedCharacter] = useState<CharacterVersion2 | null>(null)
    const revertedRef = useRef<CharacterVersion2 | null>(null)
    revertedRef.current = revertedCharacter

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const charactersCache: { [key: number]: V2CharacterCacheInfo } = useSelector((state: any) => state.charactersCache.characterCache[2])

    function captureLoaded(data: CharacterVersion2 | null) {
        setCharacter(data)
        setRevertedCharacter(data)
        revertedRef.current = data
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

    function persistViewField(pageID: number, attribute: ViewPersistAttribute, value: number) {
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

    const [pageType1Updates, setPageType1Updates] = useState(() => getV2Updates(character, setCharacter, dispatch, persistViewField))

    useEffect(() => {
        setPageType1Updates(getV2Updates(character, setCharacter, dispatch, persistViewField))
    }, [character, isEditing, revertedCharacter])

    const updateFunctions: V2UpdateFunctions = {
        saveCharacterToBackend,
        revertCharacter,
        pageType1Updates
    }

    return {
        character,
        isDirty: !!(character && revertedCharacter && character !== revertedCharacter),
        isViewSaving: inFlight > 0,
        restoreCatalogFromSnapshot,
        updateFunctions
    }
}
