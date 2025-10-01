import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayPairArray from "../../../../../../displayArray/displayPair/DisplayPairArray"
import { InsertCharacteristicFunction, UpdateCharacteristicFunction } from "../../../../../../../hooks/interfaces/UpdateCharacterFunctionInterfaces"

interface Props {
    descriptions: PairObject[],
    insertDescription: InsertCharacteristicFunction,
    updateDescription: UpdateCharacteristicFunction
}

export default function DescriptionsDisplay({ descriptions, insertDescription, updateDescription }: Props) {
    return (
        <div className="descriptions-shell">
            <h3>Descriptions</h3>
            <DisplayPairArray max={5} arrayToDisplay={descriptions} insertFunction={insertDescription} updateFunction={updateDescription} />
        </div>
    )
}