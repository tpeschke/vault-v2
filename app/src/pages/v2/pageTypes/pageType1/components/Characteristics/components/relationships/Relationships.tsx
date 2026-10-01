import { CharacteristicPair } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import './Relationships.css'

interface Props {
    relationships: CharacteristicPair[]
}

export default function RelationshipsDisplay({ relationships }: Props) {
    return (
        <div className='relationships-v2'>
            <h2>Active Relationships</h2>
            {relationships.map(({ id, value, rank }) => {
                return (
                    <span key={id}>
                        <p>{value}</p>
                        <p>{rank}</p>
                    </span>
                )
            })}
            {[...Array(3 - relationships.length)].map((_, index) => {
                return (
                    <span key={index}>
                        <p></p>
                    </span>
                )
            })}
        </div>
    )
}