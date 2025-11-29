import '../View.css'
import { useEffect, useState } from "react"
import { SetLoadingFunction } from "../../../components/loading/Loading"
import characterHook from './hooks/characterHook'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function V2View({ setLoading, pathname }: Props) {
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const { character } = characterHook(pathname)

    useEffect(() => {
        if (character && isInitialLoad) {
            const { name } = character
            document.title = `${name ? name : 'Blank'} - Bonfire Character Vault`
            window.scrollTo(0, 0)
            setIsInitialLoad(false)
        }

        if (setLoading) {
            setLoading(!!character)
        }
    }, [character])

    return (
        <div className="home-shell">
            {character &&
                <p>{character.name}</p>
            }
        </div>
    )
}