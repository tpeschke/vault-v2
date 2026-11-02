import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SafehouseHomeInfo } from '@vault/common/interfaces/safehouse/safehouse'
import { safehouseApiURL } from '../frontend-config'
import { isUserLoggedOn } from '../redux/slices/userSlice'
import { cacheSafehouses } from '../redux/slices/usersCharactersSlice'

export type DeleteSafehouseFunction = (safehouseID: number) => void

export default function UsersSafehousesHook(pathname?: string) {
    const [safehouses, setSafehouses] = useState<SafehouseHomeInfo[] | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedIn = useSelector(isUserLoggedOn)
    const cached: SafehouseHomeInfo[] | null = useSelector((state: { usersCharacters: { usersSafehousesCache: SafehouseHomeInfo[] | null } }) => state.usersCharacters.usersSafehousesCache)

    useEffect(() => {
        if (pathname !== '/' || !loggedIn) {
            return
        }
        if (cached) {
            setSafehouses(cached)
            return
        }
        axios.get(safehouseApiURL).then(({ data }) => {
            const list = Array.isArray(data) ? data : []
            setSafehouses(list)
            dispatch(cacheSafehouses(list))
        })
    }, [pathname, loggedIn])

    function deleteSafehouse(safehouseID: number) {
        const current = safehouses ?? cached ?? []
        const next = current.filter(safehouse => safehouse.id !== safehouseID)
        setSafehouses(next)
        dispatch(cacheSafehouses(next))
        axios.delete(safehouseApiURL + '/' + safehouseID)
    }

    async function addSafehouse() {
        setSafehouses(null)
        dispatch(cacheSafehouses(null))
        window.scrollTo(0, 0)
        const { data } = await axios.post(safehouseApiURL)
        if (typeof data === 'number' && data > 0) {
            navigate(`/s/${data}`)
            return
        }
        setSafehouses(cached)
        dispatch(cacheSafehouses(cached))
    }

    return {
        safehouses,
        deleteSafehouse,
        addSafehouse
    }
}
