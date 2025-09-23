import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import DisplaySingleArray from "../../../../../../displayArray/displaySingle/DisplaySingleArray"

interface Props {
    flaws: PairObject[]
}

export default function FlawsDisplay({ flaws }: Props) {
    return (
        <div className="flaws-shell">
            <h3>Flaws</h3>
            <DisplaySingleArray max={6} arrayToDisplay={flaws} />
        </div>
    )
}