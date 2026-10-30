import './Attacks.css'
import { AttacksArray } from "@vault/common/interfaces/v2/page1/combatInfo"
import { clampTextareaChange, holdTextareaScroll, isComposingInput, textareaCaps, trimTextarea } from '@vault/common/textareaLimits'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import BlankContext, { blankInk } from '../../../../contexts/BlankContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    attacks: AttacksArray
    pageID: number
    updates: PageType1Updates
}

export default function AttacksDisplay({ attacks, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const isBlank = useContext(BlankContext)

    return (
        <div className="attacks-v2">
            <h1>Attacks</h1>
            {attacks.map(({ index, name, measure, attack, damage, type, recovery, notes }) => (
                <div key={index} className="attack-block">
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={blankInk(isBlank, name)} onChange={event => updates.updateAttack(pageID, index, { name: event.target.value })} />
                        :
                        <h2 className="character-value">{blankInk(isBlank, name)}</h2>
                    }
                    <div className="attack-row">
                        <span>
                            <em>Meas/RI</em>
                            {isEditing ?
                                <input className="center-text character-value" type="number" placeholder=" " value={blankInk(isBlank, measure)} onChange={event => updates.updateAttack(pageID, index, { measure: +event.target.value })} />
                                :
                                <p className="center-text character-value">{blankInk(isBlank, measure)}</p>
                            }
                        </span>
                        <span>
                            <em>Atk</em>
                            {isEditing ?
                                <input className="center-text character-value" type="number" placeholder=" " value={blankInk(isBlank, attack)} onChange={event => updates.updateAttack(pageID, index, { attack: +event.target.value })} />
                                :
                                <p className="center-text character-value">{blankInk(isBlank, attack)}</p>
                            }
                        </span>
                        <span>
                            <em>Damage</em>
                        </span>
                    </div>
                    <div className="attack-row">
                        <span>
                            <em>Type</em>
                            {isEditing ?
                                <input className="character-value" placeholder=" " value={blankInk(isBlank, type)} onChange={event => updates.updateAttack(pageID, index, { type: event.target.value })} />
                                :
                                <p className="character-value">{blankInk(isBlank, type)}</p>
                            }
                        </span>
                        <span>
                            <em>Rec</em>
                            {isEditing ?
                                <input className="center-text character-value" type="number" placeholder=" " value={blankInk(isBlank, recovery)} onChange={event => updates.updateAttack(pageID, index, { recovery: +event.target.value })} />
                                :
                                <p className="center-text character-value">{blankInk(isBlank, recovery)}</p>
                            }
                        </span>
                        <span className="attack-damage-value">
                            {isEditing ?
                                <input className="character-value" placeholder=" " value={blankInk(isBlank, damage)} onChange={event => updates.updateAttack(pageID, index, { damage: event.target.value })} />
                                :
                                <p className="character-value">{blankInk(isBlank, damage)}</p>
                            }
                        </span>
                    </div>
                    <span className="attack-notes">
                        {isEditing ?
                            <textarea className="character-value" placeholder=" " maxLength={textareaCaps.attackNotes} value={blankInk(isBlank, notes ?? '')} onScroll={event => holdTextareaScroll(event.currentTarget)} onChange={event => updates.updateAttack(pageID, index, { notes: clampTextareaChange(event.target.value, textareaCaps.attackNotes, isComposingInput(event)) })} onCompositionEnd={event => updates.updateAttack(pageID, index, { notes: trimTextarea(event.currentTarget.value, textareaCaps.attackNotes) })} />
                            :
                            <p className="character-value">{blankInk(isBlank, notes ?? '')}</p>
                        }
                    </span>
                </div>
            ))}
        </div>
    )
}
