import './NotesPanes.css'
import { clampTextareaChange, holdTextareaScroll, isComposingInput, textareaCaps, trimTextarea } from '@vault/common/textareaLimits'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import BlankContext, { blankInk } from '../../../../contexts/BlankContext'
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
    const isBlank = useContext(BlankContext)
    const onChange = field === 'abilities' ? updates.updateAbilities : updates.updateBurdens
    const max = field === 'abilities' ? textareaCaps.abilities : textareaCaps.burdens

    return (
        <div className="page-type-two-notes">
            <h1>{heading}</h1>
            {isEditing
                ? <textarea className="character-value" placeholder=" " maxLength={max} readOnly={isBlank} value={blankInk(isBlank, value)} onScroll={event => holdTextareaScroll(event.currentTarget)} onChange={event => onChange(pageID, clampTextareaChange(event.target.value, max, isComposingInput(event)))} onCompositionEnd={event => onChange(pageID, trimTextarea(event.currentTarget.value, max))} />
                : <p className="character-value">{blankInk(isBlank, value)}</p>
            }
        </div>
    )
}
