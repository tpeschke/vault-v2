import { MovementInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { useContext } from "react"
import EditingContext from "../../../../../contexts/EditingContext"
import { UpdateMovementFunction } from "../../../../../hooks/interfaces/PageOneInterfaces"

interface Props {
    movementInfo: MovementInfo,
    updateMovement: UpdateMovementFunction
}

export default function MovementDisplay({ movementInfo, updateMovement }: Props) {
    const isEditing = useContext(EditingContext)
    
    const { crawl, walk, jog, run, sprint } = movementInfo

    return (
        <div className="movement-shell false-table">
            <h2>Movement</h2>
            <span>
                <strong>Crawl</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateMovement('crawl', +event.target.value)} defaultValue={crawl} />
                    :
                    <p>{crawl}</p>
                }
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Walk</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateMovement('walk', +event.target.value)} defaultValue={walk} />
                    :
                    <p>{walk}</p>
                }
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Jog</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateMovement('jog', +event.target.value)} defaultValue={jog} />
                    :
                    <p>{jog}</p>
                }
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Run</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateMovement('run', +event.target.value)} defaultValue={run} />
                    :
                    <p>{run}</p>
                }
                <strong>10 Second Interval</strong>
            </span>
            <span>
                <strong>Sprint</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateMovement('sprint', +event.target.value)} defaultValue={sprint} />
                    :
                    <p>{sprint}</p>
                }
                <strong>5 Seconds Interval</strong>
            </span>
        </div>
    )
}