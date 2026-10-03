import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import { Page1 } from "@vault/common/interfaces/v2/pageTypes"
import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { editV2URL, viewV2URL } from "../../../frontend-config"
import { V2CharacterCacheInfo, cacheCharacterV2 } from "../../../redux/slices/characterCacheSlice"
import { updateCatalogInfo } from "../../../redux/slices/usersCharactersSlice"
import { V2UpdateFunctions } from "./interfaces/UpdateInterfaces"
import getV2Updates from "./updates/getV2Updates"

function firstPage1(character: CharacterVersion2): Page1 | undefined {
    return character.pages.find((page): page is Page1 => page.type === 1)
}

function sheetName(character: CharacterVersion2): string {
    return (firstPage1(character)?.generalInfo.name ?? character.name ?? '').trim()
}

export default function characterHook(pathname: string) {
    const [character, setCharacter] = useState<CharacterVersion2 | null>(null)
    const [revertedCharacter, setRevertedCharacter] = useState<CharacterVersion2 | null>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const charactersCache: { [key: number]: V2CharacterCacheInfo } = useSelector((state: any) => state.charactersCache.characterCache[2])

    function captureLoaded(data: CharacterVersion2 | null) {
        setCharacter(data)
        setRevertedCharacter(data)
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

    const [pageType1Updates, setPageType1Updates] = useState(() => getV2Updates(character, setCharacter, dispatch))

    useEffect(() => {
        setPageType1Updates(getV2Updates(character, setCharacter, dispatch))
    }, [character])

    const updateFunctions: V2UpdateFunctions = {
        saveCharacterToBackend,
        revertCharacter,
        pageType1Updates
    }

    return {
        character,
        isDirty: !!(character && revertedCharacter && character !== revertedCharacter),
        restoreCatalogFromSnapshot,
        updateFunctions
    }
}
