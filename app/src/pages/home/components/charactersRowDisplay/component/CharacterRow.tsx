import '../CharacterRowsDisplay.css'
import { CharacterHomeInfo } from "@vault/common/interfaces/characterInterfaces"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

interface Props {
    character: CharacterHomeInfo
}

export default function CharacterRow({ character }: Props) {
    const { id, name, race, primarya, secondarya, level } = character

    const [confirmDelete, setConfirmDelete] = useState(false)

    const navigate = useNavigate()

    function goToCharacter(characterID: number) {
        navigate(`/view/${characterID}`)
    }

    function toggleCheckDelete(event: any) {
        event.stopPropagation()
        setConfirmDelete(!confirmDelete)
    }

    return (
        <div onClick={_ => goToCharacter(id)}>
            <strong>{name ?? '?'}</strong>
            <p>{race ?? '?'}</p>
            <p>{primarya ?? '?'} / {secondarya ?? '?'}</p>
            <p>lvl {level ?? '?'}</p>
            {!confirmDelete && <button className='transparent-warn' onClick={toggleCheckDelete} data-tooltip-id="my-tooltip" data-tooltip-content={`Delete ${name ?? '?'}`}><i className="fa-solid fa-trash"></i></button>}
            {!!confirmDelete && (
                <>
                    <button data-tooltip-id="my-tooltip" data-tooltip-content='Never mind' className='secondary' onClick={toggleCheckDelete}><i className="fa-solid fa-rotate-left"></i></button>
                    <button data-tooltip-id="my-tooltip" data-tooltip-content={`Yes, delete ${name ?? '?'}`} className='warn'><i className="fa-solid fa-trash-check"></i></button>
                </>
            )}
        </div>
    )
}