import '../View.css'
import './V2View.css'
import { Fragment, useEffect, useState } from "react"
import { useBlocker } from "react-router-dom"
import { SetLoadingFunction } from "../../components/loading/Loading"
import characterHook from './hooks/characterHook'
import PageType1 from './pageTypes/pageType1/PageType1'
import PageType2 from './pageTypes/pageType2/PageType2'
import EditingContext from './contexts/EditingContext'
import Sidebar from './components/sidebar/Sidebar'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function V2View({ setLoading, pathname }: Props) {
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [viewQuickEdit, setViewQuickEdit] = useState(false)

    const { character, isDirty, isViewSaving, restoreCatalogFromSnapshot, updateFunctions } = characterHook(pathname, isEditing)
    const { saveCharacterToBackend, revertCharacter, pageType1Updates, pageType2Updates, pageGutterUpdates } = updateFunctions
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

    const toggleViewQuickEdit = () => {
        setViewQuickEdit(!viewQuickEdit)
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

    const scrollSheetIntoView = (pageID: number) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.getElementById('sheet-' + pageID)?.scrollIntoView({ block: 'nearest' })
            })
        })
    }

    return (
        <div className="home-shell v2">
            <EditingContext value={isEditing}>
                <div className="version-two-shell">
                    <div className={`page-shell ${isEditing ? 'view-edit' : viewQuickEdit ? 'view-quick-edit' : ''}`}>
                        {character && character.pages.map((page, index) => {
                            let card = <></>
                            switch (page.type) {
                                case 1:
                                    card = <PageType1 pageInfo={page} index={index} updates={pageType1Updates} />
                                    break
                                case 2:
                                    card = <PageType2 pageInfo={page} updates={pageType2Updates} />
                                    break
                                default:
                                    return <Fragment key={`${page.type}-${index}`}></Fragment>
                            }
                            return (
                                <Fragment key={page.pageID}>
                                    <div id={'sheet-' + page.pageID}>
                                        {card}
                                    </div>
                                    {isEditing &&
                                        <div className="page-gutter">
                                            {index < character.pages.length - 1 &&
                                                <button
                                                    type="button"
                                                    className="bottom-buttons"
                                                    data-tooltip-id="my-tooltip"
                                                    data-tooltip-content="Swap the above sheet with the sheet below"
                                                    onClick={() => {
                                                        pageGutterUpdates.swapPageWithNext(index)
                                                        scrollSheetIntoView(page.pageID)
                                                    }}
                                                ><i className="fa-solid fa-arrow-up-arrow-down"></i></button>
                                            }
                                            {index > 0 &&
                                                <button
                                                    type="button"
                                                    className="bottom-buttons"
                                                    data-tooltip-id="my-tooltip"
                                                    data-tooltip-content="Move the above sheet to the top"
                                                    onClick={() => {
                                                        pageGutterUpdates.movePageToTop(index)
                                                        scrollSheetIntoView(page.pageID)
                                                    }}
                                                ><i className="fa-solid fa-up-to-line"></i></button>
                                            }
                                            {index < character.pages.length - 1 &&
                                                <button
                                                    type="button"
                                                    className="bottom-buttons"
                                                    data-tooltip-id="my-tooltip"
                                                    data-tooltip-content="Move above sheet to the bottom"
                                                    onClick={() => {
                                                        pageGutterUpdates.movePageToBottom(index)
                                                        scrollSheetIntoView(page.pageID)
                                                    }}
                                                ><i className="fa-solid fa-down-to-line"></i></button>
                                            }
                                            <button
                                                type="button"
                                                className="bottom-buttons add-page"
                                                onClick={() => pageGutterUpdates.addPageAfter(index)}
                                            ><i className="fa-solid fa-plus"></i> Main Info</button>
                                            <button
                                                type="button"
                                                className="bottom-buttons add-page"
                                                onClick={() => pageGutterUpdates.addPageType2After(index)}
                                            ><i className="fa-solid fa-plus"></i> Skills & Abilities</button>
                                        </div>
                                    }
                                </Fragment>
                            )
                        })}
                    </div>
                    {character &&
                        <Sidebar
                            toggleIsEditing={toggleIsEditing}
                            toggleViewQuickEdit={toggleViewQuickEdit}
                            viewQuickEdit={viewQuickEdit}
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
