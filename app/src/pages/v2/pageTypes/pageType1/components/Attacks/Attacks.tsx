import './Attacks.css'
import { AttacksArray } from "@vault/common/interfaces/v2/page1/combatInfo"
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    attacks: AttacksArray
    pageID: number
    updates: PageType1Updates
}

export default function AttacksDisplay({ attacks, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)

    return (
        <div className="attacks-v2">
            <h1>Attacks</h1>
            {attacks.map(({ index, name, measure, attack, damage, type, recovery, notes }) => (
                <div key={index} className="attack-block">
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={name} onChange={event => updates.updateAttack(pageID, index, { name: event.target.value })} />
                        :
                        <h2 className="character-value">{name}</h2>
                    }
                    <div className="attack-row">
                        <span>
                            <em>Meas/RI</em>
                            {isEditing ?
                                <input className="center-text character-value" type="number" placeholder=" " value={measure} onChange={event => updates.updateAttack(pageID, index, { measure: +event.target.value })} />
                                :
                                <p className="center-text character-value">{measure}</p>
                            }
                        </span>
                        <span>
                            <em>Atk</em>
                            {isEditing ?
                                <input className="center-text character-value" type="number" placeholder=" " value={attack} onChange={event => updates.updateAttack(pageID, index, { attack: +event.target.value })} />
                                :
                                <p className="center-text character-value">{attack}</p>
                            }
                        </span>
                        <span>
                            <em>Damage</em>
                            {isEditing ?
                                <input className="character-value" placeholder=" " value={damage} onChange={event => updates.updateAttack(pageID, index, { damage: event.target.value })} />
                                :
                                <p className="character-value">{damage}</p>
                            }
                        </span>
                    </div>
                    <div className="attack-row">
                        <span>
                            <em>Type</em>
                            {isEditing ?
                                <input className="character-value" placeholder=" " value={type} onChange={event => updates.updateAttack(pageID, index, { type: event.target.value })} />
                                :
                                <p className="character-value">{type}</p>
                            }
                        </span>
                        <span>
                            <em>Rec</em>
                            {isEditing ?
                                <input className="center-text character-value" type="number" placeholder=" " value={recovery} onChange={event => updates.updateAttack(pageID, index, { recovery: +event.target.value })} />
                                :
                                <p className="center-text character-value">{recovery}</p>
                            }
                        </span>
                    </div>
                    <span className="attack-notes">
                        {isEditing ?
                            <textarea className="character-value" placeholder=" " value={notes ?? ''} onChange={event => updates.updateAttack(pageID, index, { notes: event.target.value })} />
                            :
                            <p className="character-value">{notes ?? ''}</p>
                        }
                    </span>
                </div>
            ))}
        </div>
    )
}
