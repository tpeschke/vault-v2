import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {
    descriptions: PairObject[]
}

export default function DescriptionsDisplay({ descriptions }: Props) {
    return (
        <div className="descriptions-shell">
            <h3>Descriptions</h3>
            <DisplayArray max={5} arrayToDisplay={descriptions} />
        </div>
    )
}