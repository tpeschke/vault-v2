import './ReputationDisplay.css'
import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo";

interface Props {
    reputations: CharacteristicPair[]
}

export default function ReputationDisplay({ reputations }: Props) {
    return (
        <div className="reputation-display-v2">
            <h2>Reputation</h2>
            {reputations.map(({id, value, rank}) => {
                return (
                    <span key={id}>
                        <em>I'm Known For</em>
                        <p className="character-value">{value}</p>
                        <p className="character-value">{rank}</p>
                    </span>
                )
            })}
            {[...Array(Math.max(0, 3 - reputations.length))].map((_, index) =>{
                return (
                    <span key={index}>
                        <em>I'm Known For</em>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                    </span>
                )
            })}
        </div>
    )
}
