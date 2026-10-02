import { Description } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import './Descriptions.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'

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
            {[...Array(5)].map((_, index) => {
                const row = rows[index]
                return (
                    <span key={row?.id ?? index}>
                        {isEditing ?
                            <input className="character-value" placeholder=" " value={row?.value ?? ''} onChange={event => updates.updateDescription(pageID, index, event.target.value)} />
                            :
                            <p className="character-value">{row?.value ?? ''}</p>
                        }
                    </span>
                )
            })}
        </div>
    )
}
