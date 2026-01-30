import './Temperaments.css'
import { Temperaments } from "@vault/common/interfaces/v2/page1/characteristicsInfo"

interface Props {
    temperaments: Temperaments
}

export default function TemperamentsDisplay({ temperaments }: Props) {
    const { affability, openness, outgoingness, workEthic, worry } = temperaments

    return (
        <div className="temperament-display-v2">
            <h2>Temperaments</h2>
            <div>
                <span>
                    <em>Affability</em>
                    <p>{affability}</p>
                </span>
                <span>
                    <em>Openness</em>
                    <p>{openness}</p>
                </span>
                <span>
                    <em>Outgoingness</em>
                    <p>{outgoingness}</p>
                </span>
            </div>
            <div>
                <span>
                    <em>Work-ethic</em>
                    <p>{workEthic}</p>
                </span>
                <span>
                    <em>Worry</em>
                    <p>{worry}</p>
                </span>
            </div>
        </div>
    )
}