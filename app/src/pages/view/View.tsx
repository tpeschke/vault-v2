import './View.css'
import { useEffect, useState } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import ViewVersionOne from "./v1/ViewVersionOne"
import CharacterHook from './v1/hooks/characterHook'
import EditingContext from './v1/contexts/EditingContext'
import IsBlankContext from './v1/contexts/IsBlankContext'
import LoadingIndicator from '../../components/loading/components/LoadingIndicator'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function View({ setLoading, pathname }: Props) {
    const [isEditing, setIsEditing] = useState(false)

    const { character, isQuickSaving, updateFunctions, downloadCharacter, isDownloading } = CharacterHook(pathname, isEditing)

    const { saveCharacterToBackend, revertCharacter } = updateFunctions

    const [isInitialLoad, setIsInitialLoad] = useState(true)

    useEffect(() => {
        if (character && isInitialLoad) {
            const { name } = character.pageOneInfo.generalInfo
            document.title = `${name ? name : 'Blank'} - Bonfire Character Vault`
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
            <IsBlankContext value={!!character?.isBlank}>
                <EditingContext value={isEditing}>
                    {isDownloading && (
                        <div className='download-banner'>
                            <h1>Downloading</h1>
                            <LoadingIndicator stylings={''} secondary={true} />
                        </div>
                    )}
                    {character && character.version === 1 &&
                        <ViewVersionOne
                            character={character}
                            downloadCharacter={downloadCharacter}
                            isDownloading={isDownloading}
                            updateFunctions={updateFunctions}
                            toggleIsEditing={toggleIsEditing}
                            saveCharacter={saveCharacter}
                            revertCharacterToUnedited={revertCharacterToUnedited}
                            isQuickSaving={isQuickSaving}
                        />
                    }
                </EditingContext>
            </IsBlankContext>
        </div>
    )
}