import axios from "axios"
import { useState, useEffect } from "react"
import { addV2URL, homeURL, removeV2URL } from "../frontend-config"
import { useDispatch, useSelector } from "react-redux"
import { cacheCharacters, UsersCharacterCache } from "../redux/slices/usersCharactersSlice"
import { useNavigate } from "react-router-dom"
import { CharacterHomeInfo } from '@vault/common/interfaces/characterInterfaces'

export type DeleteCharacterFunction = (characterID: number) => void

interface UsersCharactersReturn {
    usersCharacters: UsersCharacterCache,
    deleteCharacter: {
        deleteV1Character: DeleteCharacterFunction,
        deleteV2Character: DeleteCharacterFunction
    },
    addCharacter: () => void
}

export default function UsersCharactersHook(pathname?: string): UsersCharactersReturn {
    const [usersCharacters, setUsersCharacters] = useState<UsersCharacterCache>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const charactersCache: UsersCharacterCache = useSelector((state: any) => state.usersCharacters.usersCharactersCache)

    useEffect(() => {
        if (pathname === '/') {
            if (charactersCache) {
                setUsersCharacters(charactersCache)
            } else {
                axios.get(homeURL + '/allOfUsersCharacter').then(({ data }) => {
                    setCharacterData(data)
                })
            }
        }
    }, [pathname])

    function setCharacterData(data: any) {
        setUsersCharacters(data)
        dispatch(cacheCharacters(data))
    }

    function deleteV1Character(characterID: number) {
        if (usersCharacters && usersCharacters[0]) {
            const newUsersCharacters: UsersCharacterCache = [
                usersCharacters[0].filter((({ id }) => id !== characterID)),
                usersCharacters[1]
            ]

            axios.delete(homeURL + '/' + characterID)

            if (newUsersCharacters) {
                setCharacterData(newUsersCharacters)
            }
        }
    }

    function deleteV2Character(characterID: number) {
        if (usersCharacters && usersCharacters[1]) {
            const newUsersCharacters: UsersCharacterCache = [
                usersCharacters[0],
                usersCharacters[1].filter((({ id }) => id !== characterID))
            ]

            axios.delete(removeV2URL + characterID)

            if (newUsersCharacters) {
                setCharacterData(newUsersCharacters)
            }
        }
    }

    async function addCharacter() {
        setCharacterData(null)

        window.scrollTo(0, 0);

        const { data } = await axios.post(addV2URL)

        if (data.newCharacterID) {
            navigate(`/v/${data.newCharacterID}`)
        } else {
            setUsersCharacters(charactersCache)
        }
    }

    return {
        usersCharacters,
        deleteCharacter: {
            deleteV1Character,
            deleteV2Character
        },
        addCharacter
    }
}