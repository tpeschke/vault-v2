import './ReputationDisplay.css'
import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo";
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    reputations: CharacteristicPair[]
    pageID: number
    updates: PageType1Updates
}

export default function ReputationDisplay({ reputations, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const rows = reputations ?? []

    return (
        <div className="reputation-display-v2">
            <h2>Reputation</h2>
            {[...Array(3)].map((_, index) => {
                const row = rows[index]
                return (
                    <span key={row?.id ?? index}>
                        <em>I'm Known For</em>
                        {isEditing ?
                            <input className="character-value" placeholder=" " value={row?.value ?? ''} onChange={event => updates.updateReputation(pageID, index, 'value', event.target.value)} />
                            :
                            <p className="character-value">{row?.value ?? ''}</p>
                        }
                        {isEditing ?
                            <input className="character-value" placeholder=" " value={row?.rank ?? ''} onChange={event => updates.updateReputation(pageID, index, 'rank', event.target.value)} />
                            :
                            <p className="character-value">{row?.rank ?? ''}</p>
                        }
                    </span>
                )
            })}
        </div>
    )
}
