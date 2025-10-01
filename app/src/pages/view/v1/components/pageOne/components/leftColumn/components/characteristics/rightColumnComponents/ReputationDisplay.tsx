import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { useContext } from "react"
import EditingContext from "../../../../../../../contexts/EditingContext"
import { InsertCharacteristicFunction, UpdateCharacteristicFunction } from "../../../../../../../hooks/interfaces/PageOneInterfaces"

interface Props {
    reputation: PairObject[],
    insertReputation: InsertCharacteristicFunction,
    updateReputation: UpdateCharacteristicFunction
}

export default function ReputationDisplay({ reputation, insertReputation, updateReputation }: Props) {
    const isEditing = useContext(EditingContext)

    function formatRow(index: number) {
        const object = reputation[index]

        if (isEditing) {
            if (object?.value) {
                return <input value={object?.value} onChange={(event: any) => updateReputation(index, { title: undefined, value: event.target.value })} />
            }
            if (reputation[index - 1]?.value || index === 0) {
                return <input value={object?.value} onBlur={(event: any) => insertReputation({ title: undefined, value: event.target.value })} />
            }
        }

        return <p>{object?.value}</p>
    }

    return (
        <div className="reputation-shell">
            <h3>Reputation</h3>
            <span>
                <strong>I'm Know For</strong>
                {formatRow(0)}
            </span>
            <span>
                <strong>I'm Know For</strong>
                {formatRow(1)}
            </span>
            <span>
                <strong>I'm Know For</strong>
                {formatRow(2)}
            </span>
        </div>
    )
}