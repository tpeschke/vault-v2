import { MovementInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"

interface Props {
    movementInfo: MovementInfo,
    isEditing: boolean
}

export default function MovementDisplay({ movementInfo, isEditing }: Props) {
    const { crawl, walk, jog, run, sprint } = movementInfo

    return (
        <div className="movement-shell false-table">
            <h2>Movement</h2>
            <span>
                <strong>Crawl</strong>
                {isEditing ?
                    <input defaultValue={crawl} />
                    :
                    <p>{crawl}</p>
                }
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Walk</strong>
                {isEditing ?
                    <input defaultValue={walk} />
                    :
                    <p>{walk}</p>
                }
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Jog</strong>
                {isEditing ?
                    <input defaultValue={jog} />
                    :
                    <p>{jog}</p>
                }
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Run</strong>
                {isEditing ?
                    <input defaultValue={run} />
                    :
                    <p>{run}</p>
                }
                <strong>10 Second Interval</strong>
            </span>
            <span>
                <strong>Sprint</strong>
                {isEditing ?
                    <input defaultValue={sprint} />
                    :
                    <p>{sprint}</p>
                }
                <strong>5 Seconds Interval</strong>
            </span>
        </div>
    )
}