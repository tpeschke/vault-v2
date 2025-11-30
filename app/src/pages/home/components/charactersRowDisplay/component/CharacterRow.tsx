import '../CharacterRowsDisplay.css'
import { CharacterHomeInfo, CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { DeleteCharacterFunction } from '../../../../../hooks/UsersCharactersHook'
import axios from 'axios'
import { viewURL, viewV2URL } from '../../../../../frontend-config'
import { useDispatch, useSelector } from 'react-redux'
import { cacheCharacterV1, cacheCharacterV2 } from '../../../../../redux/slices/characterCacheSlice'

interface Props {
    character: CharacterHomeInfo,
    deleteCharacter: DeleteCharacterFunction,
    viewRoute: 'v' | 'view'
}

export default function CharacterRow({ character, deleteCharacter, viewRoute }: Props) {
    const { id, name, ancestry, class: primaryClass, subclass, level } = character

    const [confirmDelete, setConfirmDelete] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function goToCharacter(characterID: number) {
        navigate(`/${viewRoute}/${characterID}`)
    }

    function toggleCheckDelete(event: any) {
        event.stopPropagation()
        setConfirmDelete(!confirmDelete)
    }

    function removeCharacter(event: any, characterID: number) {
        event.stopPropagation()
        deleteCharacter(characterID)
    }

    const charactersCache: { [key: number]: CharacterVersion1 } = useSelector((state: any) => state.charactersCache.characterCache)
    const [timeOutID, setTimeOutID] = useState<any | null>(null)

    function preloadCharacterInfo(characterID: number) {
        clearTimeout(timeOutID)
        setTimeOutID(setTimeout(() => {
            if (!charactersCache[characterID]) {
                if (viewRoute === 'view') {
                    dispatch(cacheCharacterV1({
                        id: characterID,
                        version: 1,
                        characterInfo: axios.get(viewURL + characterID).then(({ data }) => data)
                    }))
                } else if (viewRoute === 'v') {
                    dispatch(cacheCharacterV2({
                        id: characterID,
                        version: 2,
                        characterInfo: axios.get(viewV2URL + characterID).then(({ data }) => data)
                    }))
                }
            }
        }, 100))
    }

    return (
        <div onMouseEnter={_ => preloadCharacterInfo(id)} onMouseLeave={_ => clearTimeout(timeOutID)} onClick={_ => goToCharacter(id)}>
            <strong>{name ?? '?'}</strong>
            <p>{ancestry ?? '?'}</p>
            <p>{primaryClass ?? '?'} / {subclass ?? '?'}</p>
            <p>lvl {level ?? '?'}</p>
            {!confirmDelete && <button className='transparent-warn' onClick={toggleCheckDelete} data-tooltip-id="my-tooltip" data-tooltip-content={`Delete ${name ?? '?'}`}><i className="fa-solid fa-trash"></i></button>}
            {!!confirmDelete && (
                <>
                    <button data-tooltip-id="my-tooltip" data-tooltip-content={`Yes, delete ${name ?? '?'}`} onClick={event => removeCharacter(event, id)} className='warn'><i className="fa-solid fa-trash-check"></i></button>
                    <button data-tooltip-id="my-tooltip" data-tooltip-content='Never mind' className='primary' onClick={toggleCheckDelete}><i className="fa-solid fa-rotate-left"></i></button>
                </>
            )}
        </div>
    )
}