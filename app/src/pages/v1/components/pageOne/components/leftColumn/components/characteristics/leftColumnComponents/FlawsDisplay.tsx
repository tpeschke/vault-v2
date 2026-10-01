import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplaySingleArray from "../../../../../../displayArray/displaySingle/DisplaySingleArray"
import { InsertCharacteristicFunction, UpdateCharacteristicFunction } from "../../../../../../../hooks/interfaces/pageOneInterfaces/UpdateCharacteristicInterfaces"

interface Props {
    flaws: PairObject[],
    insertFlaw: InsertCharacteristicFunction,
    updateFlaw: UpdateCharacteristicFunction
}

export default function FlawsDisplay({ flaws, insertFlaw, updateFlaw }: Props) {
    return (
        <div className="flaws-shell">
            <h3>Flaws</h3>
            <DisplaySingleArray max={6} arrayToDisplay={flaws} insertFunction={insertFlaw} updateFunction={updateFlaw} />
        </div>
    )
}