import './Convictions.css'
import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo"

interface Props {
    convictions: CharacteristicPair[]
}

export default function ConvictionsDisplay({ convictions }: Props) {
    return (
        <div className="convictions-v2">
            <h2>Convictions</h2>
            {convictions.map(({ id, value, rank }) => {
                return (
                    <span key={id}>
                        <p>{value}</p>
                        <p>{rank}</p>
                    </span>
                )
            })}
            {[...Array(Math.max(0, 3 - convictions.length))].map((_, index) => {
                return (
                    <span key={index}>
                        <p></p>
                    </span>
                )
            })}
        </div>
    )
}
