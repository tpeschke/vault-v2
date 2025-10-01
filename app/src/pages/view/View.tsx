import './View.css'
import { useEffect, useState } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import ViewVersionOne from "./v1/ViewVersionOne"
import CharacterHook from './v1/hooks/characterHook'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function View({ setLoading, pathname }: Props) {
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const { character, downloadCharacter, isDownloading, updateFunctions } = CharacterHook(pathname)

    useEffect(() => {
        if (character && isInitialLoad) {
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
                <ViewVersionOne
                    character={character}
                    downloadCharacter={downloadCharacter}
                    isDownloading={isDownloading}
                    updateFunctions={updateFunctions}
                />}
        </div>
    )
}