import './Defenses.css'
import { Defense } from "@vault/common/interfaces/v2/page1/combatInfo"
import { clampTextareaChange, holdTextareaScroll, isComposingInput, textareaCaps, trimTextarea } from '@vault/common/textareaLimits'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import BlankContext, { blankInk } from '../../../../contexts/BlankContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    defenses: Defense
    pageID: number
    updates: PageType1Updates
}

export default function DefensesDisplay({ defenses, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const isBlank = useContext(BlankContext)
    const { name, initiative, defense, parry, flanks, cover, parryDR, dr, notes } = defenses

    return (
        <div className="defenses-v2">
            <div className="defenses-header">
                <span>
                    <h1>Defenses</h1>
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={blankInk(isBlank, name)} onChange={event => updates.updateDefense(pageID, { name: event.target.value })} />
                        :
                        <p className="character-value">{blankInk(isBlank, name)}</p>
                    }
                </span>
                <span>
                    <em>Initiative</em>
                    {isEditing ?
                        <input className="center-text character-value" type="number" placeholder=" " value={blankInk(isBlank, initiative)} onChange={event => updates.updateDefense(pageID, { initiative: +event.target.value })} />
                        :
                        <p className="center-text character-value">{blankInk(isBlank, initiative)}</p>
                    }
                </span>
            </div>
            <div className="def-row">
                <em>Def (Parry / Flanks)</em>
                {isEditing ?
                    <input className="center-text character-value" type="number" placeholder=" " value={blankInk(isBlank, defense)} onChange={event => updates.updateDefense(pageID, { defense: +event.target.value })} />
                    :
                    <p className="center-text character-value">{blankInk(isBlank, defense)}</p>
                }
                <span>(</span>
                {isEditing ?
                    <input className="center-text character-value" type="number" placeholder=" " value={blankInk(isBlank, parry)} onChange={event => updates.updateDefense(pageID, { parry: +event.target.value })} />
                    :
                    <p className="center-text character-value">{blankInk(isBlank, parry)}</p>
                }
                <span>/</span>
                {isEditing ?
                    <input className="center-text character-value" type="number" placeholder=" " value={blankInk(isBlank, flanks)} onChange={event => updates.updateDefense(pageID, { flanks: +event.target.value })} />
                    :
                    <p className="center-text character-value">{blankInk(isBlank, flanks)}</p>
                }
                <span>)</span>
            </div>
            <div className="cover-row">
                <span>
                    <em>Cover</em>
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={blankInk(isBlank, cover)} onChange={event => updates.updateDefense(pageID, { cover: event.target.value })} />
                        :
                        <p className="character-value">{blankInk(isBlank, cover)}</p>
                    }
                </span>
                <span>
                    <em>P. DR</em>
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={blankInk(isBlank, parryDR)} onChange={event => updates.updateDefense(pageID, { parryDR: event.target.value })} />
                        :
                        <p className="character-value">{blankInk(isBlank, parryDR)}</p>
                    }
                </span>
                <span>
                    <em>DR</em>
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={blankInk(isBlank, dr)} onChange={event => updates.updateDefense(pageID, { dr: event.target.value })} />
                        :
                        <p className="character-value">{blankInk(isBlank, dr)}</p>
                    }
                </span>
            </div>
            {isEditing ?
                <textarea className="character-value" placeholder=" " maxLength={textareaCaps.defenseNotes} value={blankInk(isBlank, notes ?? '')} onScroll={event => holdTextareaScroll(event.currentTarget)} onChange={event => updates.updateDefense(pageID, { notes: clampTextareaChange(event.target.value, textareaCaps.defenseNotes, isComposingInput(event)) })} onCompositionEnd={event => updates.updateDefense(pageID, { notes: trimTextarea(event.currentTarget.value, textareaCaps.defenseNotes) })} />
                :
                <p className="character-value">{blankInk(isBlank, notes ?? '')}</p>
            }
        </div>
    )
}
