import './NotesPanes.css'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType2Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    heading: string
    value: string
    pageID: number
    updates: PageType2Updates
    field: 'abilities' | 'burdens'
}

export default function NotesPanes({ heading, value, pageID, updates, field }: Props) {
    const isEditing = useContext(EditingContext)
    const onChange = field === 'abilities' ? updates.updateAbilities : updates.updateBurdens

    return (
        <div className="page-type-two-notes">
            <h1>{heading}</h1>
            {isEditing
                ? <textarea className="character-value" placeholder=" " value={value} onChange={event => onChange(pageID, event.target.value)} />
                : <p className="character-value">{value}</p>
            }
        </div>
    )
}
