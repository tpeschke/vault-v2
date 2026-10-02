import { Flaw } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import './Flaws.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'

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
            {[...Array(3)].map((_, index) => {
                const row = rows[index]
                return (
                    <span key={row?.id ?? index}>
                        {isEditing ?
                            <input className="character-value" value={row?.flaw ?? ''} onChange={event => updates.updateFlaw(pageID, index, event.target.value)} />
                            :
                            <p className="character-value">{row?.flaw ?? ''}</p>
                        }
                    </span>
                )
            })}
        </div>
    )
}
