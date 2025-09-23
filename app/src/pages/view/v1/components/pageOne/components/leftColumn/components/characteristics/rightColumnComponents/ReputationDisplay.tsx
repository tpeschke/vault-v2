import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { useContext } from "react"
import EditingContext from "../../../../../../../contexts/EditingContext"

interface Props {
    reputation: PairObject[]
}

export default function ReputationDisplay({ reputation }: Props) {
    const isEditing = useContext(EditingContext)

    const [one, two, three] = reputation

    return (
        <div className="reputation-shell">
            <h3>Reputation</h3>
            <span>
                <strong>I'm Know For</strong>
                {isEditing ?
                    <input value={one?.value} />
                    :
                    <p>{one?.value}</p>
                }
            </span>
            <span>
                <strong>I'm Know For</strong>
                {isEditing ?
                    <input value={two?.value} />
                    :
                    <p>{two?.value}</p>
                }
            </span>
            <span>
                <strong>I'm Know For</strong>
                {isEditing ?
                    <input value={three?.value} />
                    :
                    <p>{three?.value}</p>
                }
            </span>
        </div>
    )
}