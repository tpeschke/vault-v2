import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {
    goals: PairObject[]
}

export default function GoalsDisplay({ goals }: Props) {
    return (
        <div className="goals-shell">
            <h3>Goals</h3>
            <DisplayArray max={3} arrayToDisplay={goals} />
        </div>
    )
}