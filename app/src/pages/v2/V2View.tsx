import '../View.css'
import './V2View.css'
import { Fragment, useEffect, useRef, useState } from "react"
import { useBlocker } from "react-router-dom"
import { toast } from "react-toastify"
import { SetLoadingFunction } from "../../components/loading/Loading"
import LoadingIndicator from "../../components/loading/components/LoadingIndicator"
import characterHook from './hooks/characterHook'
import PageType1 from './pageTypes/pageType1/PageType1'
import PageType2 from './pageTypes/pageType2/PageType2'
import PageType3 from './pageTypes/pageType3/PageType3'
import PageType4 from './pageTypes/pageType4/PageType4'
import EditingContext from './contexts/EditingContext'
import BlankContext from './contexts/BlankContext'
import Sidebar from './components/sidebar/Sidebar'
import { downloadPages, pdfFileName } from './hooks/utilities/downloadCharacter'
import { SHEET_PAGE_CAP_MESSAGE, SHEET_PAGE_MAX } from '@vault/common/interfaces/v2/sheetPageCap'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string,
    blank?: boolean
}

export default function V2View({ setLoading, pathname, blank = false }: Props) {
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [viewQuickEdit, setViewQuickEdit] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const downloadStarted = useRef(false)

    const { character, isDirty, isViewSaving, notesEpoch, restoreCatalogFromSnapshot, updateFunctions } = characterHook(pathname, isEditing, blank)
    const { saveCharacterToBackend, revertCharacter, pageType1Updates, pageType2Updates, pageType3Updates, pageType4Updates, pageGutterUpdates } = updateFunctions
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
        if (blank) {
            return
        }
        setIsEditing(!isEditing)
    }

    const toggleViewQuickEdit = () => {
        if (blank) {
            return
        }
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

    const [disclosedPageIDs, setDisclosedPageIDs] = useState<number[]>([])
    const [armedDeletePageIDs, setArmedDeletePageIDs] = useState<number[]>([])

    useEffect(() => {
        if (!isEditing) {
            setDisclosedPageIDs(ids => ids.length === 0 ? ids : [])
            setArmedDeletePageIDs(ids => ids.length === 0 ? ids : [])
        }
    }, [isEditing])

    const disclosePage = (pageID: number) => {
        setDisclosedPageIDs(ids => ids.includes(pageID) ? ids : [...ids, pageID])
    }

    const restPage = (pageID: number) => {
        setDisclosedPageIDs(ids => ids.includes(pageID) ? ids.filter(id => id !== pageID) : ids)
    }

    const armDelete = (pageID: number) => {
        restPage(pageID)
        setArmedDeletePageIDs(ids => ids.includes(pageID) ? ids : [...ids, pageID])
    }

    const disarmDelete = (pageID: number) => {
        setArmedDeletePageIDs(ids => ids.filter(id => id !== pageID))
    }

    const onDownload = () => {
        setViewQuickEdit(false)
        setIsDownloading(true)
    }

    useEffect(() => {
        if (!isDownloading || !character || downloadStarted.current) return
        downloadStarted.current = true
        ;(async () => {
            try {
                await document.fonts.ready
                const pages = [...document.querySelectorAll<HTMLElement>('.version-two-shell .page')]
                if (pages.length === 0) return
                await downloadPages(pages, pdfFileName(character.name))
            } catch {
                toast.error('The character could not be downloaded.')
            } finally {
                downloadStarted.current = false
                setIsDownloading(false)
            }
        })()
    }, [isDownloading, character])

    const scrollSheetIntoView = (pageID: number) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.getElementById('sheet-' + pageID)?.scrollIntoView({ block: 'nearest' })
            })
        })
    }

    return (
        <div className="home-shell v2">
            {isDownloading && (
                <div className="download-banner">
                    <h1>Downloading</h1>
                    <LoadingIndicator stylings="" secondary={true} />
                </div>
            )}
            <BlankContext value={blank}>
            <EditingContext value={isEditing}>
                <div className="version-two-shell">
                    <div className={`page-shell${blank ? ' blank' : ''} ${isEditing ? 'view-edit' : viewQuickEdit ? 'view-quick-edit' : ''}`}>
                        {character && character.pages.map((page, index) => {
                            let card = <></>
                            const sheetKey = page.type === 4
                                ? (page.key ?? page.pageID)
                                : 'pageID' in page ? page.pageID : index
                            switch (page.type) {
                                case 1:
                                    card = <PageType1 pageInfo={page} index={index} updates={pageType1Updates} />
                                    break
                                case 2:
                                    card = <PageType2 pageInfo={page} updates={pageType2Updates} />
                                    break
                                case 3:
                                    card = <PageType3 pageInfo={page} updates={pageType3Updates} />
                                    break
                                case 4:
                                    card = <PageType4 key={`${page.key ?? page.pageID}:${notesEpoch}`} pageInfo={page} updates={pageType4Updates} notesEpoch={notesEpoch} ownsThisCharacter={character.userInfo.ownsThisCharacter} />
                                    break
                                default:
                                    return <Fragment key={`${page.type}-${index}`}></Fragment>
                            }
                            return (
                                <Fragment key={sheetKey}>
                                    <div id={'sheet-' + page.pageID}>
                                        {card}
                                    </div>
                                    {isEditing &&
                                        <div className="page-gutter">
                                            {armedDeletePageIDs.includes(page.pageID) && index !== character.pages.findIndex(candidate => candidate.type === 1) ? (
                                                <>
                                                    <button
                                                        key="delete-confirm"
                                                        type="button"
                                                        className="bottom-buttons delete-page confirm"
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-content="This deletes the page above this button. This delete isn't permanent until you save the sheet"
                                                        onClick={() => pageGutterUpdates.removePageAt(index)}
                                                    ><i className="fa-solid fa-trash-check"></i></button>
                                                    <button
                                                        key="delete-cancel"
                                                        type="button"
                                                        className="bottom-buttons delete-page-cancel"
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-content="Never mind"
                                                        onClick={() => disarmDelete(page.pageID)}
                                                    ><i className="fa-solid fa-rotate-left"></i></button>
                                                </>
                                            ) : disclosedPageIDs.includes(page.pageID) ? (
                                                <>
                                                    {character.pages.length < SHEET_PAGE_MAX &&
                                                        <h4
                                                            key="page-count"
                                                            className="page-count"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content={SHEET_PAGE_CAP_MESSAGE}
                                                        >{character.pages.length} / {SHEET_PAGE_MAX}</h4>
                                                    }
                                                    <button
                                                        key="add-main"
                                                        type="button"
                                                        className="bottom-buttons add-page"
                                                        onClick={() => {
                                                            if (character.pages.length >= SHEET_PAGE_MAX) {
                                                                toast.error(SHEET_PAGE_CAP_MESSAGE)
                                                                restPage(page.pageID)
                                                                return
                                                            }
                                                            pageGutterUpdates.addPageAfter(index)
                                                            restPage(page.pageID)
                                                        }}
                                                    ><i className="fa-solid fa-plus"></i> Main Info</button>
                                                    <button
                                                        key="add-skills"
                                                        type="button"
                                                        className="bottom-buttons add-page"
                                                        onClick={() => {
                                                            if (character.pages.length >= SHEET_PAGE_MAX) {
                                                                toast.error(SHEET_PAGE_CAP_MESSAGE)
                                                                restPage(page.pageID)
                                                                return
                                                            }
                                                            pageGutterUpdates.addPageType2After(index)
                                                            restPage(page.pageID)
                                                        }}
                                                    ><i className="fa-solid fa-plus"></i> Skills & Abilities</button>
                                                    <button
                                                        key="add-npcs"
                                                        type="button"
                                                        className="bottom-buttons add-page"
                                                        onClick={() => {
                                                            if (character.pages.length >= SHEET_PAGE_MAX) {
                                                                toast.error(SHEET_PAGE_CAP_MESSAGE)
                                                                restPage(page.pageID)
                                                                return
                                                            }
                                                            pageGutterUpdates.addPageType3After(index)
                                                            restPage(page.pageID)
                                                        }}
                                                    ><i className="fa-solid fa-plus"></i> NPCs & Equipment</button>
                                                    <button
                                                        key="add-notes"
                                                        type="button"
                                                        className="bottom-buttons add-page"
                                                        onClick={() => {
                                                            if (character.pages.length >= SHEET_PAGE_MAX) {
                                                                toast.error(SHEET_PAGE_CAP_MESSAGE)
                                                                restPage(page.pageID)
                                                                return
                                                            }
                                                            pageGutterUpdates.addPageType4After(index)
                                                            restPage(page.pageID)
                                                        }}
                                                    ><i className="fa-solid fa-plus"></i> Notes</button>
                                                    <button
                                                        key="rest"
                                                        type="button"
                                                        className="primary"
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-content="Never mind"
                                                        onClick={() => restPage(page.pageID)}
                                                    ><i className="fa-solid fa-rotate-left"></i></button>
                                                </>
                                            ) : (
                                                <>
                                                    {index < character.pages.length - 1 &&
                                                        <button
                                                            key="swap"
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
                                                            key="top"
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
                                                            key="bottom"
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
                                                    {character.pages.length >= SHEET_PAGE_MAX ? (
                                                        <span
                                                            key="disclose"
                                                            className="add-page"
                                                            tabIndex={0}
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content={SHEET_PAGE_CAP_MESSAGE}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="bottom-buttons"
                                                                disabled
                                                                style={{ pointerEvents: 'none' }}
                                                            ><i className="fa-solid fa-file-circle-plus"></i></button>
                                                        </span>
                                                    ) : (
                                                        <button
                                                            key="disclose"
                                                            type="button"
                                                            className="bottom-buttons add-page"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="Click to Add New Pages"
                                                            onClick={() => disclosePage(page.pageID)}
                                                        ><i className="fa-solid fa-file-circle-plus"></i></button>
                                                    )}
                                                    {index === character.pages.findIndex(candidate => candidate.type === 1) ? (
                                                        <button
                                                            key="delete"
                                                            type="button"
                                                            className="bottom-buttons delete-page disabled"
                                                            aria-disabled="true"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="You can never remove this page."
                                                            onClick={() => { return }}
                                                        ><i className="fa-solid fa-trash"></i></button>
                                                    ) : (
                                                        <button
                                                            key="delete"
                                                            type="button"
                                                            className="bottom-buttons delete-page"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="This deletes the page above this button"
                                                            onClick={() => armDelete(page.pageID)}
                                                        ><i className="fa-solid fa-trash"></i></button>
                                                    )}
                                                </>
                                            )}
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
                            onDownload={onDownload}
                            isDownloading={isDownloading}
                        />
                    }
                </div>
            </EditingContext>
            </BlankContext>
        </div>
    )
}
