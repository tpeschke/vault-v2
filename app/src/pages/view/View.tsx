import './View.css'
import { useEffect, useState } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import ViewVersionOne from "./v1/ViewVersionOne"
import CharacterHook from './v1/hooks/characterHook'
import EditingContext from './v1/contexts/EditingContext'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function View({ setLoading, pathname }: Props) {
    const [isEditing, setIsEditing] = useState(false)

    const { character, downloadCharacter, isDownloading, isQuickSaving, updateFunctions } = CharacterHook(pathname, isEditing)
    const { saveCharacterToBackend, revertCharacter } = updateFunctions

    const [isInitialLoad, setIsInitialLoad] = useState(true)


    useEffect(() => {
        if (character && isInitialLoad) {
            window.scrollTo(0, 0)
            setIsInitialLoad(false)
        }

        if (setLoading) {
            setLoading(!!character)
        }
    }, [character])

    const toggleIsEditing = () => {
        setIsEditing(!isEditing)
    }

    const saveCharacter = () => {
        saveCharacterToBackend()
        setIsEditing(false)
    }

    const revertCharacterToUnedited = () => {
        revertCharacter()
        setIsEditing(false)
    }

    return (
        <div className="home-shell">
            <EditingContext value={isEditing}>
                {character &&
                    <ViewVersionOne
                        character={character}
                        downloadCharacter={downloadCharacter}
                        isDownloading={isDownloading}
                        updateFunctions={updateFunctions}
                        toggleIsEditing={toggleIsEditing}
                        saveCharacter={saveCharacter}
                        revertCharacterToUnedited={revertCharacterToUnedited}
                        isQuickSaving={isQuickSaving}
                    />}
            </EditingContext>
        </div>
    )
}