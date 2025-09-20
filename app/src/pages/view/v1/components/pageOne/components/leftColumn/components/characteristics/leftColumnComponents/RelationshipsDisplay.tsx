import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {
    relationships: PairObject[]
}

export default function RelationshipsDisplay({ relationships }: Props) {
    return (
        <div className="relationships-shell">
            <h3>Relationships</h3>
            <DisplayArray max={5} arrayToDisplay={relationships} />
        </div>
    )
}