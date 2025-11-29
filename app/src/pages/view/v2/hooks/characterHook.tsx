import { CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { viewV2URL } from "../../../../frontend-config"
import { V2CharacterCacheInfo, cacheCharacterV2 } from "../../../../redux/slices/characterCacheSlice"

export default function characterHook(pathname: string) {
    const [character, setCharacter] = useState<CharacterVersion2 | null>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const charactersCache: { [key: number]: V2CharacterCacheInfo } = useSelector((state: any) => state.charactersCache.characterCache[2])

    useEffect(() => {
        const [_, baseURL, characterID] = pathname.split('/')

        if (charactersCache[+characterID]) {
            charactersCache[+characterID].characterInfo.then(data => {
                setCharacter(data)
            })
        } else {
            dispatch(cacheCharacterV2({
                id: +characterID,
                version: 2,
                characterInfo: axios.get(viewV2URL + characterID).then(({ data }) => {
                    if (data.message) {
                        navigate('/')
                    } else {
                        setCharacter(data)
                        return data
                    }
                })
            }))
        }
    }, [pathname])

    return {
        character
    }
}