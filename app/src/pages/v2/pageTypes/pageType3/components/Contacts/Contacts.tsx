import './Contacts.css'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType3Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    contacts: string
    pageID: number
    updates: PageType3Updates
}

export default function Contacts({ contacts, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)

    return (
        <div className="page3-contacts">
            <h1>Contacts, Allies, Mentors, & Enemies</h1>
            {isEditing
                ? <textarea
                    className="character-value"
                    placeholder=" "
                    value={contacts ?? ''}
                    onChange={event => updates.updateContacts(pageID, event.target.value)}
                />
                : <p className="character-value">{contacts}</p>
            }
        </div>
    )
}
