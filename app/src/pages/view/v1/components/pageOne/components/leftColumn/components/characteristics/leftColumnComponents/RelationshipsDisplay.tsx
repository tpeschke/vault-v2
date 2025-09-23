import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayPairArray from "../../../../../../displayArray/displayPair/DisplayPairArray"

interface Props {
    relationships: PairObject[]
}

export default function RelationshipsDisplay({ relationships }: Props) {
    return (
        <div className="relationships-shell">
            <h3>Relationships</h3>
            <DisplayPairArray max={5} arrayToDisplay={relationships} />
        </div>
    )
}