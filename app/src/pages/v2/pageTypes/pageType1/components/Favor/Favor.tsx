import './Favor.css'
import { Favor } from "@vault/common/interfaces/v2/page1/favor"
import { clampTextareaChange, holdTextareaScroll, isComposingInput, textareaCaps, trimTextarea } from '@vault/common/textareaLimits'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import BlankContext, { blankInk } from '../../../../contexts/BlankContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    favor: Favor
    pageID: number
    updates: PageType1Updates
}

export default function FavorDisplay({ favor, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const isBlank = useContext(BlankContext)
    const { anointed, current, max, divineRelationship } = favor

    return (
        <div className="favor-v2">
            <h1>Favor</h1>
            <div className="favor-body">
                <div className="favor-left">
                    <em className="favor-prompt">What is your relationship to the Divine?</em>
                    {isEditing ?
                        <textarea className="character-value" placeholder=" " maxLength={textareaCaps.divineRelationship} value={blankInk(isBlank, divineRelationship ?? '')} onScroll={event => holdTextareaScroll(event.currentTarget)} onChange={event => updates.updateFavor(pageID, { divineRelationship: clampTextareaChange(event.target.value, textareaCaps.divineRelationship, isComposingInput(event)) })} onCompositionEnd={event => updates.updateFavor(pageID, { divineRelationship: trimTextarea(event.currentTarget.value, textareaCaps.divineRelationship) })} />
                        :
                        <p className="character-value">{blankInk(isBlank, divineRelationship ?? '')}</p>
                    }
                </div>
                <div className="favor-track">
                    <input className="center-text character-value" type="number" placeholder=" " readOnly={isBlank} value={blankInk(isBlank, current)} onChange={event => updates.updateFavor(pageID, { current: +event.target.value })} onBlur={event => updates.persistViewField(pageID, 'currentFavor', +event.target.value)} />
                    <span>/</span>
                    {isEditing ?
                        <input className="center-text character-value" type="number" placeholder=" " value={blankInk(isBlank, max)} onChange={event => updates.updateFavor(pageID, { max: +event.target.value })} />
                        :
                        <p className="center-text character-value">{blankInk(isBlank, max)}</p>
                    }
                    <span className="anointed-row">
                        <em>Anointed?</em>
                        <span
                            className='anointed-box'
                            onClick={!isBlank && isEditing ? () => updates.updateFavor(pageID, { anointed: !anointed }) : undefined}

                        >
                            {anointed && <i className="fa-solid fa-check"></i>}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}
