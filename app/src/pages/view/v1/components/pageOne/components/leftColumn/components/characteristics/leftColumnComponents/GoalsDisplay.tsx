import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplaySingleArray from "../../../../../../displayArray/displaySingle/DisplaySingleArray"
import { InsertCharacteristicFunction, UpdateCharacteristicFunction } from "../../../../../../../hooks/interfaces/UpdateCharacterFunctionInterfaces"

interface Props {
    goals: PairObject[],
    insertGoal: InsertCharacteristicFunction,
    updateGoal: UpdateCharacteristicFunction
}

export default function GoalsDisplay({ goals, insertGoal, updateGoal }: Props) {
    return (
        <div className="goals-shell">
            <h3>Goals</h3>
            <DisplaySingleArray max={3} arrayToDisplay={goals} insertFunction={insertGoal} updateFunction={updateGoal} />
        </div>
    )
}