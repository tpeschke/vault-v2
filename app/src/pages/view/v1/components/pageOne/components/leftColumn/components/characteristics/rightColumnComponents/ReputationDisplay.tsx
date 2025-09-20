import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"

interface Props {
    reputation: PairObject[]
}

export default function ReputationDisplay({ reputation }: Props) {
    return (
        <div className="reputation-shell">
            <h3>Reputation</h3>
            <span>
                <strong>I'm Know For</strong>
                <p>{reputation[0].value}</p>
            </span>
            <span>
                <strong>I'm Know For</strong>
                <p>{reputation[1]?.value}</p>
            </span>
            <span>
                <strong>I'm Know For</strong>
                <p>{reputation[2]?.value}</p>
            </span>
        </div>
    )
}