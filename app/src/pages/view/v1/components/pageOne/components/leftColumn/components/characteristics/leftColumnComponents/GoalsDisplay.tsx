import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplaySingleArray from "../../../../../../displayArray/displaySingle/DisplaySingleArray"

interface Props {
    goals: PairObject[]
}

export default function GoalsDisplay({ goals }: Props) {
    return (
        <div className="goals-shell">
            <h3>Goals</h3>
            <DisplaySingleArray max={3} arrayToDisplay={goals} />
        </div>
    )
}