import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayPairArray from "../../../../../../displayArray/displayPair/DisplayPairArray"

interface Props {
    convictions: PairObject[]
}

export default function ConvictionsDisplay({ convictions }: Props) {
    return (
        <div className="convictions-shell">
            <h3>Convictions</h3>
            <DisplayPairArray max={8} arrayToDisplay={convictions} />
        </div>
    )
}