import './Contacts.css'
import { PageType3Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    contacts: string
    pageID: number
    updates: PageType3Updates
}

export default function Contacts({ contacts, pageID, updates }: Props) {
    return (
        <div className="page3-contacts">
            <h1>Contacts, Allies, Mentors, & Enemies</h1>
            <textarea
                className="character-value"
                placeholder=" "
                value={contacts ?? ''}
                onChange={event => updates.updateContacts(pageID, event.target.value)}
                onBlur={event => updates.persistPage3Contacts(pageID, event.target.value)}
            />
        </div>
    )
}
