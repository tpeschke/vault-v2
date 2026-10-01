import { CharacteristicPair } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import './Descriptions.css'

interface Props {
    convictions: CharacteristicPair[]
}

export default function DescriptionsDisplay({ convictions }: Props) {
    return (
        <div className='descriptions-v2'>
            <h2>Descriptions</h2>
            {convictions.map(({ id, value }) => {
                return (
                    <span key={id}>
                        <p>{value}</p>
                    </span>
                )
            })}
            {[...Array(Math.max(0, 5 - convictions.length))].map((_, index) => {
                return (
                    <span key={index}>
                        <p></p>
                    </span>
                )
            })}
        </div>
    )
}
