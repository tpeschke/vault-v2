import './Contacts.css'
import { clampTextareaChange, holdTextareaScroll, isComposingInput, textareaCaps, trimTextarea } from '@vault/common/textareaLimits'
import { useContext } from 'react'
import BlankContext, { blankInk } from '../../../../contexts/BlankContext'
import { PageType3Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    contacts: string
    pageID: number
    updates: PageType3Updates
}

export default function Contacts({ contacts, pageID, updates }: Props) {
    const isBlank = useContext(BlankContext)
    return (
        <div className="page3-contacts">
            <h1>Contacts, Allies, Mentors, & Enemies</h1>
            <textarea
                className="character-value"
                placeholder=" "
                readOnly={isBlank}
                maxLength={textareaCaps.page3Contacts}
                value={blankInk(isBlank, contacts ?? '')}
                onScroll={event => holdTextareaScroll(event.currentTarget)}
                onChange={event => updates.updateContacts(pageID, clampTextareaChange(event.target.value, textareaCaps.page3Contacts, isComposingInput(event)))}
                onCompositionEnd={event => updates.updateContacts(pageID, trimTextarea(event.currentTarget.value, textareaCaps.page3Contacts))}
                onBlur={event => updates.persistPage3Contacts(pageID, trimTextarea(event.target.value, textareaCaps.page3Contacts))}
            />
        </div>
    )
}
