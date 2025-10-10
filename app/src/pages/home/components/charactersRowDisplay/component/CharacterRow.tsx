import '../CharacterRowsDisplay.css'
import { CharacterHomeInfo } from "@vault/common/interfaces/characterInterfaces"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { DeleteCharacterFunction } from '../../../../../hooks/UsersCharactersHook'

interface Props {
    character: CharacterHomeInfo,
    deleteCharacter: DeleteCharacterFunction
}

export default function CharacterRow({ character, deleteCharacter }: Props) {
    const { id, name, ancestry, class: primaryClass, subclass, level } = character

    const [confirmDelete, setConfirmDelete] = useState(false)

    const navigate = useNavigate()

    function goToCharacter(characterID: number) {
        navigate(`/view/${characterID}`)
    }

    function toggleCheckDelete(event: any) {
        event.stopPropagation()
        setConfirmDelete(!confirmDelete)
    }

    function removeCharacter(event: any, characterID: number) {
        event.stopPropagation()
        deleteCharacter(characterID)
    }

    return (
        <div onClick={_ => goToCharacter(id)}>
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