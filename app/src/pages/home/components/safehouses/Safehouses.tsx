import './Safehouses.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SafehouseHomeInfo } from '@vault/common/interfaces/safehouse/safehouse'
import { getUserPatreon, isOwner } from '../../../../redux/slices/userSlice'
import { cacheSafehouse, SafehouseCacheMap } from '../../../../redux/slices/characterCacheSlice'
import { safehouseApiURL } from '../../../../frontend-config'
import { DeleteSafehouseFunction } from '../../../../hooks/UsersSafehousesHook'

interface Props {
    safehouses: SafehouseHomeInfo[] | null,
    onAdd: () => void,
    onDelete: DeleteSafehouseFunction
}

function displayName(name: string) {
    return name.trim() ? name : 'New Safehouse'
}

function SafehouseRow({ safehouse, onDelete }: { safehouse: SafehouseHomeInfo, onDelete: DeleteSafehouseFunction }) {
    const { id, name, otherPageType1Names } = safehouse
    const extras = otherPageType1Names ?? []
    const shown = displayName(name)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cache: SafehouseCacheMap = useSelector((state: { charactersCache: { characterCache: { safehouse: SafehouseCacheMap } } }) => state.charactersCache.characterCache.safehouse)
    const [timeOutID, setTimeOutID] = useState<ReturnType<typeof setTimeout> | null>(null)

    function preload(safehouseID: number) {
        if (timeOutID) {
            clearTimeout(timeOutID)
        }
        setTimeOutID(setTimeout(() => {
            if (!cache[safehouseID]) {
                dispatch(cacheSafehouse({
                    id: safehouseID,
                    safehouseInfo: axios.get(safehouseApiURL + '/' + safehouseID).then(({ data }) => data)
                }))
            }
        }, 100))
    }

    return (
        <div
            onMouseEnter={() => preload(id)}
            onMouseLeave={() => {
                if (timeOutID) {
                    clearTimeout(timeOutID)
                }
            }}
            onClick={() => navigate(`/s/${id}`)}
        >
            <div className="catalog-name">
                <strong>{shown}</strong>
            </div>
            {extras.length > 0 ? (
                <span
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={extras.map(extraName => extraName.trim() ? extraName : 'New Safehouse').join('\n')}
                >
                    <i className="fa-solid fa-house-heart"></i>
                </span>
            ) : (
                <span></span>
            )}
            {!confirmDelete && (
                <button className="transparent-warn" onClick={event => { event.stopPropagation(); setConfirmDelete(true) }} data-tooltip-id="my-tooltip" data-tooltip-content={`Delete ${shown}`}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            )}
            {!!confirmDelete && (
                <>
                    <button data-tooltip-id="my-tooltip" data-tooltip-content={`Yes, delete ${shown}`} onClick={event => { event.stopPropagation(); onDelete(id) }} className="warn">
                        <i className="fa-solid fa-trash-check"></i>
                    </button>
                    <button data-tooltip-id="my-tooltip" data-tooltip-content="Never mind" className="primary" onClick={event => { event.stopPropagation(); setConfirmDelete(false) }}>
                        <i className="fa-solid fa-rotate-left"></i>
                    </button>
                </>
            )}
        </div>
    )
}

function SafehouseFooter({ count, onAdd }: { count: number, onAdd: () => void }) {
    const usersPatreon = useSelector(getUserPatreon)
    const userIsOwner = useSelector(isOwner)
    const limit = (usersPatreon * 20) + 10
    const userIsAtLimit = !userIsOwner && count >= limit

    return (
        <div className="home-footer-shell">
            {!userIsAtLimit && (
                <button onClick={onAdd} className="secondary" data-tooltip-id="my-tooltip" data-tooltip-content="Add New Safehouse">
                    <i className="fa-solid fa-house-heart"></i>
                    <i className="fa-solid fa-plus"></i>
                </button>
            )}
            {userIsAtLimit && (
                <button className="disabled" data-tooltip-id="my-tooltip" data-tooltip-content="You're unable to add a new Safehouse. Upgrade Your Patreon For More.">
                    <i className="fa-solid fa-plus"></i>
                </button>
            )}
            <h2 data-tooltip-id="my-tooltip" data-tooltip-content="Safehouse Limit. Upgrade Your Patreon For More.">{count}/{userIsOwner ? '∞' : limit}</h2>
        </div>
    )
}

export default function Safehouses({ safehouses, onAdd, onDelete }: Props) {
    if (!safehouses) {
        return null
    }
    return (
        <div className="safehouses-block">
            <h2>Safehouses</h2>
            {safehouses.length > 0 ? (
                <div className="safehouse-rows">
                    {safehouses.map(safehouse => (
                        <SafehouseRow key={safehouse.id} safehouse={safehouse} onDelete={onDelete} />
                    ))}
                </div>
            ) : (
                <div className="no-characters-shell">
                    <h2>You Have No Safehouses</h2>
                </div>
            )}
            <SafehouseFooter count={safehouses.length} onAdd={onAdd} />
        </div>
    )
}
