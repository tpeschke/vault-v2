import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayPairArray from "../../../../../../displayArray/displayPair/DisplayPairArray"
import { InsertCharacteristicFunction, UpdateCharacteristicFunction } from "../../../../../../../hooks/interfaces/pageOneInterfaces/UpdateCharacteristicInterfaces"

interface Props {
    convictions: PairObject[],
    insertConviction: InsertCharacteristicFunction,
    updateConviction: UpdateCharacteristicFunction
}

export default function ConvictionsDisplay({ convictions, insertConviction, updateConviction }: Props) {
    return (
        <div className="convictions-shell">
            <h3>Convictions</h3>
            <DisplayPairArray max={8} arrayToDisplay={convictions} insertFunction={insertConviction} updateFunction={updateConviction} />
        </div>
    )
}