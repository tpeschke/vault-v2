import { PairObject } from "@vault/common/interfaces/characterInterfaces"
import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {

}

export default function RelationshipsDisplay({ }: Props) {
    const relationships: PairObject[] = [
        {
            title: 'Drive to Create',
            value: 2
        },
        {
            title: "Trusts Jeremy's Character",
            value: 6
        }
    ]

    return (
        <div className="relationships-shell">
            <h3>Relationships</h3>
            <DisplayArray max={5} arrayToDisplay={relationships} />
        </div>
    )
}