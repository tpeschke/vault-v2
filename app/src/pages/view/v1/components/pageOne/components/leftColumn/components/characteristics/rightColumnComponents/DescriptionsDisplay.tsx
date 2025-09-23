import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayPairArray from "../../../../../../displayArray/displayPair/DisplayPairArray"

interface Props {
    descriptions: PairObject[]
}

export default function DescriptionsDisplay({ descriptions }: Props) {
    return (
        <div className="descriptions-shell">
            <h3>Descriptions</h3>
            <DisplayPairArray max={5} arrayToDisplay={descriptions} />
        </div>
    )
}