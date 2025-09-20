import { MovementInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"

interface Props {
    movementInfo: MovementInfo
}

export default function MovementDisplay({ movementInfo }: Props) {
    const { crawl, walk, jog, run, sprint } = movementInfo

    return (
        <div className="movement-shell false-table">
            <h2>Movement</h2>
            <span>
                <strong>Crawl</strong>
                <p>{crawl}</p>
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Walk</strong>
                <p>{walk}</p>
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Jog</strong>
                <p>{jog}</p>
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Run</strong>
                <p>{run}</p>
                <strong>10 Second Interval</strong>
            </span>
            <span>
                <strong>Sprint</strong>
                <p>{sprint}</p>
                <strong>5 Seconds Interval</strong>
            </span>
        </div>
    )
}