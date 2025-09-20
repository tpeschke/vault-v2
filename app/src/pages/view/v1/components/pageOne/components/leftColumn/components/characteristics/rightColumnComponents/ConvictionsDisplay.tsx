import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {
    convictions: PairObject[]
}

export default function ConvictionsDisplay({ convictions }: Props) {
    return (
        <div className="convictions-shell">
            <h3>Convictions</h3>
            <DisplayArray max={8} arrayToDisplay={convictions} />
        </div>
    )
}