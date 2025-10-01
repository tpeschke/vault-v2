import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayPairArray from "../../../../../../displayArray/displayPair/DisplayPairArray"
import { InsertCharacteristicFunction, UpdateCharacteristicFunction } from "../../../../../../../hooks/interfaces/UpdateCharacterFunctionInterfaces"

interface Props {
    relationships: PairObject[],
    insertRelationship: InsertCharacteristicFunction,
    updateRelationship: UpdateCharacteristicFunction
}

export default function RelationshipsDisplay({ relationships, insertRelationship, updateRelationship }: Props) {
    return (
        <div className="relationships-shell">
            <h3>Relationships</h3>
            <DisplayPairArray max={5} arrayToDisplay={relationships} insertFunction={insertRelationship} updateFunction={updateRelationship} />
        </div>
    )
}