import axios from "axios"
import { useState, useEffect } from "react"
import { homeURL } from "../frontend-config"
import { CharacterHomeInfo } from '@vault/common/interfaces/characterInterfaces'
import { useDispatch, useSelector } from "react-redux"
import { cacheCharacters } from "../redux/slices/usersCharactersSlice"

interface UsersCharactersReturn {
    usersCharacters: CharacterHomeInfo[] | null,
}

export default function UsersCharactersHook(pathname?: string): UsersCharactersReturn {
    const [usersCharacters, setUsersCharacters] = useState<CharacterHomeInfo[] | null>(null)

    const dispatch = useDispatch()

    const charactersCache: CharacterHomeInfo[] = useSelector((state: any) => state.usersCharacters.usersCharactersCache)

    useEffect(() => {
        if (pathname === '/') {
            if (charactersCache) {
                setUsersCharacters(charactersCache)
            } else {
                axios.get(homeURL + '/allOfUsersCharacter').then(({ data }) => {
                    setUsersCharacters(data)
                    dispatch(cacheCharacters(data))
                })
            }
        }
    }, [pathname])

    return {
        usersCharacters
    }
}