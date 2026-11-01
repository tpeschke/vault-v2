import '../View.css'
import '../v2/V2View.css'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useBlocker } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SAFEHOUSE_SHEET_CAP_MESSAGE, SAFEHOUSE_SHEET_MAX } from '@vault/common/interfaces/safehouse/safehouse'
import { SetLoadingFunction } from '../../components/loading/Loading'
import LoadingIndicator from '../../components/loading/components/LoadingIndicator'
import Sidebar from '../v2/components/sidebar/Sidebar'
import BlankContext from '../v2/contexts/BlankContext'
import EditingContext from '../v2/contexts/EditingContext'
import PageTypeSafehouse from './PageTypeSafehouse'
import { downloadSafehouse, safehousePdfFileName } from './downloadSafehouse'
import safehouseHook from './safehouseHook'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string,
    blank?: boolean
}

export default function SafehouseView({ setLoading, pathname, blank = false }: Props) {
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [viewQuickEdit, setViewQuickEdit] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [disclosedPageIDs, setDisclosedPageIDs] = useState<number[]>([])
    const [armedDeletePageIDs, setArmedDeletePageIDs] = useState<number[]>([])
    const downloadStarted = useRef(false)

    const { safehouse, isDirty, isViewSaving, save, revert, restoreCatalogFromSnapshot, updates } = safehouseHook(pathname, isEditing, blank)
    const warnOnLeave = isDirty && isEditing

    useEffect(() => {
        if (safehouse && isInitialLoad) {
            document.title = `${blank ? 'Blank' : (safehouse.name || 'Blank')} - Bonfire Character Vault`
            window.scrollTo(0, 0)
            setIsInitialLoad(false)
        }
        if (setLoading) {
            setLoading(!!safehouse)
        }
    }, [safehouse, blank])

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

    useEffect(() => {
        if (!isEditing) {
            setDisclosedPageIDs(ids => ids.length === 0 ? ids : [])
            setArmedDeletePageIDs(ids => ids.length === 0 ? ids : [])
        }
    }, [isEditing])

    const toggleViewQuickEdit = () => {
        if (blank) {
            return
        }
        setViewQuickEdit(!viewQuickEdit)
    }

    const saveSafehouse = async () => {
        const saved = await save()
        if (saved) {
            setIsEditing(false)
        }
    }

    const revertSafehouse = () => {
        revert()
        setIsEditing(false)
    }

    const disclosePage = (pageID: number) => {
        setDisclosedPageIDs(ids => ids.includes(pageID) ? ids : [...ids, pageID])
    }

    const restPage = (pageID: number) => {
        setDisclosedPageIDs(ids => ids.filter(id => id !== pageID))
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
        if (!isDownloading || !safehouse || downloadStarted.current) {
            return
        }
        downloadStarted.current = true
        downloadSafehouse(safehousePdfFileName(blank ? 'Blank' : safehouse.name))
            .catch(() => {
                toast.error('The safehouse could not be downloaded.')
            })
            .finally(() => {
                downloadStarted.current = false
                setIsDownloading(false)
            })
    }, [isDownloading, safehouse, blank])

    const scrollSheetIntoView = (pageID: number) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.getElementById('sheet-' + pageID)?.scrollIntoView({ block: 'nearest' })
            })
        })
    }

    const firstType1Index = safehouse?.pages.findIndex(page => page.type === 1) ?? -1

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
                    <div className="safehouse-shell">
                        <div className={`page-shell${blank ? ' blank' : ''} ${isEditing ? 'view-edit' : viewQuickEdit ? 'view-quick-edit' : ''}`}>
                            {safehouse && safehouse.pages.map((page, index) => (
                                <Fragment key={page.type === 1 ? (page.key ?? page.pageID) : page.pageID}>
                                    <div id={'sheet-' + page.pageID}>
                                        {page.type === 1 ? (
                                            <PageTypeSafehouse page={page} updates={updates} />
                                        ) : (
                                            <div className="page card page-type-safehouse"></div>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <div className="page-gutter">
                                            {armedDeletePageIDs.includes(page.pageID) && page.type === 1 && index !== firstType1Index ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="bottom-buttons delete-page confirm"
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-content="This deletes the page above this button. This delete isn't permanent until you save the sheet"
                                                        onClick={() => updates.removePageAt(index)}
                                                    ><i className="fa-solid fa-trash-check"></i></button>
                                                    <button
                                                        type="button"
                                                        className="bottom-buttons delete-page-cancel"
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-content="Never mind"
                                                        onClick={() => disarmDelete(page.pageID)}
                                                    ><i className="fa-solid fa-rotate-left"></i></button>
                                                </>
                                            ) : disclosedPageIDs.includes(page.pageID) ? (
                                                <>
                                                    {safehouse.pages.length < SAFEHOUSE_SHEET_MAX && (
                                                        <h4
                                                            className="page-count"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content={SAFEHOUSE_SHEET_CAP_MESSAGE}
                                                        >{safehouse.pages.length} / {SAFEHOUSE_SHEET_MAX}</h4>
                                                    )}
                                                    <button
                                                        type="button"
                                                        className="bottom-buttons add-page"
                                                        onClick={() => {
                                                            if (safehouse.pages.length >= SAFEHOUSE_SHEET_MAX) {
                                                                toast.error(SAFEHOUSE_SHEET_CAP_MESSAGE)
                                                                restPage(page.pageID)
                                                                return
                                                            }
                                                            updates.addPageAfter(index)
                                                            restPage(page.pageID)
                                                        }}
                                                    ><i className="fa-solid fa-plus"></i> Safehouse</button>
                                                    <button
                                                        type="button"
                                                        className="primary"
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-content="Never mind"
                                                        onClick={() => restPage(page.pageID)}
                                                    ><i className="fa-solid fa-rotate-left"></i></button>
                                                </>
                                            ) : (
                                                <>
                                                    {index < safehouse.pages.length - 1 && (
                                                        <button
                                                            type="button"
                                                            className="bottom-buttons"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="Swap with the sheet below"
                                                            onClick={() => {
                                                                updates.swapWithNext(index)
                                                                scrollSheetIntoView(page.pageID)
                                                            }}
                                                        ><i className="fa-solid fa-arrow-up-arrow-down"></i></button>
                                                    )}
                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            className="bottom-buttons"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="Move this sheet to the top"
                                                            onClick={() => {
                                                                updates.moveToTop(index)
                                                                scrollSheetIntoView(page.pageID)
                                                            }}
                                                        ><i className="fa-solid fa-up-to-line"></i></button>
                                                    )}
                                                    {index < safehouse.pages.length - 1 && (
                                                        <button
                                                            type="button"
                                                            className="bottom-buttons"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="Move this sheet to the bottom"
                                                            onClick={() => {
                                                                updates.moveToBottom(index)
                                                                scrollSheetIntoView(page.pageID)
                                                            }}
                                                        ><i className="fa-solid fa-down-to-line"></i></button>
                                                    )}
                                                    {safehouse.pages.length >= SAFEHOUSE_SHEET_MAX ? (
                                                        <span
                                                            className="add-page"
                                                            tabIndex={0}
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content={SAFEHOUSE_SHEET_CAP_MESSAGE}
                                                        >
                                                            <button type="button" className="bottom-buttons" disabled style={{ pointerEvents: 'none' }}>
                                                                <i className="fa-solid fa-file-circle-plus"></i>
                                                            </button>
                                                        </span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            className="bottom-buttons add-page"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="Click to Add New Pages"
                                                            onClick={() => disclosePage(page.pageID)}
                                                        ><i className="fa-solid fa-file-circle-plus"></i></button>
                                                    )}
                                                    {page.type === 1 && index === firstType1Index ? (
                                                        <button
                                                            type="button"
                                                            className="bottom-buttons delete-page disabled"
                                                            aria-disabled="true"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="You can never remove this page."
                                                            onClick={() => { return }}
                                                        ><i className="fa-solid fa-trash"></i></button>
                                                    ) : page.type === 1 ? (
                                                        <button
                                                            type="button"
                                                            className="bottom-buttons delete-page"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="This deletes the page above this button"
                                                            onClick={() => armDelete(page.pageID)}
                                                        ><i className="fa-solid fa-trash"></i></button>
                                                    ) : null}
                                                </>
                                            )}
                                        </div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                        {safehouse && (
                            <Sidebar
                                toggleIsEditing={() => {
                                    if (blank) {
                                        return
                                    }
                                    setIsEditing(!isEditing)
                                }}
                                toggleViewQuickEdit={toggleViewQuickEdit}
                                viewQuickEdit={viewQuickEdit}
                                saveCharacter={saveSafehouse}
                                revertCharacterToUnedited={revertSafehouse}
                                ownsThisCharacter={safehouse.ownsThisSafehouse}
                                isViewSaving={isViewSaving}
                                onDownload={onDownload}
                                isDownloading={isDownloading}
                            />
                        )}
                    </div>
                </EditingContext>
            </BlankContext>
        </div>
    )
}
