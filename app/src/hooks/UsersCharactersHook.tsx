import axios from "axios"
import { useState, useEffect } from "react"
import { homeURL } from "../frontend-config"
import { useDispatch, useSelector } from "react-redux"
import { cacheCharacters, UsersCharacterCache } from "../redux/slices/usersCharactersSlice"
import { useNavigate } from "react-router-dom"

export type DeleteCharacterFunction = (characterID: number) => void

interface UsersCharactersReturn {
    usersCharacters: UsersCharacterCache,
    deleteCharacter: DeleteCharacterFunction,
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

    function deleteCharacter(characterID: number) {
        if (usersCharacters && usersCharacters[0]) {
            const newUsersCharacters = usersCharacters[0].filter((({ id }) => id !== characterID))
    
            axios.delete(homeURL + '/' + characterID)
    
            if (newUsersCharacters) {
                setCharacterData(newUsersCharacters)
            }
        }
    }

    async function addCharacter() {
        setCharacterData(null)

        window.scrollTo(0, 0);

        const {data} = await axios.post(homeURL + '/add')
        
        if (data.newCharacterID) {
            navigate(`/view/${data.newCharacterID}`)
        } else {
            setUsersCharacters(charactersCache)
        }
    }

    return {
        usersCharacters,
        deleteCharacter,
        addCharacter
    }
}