import './ReputationDisplay.css'
import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo";
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'
import DisplayPairArray from '../../../../../../components/displayArray/DisplayPairArray'

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
            <DisplayPairArray
                max={3}
                items={rows}
                insert={row => updates.insertReputation(pageID, { key: row.key, value: row.value, rank: String(row.rank) })}
                update={(index, next) => updates.updateReputation(pageID, index, {
                    id: next.id ?? 0,
                    key: next.key,
                    value: next.value,
                    rank: String(next.rank)
                })}
                renderRow={(item, _index, onChange) => (
                    <span>
                        <em>I'm Known For</em>
                        {isEditing ?
                            <input className="character-value" placeholder=" " value={item.value} onChange={event => onChange({ ...item, value: event.target.value })} />
                            :
                            <p className="character-value">{item.value}</p>
                        }
                        {isEditing ?
                            <input className="character-value" placeholder=" " value={item.rank} onChange={event => onChange({ ...item, rank: event.target.value })} />
                            :
                            <p className="character-value">{item.rank}</p>
                        }
                    </span>
                )}
                renderInsert={(onBlurValue, onBlurRank) => (
                    <span>
                        <em>I'm Known For</em>
                        <input className="character-value" placeholder=" " onBlur={onBlurValue} />
                        <input className="character-value" placeholder=" " onBlur={onBlurRank} />
                    </span>
                )}
                renderLeftover={() => (
                    <span>
                        <em>I'm Known For</em>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                    </span>
                )}
            />
        </div>
    )
}
