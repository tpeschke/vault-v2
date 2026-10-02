import './Vitals.css'
import { Vitals } from "@vault/common/interfaces/v2/page1/vitals"
import d4 from '../../../../../../assets/images/d4.png'
import d6 from '../../../../../../assets/images/d6.png'
import d8 from '../../../../../../assets/images/d8.png'
import d10 from '../../../../../../assets/images/d10.png'
import d12 from '../../../../../../assets/images/d12.png'
import d20 from '../../../../../../assets/images/d20.png'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    vitals: Vitals
    pageID: number
    updates: PageType1Updates
}

export default function VitalsDisplay({ vitals, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const { selfDoubt, damage, stress } = vitals

    return (
        <div className="vitals-v2">
            <section>
                <h1>Self Doubt</h1>
                <DieRow dieIndex={selfDoubt.dieIndex} onSelect={index => updates.updateSelfDoubt(pageID, { dieIndex: index })} />
                <div className="vitals-split">
                    <span>
                        <h2>Integrity Threshold</h2>
                        {isEditing ?
                            <input className="center-text character-value" type="number" value={selfDoubt.threshold} onChange={event => updates.updateSelfDoubt(pageID, { threshold: +event.target.value })} />
                            :
                            <p className="center-text character-value">{selfDoubt.threshold}</p>
                        }
                    </span>
                    <span>
                        <h2>Die Penalty</h2>
                        {isEditing ?
                            <input className="center-text character-value" type="number" value={selfDoubt.diePenalty} onChange={event => updates.updateSelfDoubt(pageID, { diePenalty: +event.target.value })} />
                            :
                            <p className="center-text character-value">{selfDoubt.diePenalty}</p>
                        }
                    </span>
                </div>
            </section>
            <section>
                <h1>Damage</h1>
                <DieRow dieIndex={damage.dieIndex} onSelect={index => updates.updateDamage(pageID, { dieIndex: index })} />
                <div className="damage-values">
                    <span className='vitals-split'>
                        <h2>Trauma</h2>
                        <p className="center-text character-value">{damage.threshold * 2}</p>
                    </span>
                    <span className='vitals-split'>
                        <h2>Knock Back</h2>
                        {isEditing ?
                            <input className="center-text character-value" type="number" value={damage.knockback} onChange={event => updates.updateDamage(pageID, { knockback: +event.target.value })} />
                            :
                            <p className="center-text character-value">{damage.knockback}</p>
                        }
                    </span>
                    {isEditing ?
                        <input className="center-text character-value" type="number" value={damage.damage} onChange={event => updates.updateDamage(pageID, { damage: +event.target.value })} />
                        :
                        <p className="center-text character-value">{damage.damage}</p>
                    }
                    <span className="slash">/</span>
                    {isEditing ?
                        <input className="center-text character-value" type="number" value={damage.threshold} onChange={event => updates.updateDamage(pageID, { threshold: +event.target.value })} />
                        :
                        <p className="center-text character-value">{damage.threshold}</p>
                    }
                </div>
            </section>
            <section>
                <h1>Stress</h1>
                <DieRow dieIndex={stress.dieIndex} onSelect={index => updates.updateStress(pageID, { dieIndex: index })} />
                <div className="stress-values">
                    {isEditing ?
                        <input className="center-text character-value" type="number" value={stress.stress} onChange={event => updates.updateStress(pageID, { stress: +event.target.value })} />
                        :
                        <p className="center-text character-value">{stress.stress}</p>
                    }
                    <span className="slash">/</span>
                    {isEditing ?
                        <input className="center-text character-value" type="number" value={stress.threshold} onChange={event => updates.updateStress(pageID, { threshold: +event.target.value })} />
                        :
                        <p className="center-text character-value">{stress.threshold}</p>
                    }
                </div>
            </section>
        </div>
    )
}

function DieRow({ dieIndex, onSelect }: { dieIndex: number, onSelect: (dieIndex: number) => void }) {
    const isEditing = useContext(EditingContext)
    const cellClass = (index: number) => dieIndex > 0 && (dieIndex - 1) === index ? 'selected center-text' : 'center-text'
    const dice = [d4, d6, d8, d10, d12, d20]
    const names = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20']

    return (
        <div className="die-row">
            <h2>Die</h2>
            {dice.map((src, index) => (
                <p
                    key={names[index]}
                    className={cellClass(index)}
                    onClick={isEditing ? () => onSelect(dieIndex === index + 1 ? 0 : index + 1) : undefined}
                >
                    <img src={src} alt={names[index]} />
                </p>
            ))}
        </div>
    )
}
