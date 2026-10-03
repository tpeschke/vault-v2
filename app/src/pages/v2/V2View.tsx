import '../View.css'
import { useEffect, useState } from "react"
import { useBlocker } from "react-router-dom"
import { SetLoadingFunction } from "../../components/loading/Loading"
import characterHook from './hooks/characterHook'
import PageType1 from './pageTypes/pageType1/PageType1'
import EditingContext from './contexts/EditingContext'
import Sidebar from './components/sidebar/Sidebar'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function V2View({ setLoading, pathname }: Props) {
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    const { character, isDirty, isViewSaving, restoreCatalogFromSnapshot, updateFunctions } = characterHook(pathname, isEditing)
    const { saveCharacterToBackend, revertCharacter, pageType1Updates } = updateFunctions
    const warnOnLeave = isDirty && isEditing

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

    useEffect(() => {
        if (!warnOnLeave) {
            return
        }
        const onBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault()
            event.returnValue = ''
        }
        window.addEventListener('beforeunload', onBeforeUnload)
        return () => window.removeEventListener('beforeunload', onBeforeUnload)
    }, [warnOnLeave])

    const blocker = useBlocker(warnOnLeave)

    useEffect(() => {
        if (blocker.state !== 'blocked') {
            return
        }
        if (window.confirm('Leave without saving? Changes you made may not be saved.')) {
            restoreCatalogFromSnapshot()
            blocker.proceed()
        } else {
            blocker.reset()
        }
    }, [blocker, restoreCatalogFromSnapshot])

    const toggleIsEditing = () => {
        setIsEditing(!isEditing)
    }

    const saveCharacter = async () => {
        const saved = await saveCharacterToBackend()
        if (saved) {
            setIsEditing(false)
        }
    }

    const revertCharacterToUnedited = () => {
        revertCharacter()
        setIsEditing(false)
    }

    return (
        <div className="home-shell v2">
            <EditingContext value={isEditing}>
                <div className="version-two-shell">
                    <div className={`page-shell ${isEditing ? 'view-edit' : ''}`}>
                        {character && character.pages.map((page, index) => {
                            switch (page.type) {
                                case 1:
                                    return <PageType1 key={page.pageID} pageInfo={page} index={index} updates={pageType1Updates} />
                                default:
                                    return <></>
                            }
                        })}
                    </div>
                    {character &&
                        <Sidebar
                            toggleIsEditing={toggleIsEditing}
                            saveCharacter={saveCharacter}
                            revertCharacterToUnedited={revertCharacterToUnedited}
                            ownsThisCharacter={character.userInfo.ownsThisCharacter}
                            isViewSaving={isViewSaving}
                        />
                    }
                </div>
            </EditingContext>
        </div>
    )
}
