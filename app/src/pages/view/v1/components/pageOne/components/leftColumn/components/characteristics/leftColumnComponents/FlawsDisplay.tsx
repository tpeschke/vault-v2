import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {
    flaws: PairObject[]
}

export default function FlawsDisplay({ flaws }: Props) {
    return (
        <div className="flaws-shell">
            <h3>Flaws</h3>
            <DisplayArray max={6} arrayToDisplay={flaws} />
        </div>
    )
}