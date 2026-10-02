import './Defenses.css'
import { Defense } from "@vault/common/interfaces/v2/page1/combatInfo"
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    defenses: Defense
    pageID: number
    updates: PageType1Updates
}

export default function DefensesDisplay({ defenses, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const { name, initiative, defense, parry, flanks, cover, parryDR, dr, notes } = defenses

    return (
        <div className="defenses-v2">
            <div className="defenses-header">
                <span>
                    <h1>Defenses</h1>
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={name} onChange={event => updates.updateDefense(pageID, { name: event.target.value })} />
                        :
                        <p className="character-value">{name}</p>
                    }
                </span>
                <span>
                    <em>Initiative</em>
                    {isEditing ?
                        <input className="center-text character-value" type="number" placeholder=" " value={initiative} onChange={event => updates.updateDefense(pageID, { initiative: +event.target.value })} />
                        :
                        <p className="center-text character-value">{initiative}</p>
                    }
                </span>
            </div>
            <div className="def-row">
                <em>Def (Parry / Flanks)</em>
                {isEditing ?
                    <input className="center-text character-value" type="number" placeholder=" " value={defense} onChange={event => updates.updateDefense(pageID, { defense: +event.target.value })} />
                    :
                    <p className="center-text character-value">{defense}</p>
                }
                <span>(</span>
                {isEditing ?
                    <input className="center-text character-value" type="number" placeholder=" " value={parry} onChange={event => updates.updateDefense(pageID, { parry: +event.target.value })} />
                    :
                    <p className="center-text character-value">{parry}</p>
                }
                <span>/</span>
                {isEditing ?
                    <input className="center-text character-value" type="number" placeholder=" " value={flanks} onChange={event => updates.updateDefense(pageID, { flanks: +event.target.value })} />
                    :
                    <p className="center-text character-value">{flanks}</p>
                }
                <span>)</span>
            </div>
            <div className="cover-row">
                <span>
                    <em>Cover</em>
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={cover} onChange={event => updates.updateDefense(pageID, { cover: event.target.value })} />
                        :
                        <p className="character-value">{cover}</p>
                    }
                </span>
                <span>
                    <em>P. DR</em>
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={parryDR} onChange={event => updates.updateDefense(pageID, { parryDR: event.target.value })} />
                        :
                        <p className="character-value">{parryDR}</p>
                    }
                </span>
                <span>
                    <em>DR</em>
                    {isEditing ?
                        <input className="character-value" placeholder=" " value={dr} onChange={event => updates.updateDefense(pageID, { dr: event.target.value })} />
                        :
                        <p className="character-value">{dr}</p>
                    }
                </span>
            </div>
            {isEditing ?
                <textarea className="character-value" placeholder=" " value={notes ?? ''} onChange={event => updates.updateDefense(pageID, { notes: event.target.value })} />
                :
                <p className="character-value">{notes ?? ''}</p>
            }
        </div>
    )
}
