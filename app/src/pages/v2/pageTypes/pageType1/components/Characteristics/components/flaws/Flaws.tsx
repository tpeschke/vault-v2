import { Flaw } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import './Flaws.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'
import DisplaySingleArray from '../../../../../../components/displayArray/DisplaySingleArray'

interface Props {
    flaws: Flaw[]
    pageID: number
    updates: PageType1Updates
}

export default function FlawsDisplay({ flaws, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const rows = flaws ?? []

    return (
        <div className='flaws-v2'>
            <h2>Flaws</h2>
            <DisplaySingleArray
                max={3}
                items={rows.map(row => ({ id: row.id, key: row.key, value: row.flaw }))}
                insert={row => updates.insertFlaw(pageID, { key: row.key, flaw: row.value })}
                update={(index, next) => updates.updateFlaw(pageID, index, next.value)}
                renderRow={(item, _index, onChange) => (
                    <span>
                        {isEditing ?
                            <input className="character-value" placeholder=" " value={item.value} onChange={event => onChange({ ...item, value: event.target.value })} />
                            :
                            <p className="character-value">{item.value}</p>
                        }
                    </span>
                )}
                renderInsert={onBlur => (
                    <span>
                        <input className="character-value" placeholder=" " onBlur={onBlur} />
                    </span>
                )}
                renderLeftover={() => (
                    <span>
                        <p className="character-value"></p>
                    </span>
                )}
            />
        </div>
    )
}
