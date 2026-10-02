import { Description } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import './Descriptions.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'
import DisplaySingleArray from '../../../../../../components/displayArray/DisplaySingleArray'

interface Props {
    descriptions: Description[]
    pageID: number
    updates: PageType1Updates
}

export default function DescriptionsDisplay({ descriptions, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const rows = descriptions ?? []

    return (
        <div className='descriptions-v2'>
            <h2>Descriptions</h2>
            <DisplaySingleArray
                max={5}
                items={rows}
                insert={row => updates.insertDescription(pageID, row)}
                update={(index, next) => updates.updateDescription(pageID, index, next.value)}
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
