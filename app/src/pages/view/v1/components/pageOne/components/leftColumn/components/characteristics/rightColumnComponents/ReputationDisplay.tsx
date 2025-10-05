import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { useContext } from "react"
import EditingContext from "../../../../../../../contexts/EditingContext"
import { InsertCharacteristicFunction, UpdateCharacteristicFunction } from "../../../../../../../hooks/interfaces/pageOneInterfaces/UpdateCharacteristicInterfaces"
import DisplaySingleArray from "../../../../../../displayArray/displaySingle/DisplaySingleArray"

interface Props {
    reputation: PairObject[],
    insertReputation: InsertCharacteristicFunction,
    updateReputation: UpdateCharacteristicFunction
}

export default function ReputationDisplay({ reputation, insertReputation, updateReputation }: Props) {
    const isEditing = useContext(EditingContext)

    return (
        <div className="reputation-shell">
            <h3>Reputation</h3>
            <div className="reputation-item-shell">
                <div className="reputation-title-shell">
                    <strong>I'm Know For</strong>
                    <strong>I'm Know For</strong>
                    <strong>I'm Know For</strong>
                </div>
                <DisplaySingleArray max={3} arrayToDisplay={reputation} insertFunction={insertReputation} updateFunction={updateReputation} />
            </div>
        </div>
    )
}