import { StatsInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { useContext } from "react"
import EditingContext from "../../../../../contexts/EditingContext"

interface Props {
    statInfo: StatsInfo
}

export default function StatsDisplay({ statInfo }: Props) {
    const isEditing = useContext(EditingContext)
    
    const { str, dex, con, int, will, pre } = statInfo

    return (
        <div className="stats-shell false-table">
            <h2>Stats</h2>
            <span>
                {isEditing ?
                    <input defaultValue={str} />
                    :
                    <p>{str}</p>
                }
                <strong>Str</strong>
            </span>
            <span>
                {isEditing ?
                    <input defaultValue={dex} />
                    :
                    <p>{dex}</p>
                }
                <strong>Dex</strong>
            </span>
            <span>
                {isEditing ?
                    <input defaultValue={con} />
                    :
                    <p>{con}</p>
                }
                <strong>Con</strong>
            </span>
            <span>
                {isEditing ?
                    <input defaultValue={int} />
                    :
                    <p>{int}</p>
                }
                <strong>Int</strong>
            </span>
            <span>
                {isEditing ?
                    <input defaultValue={will} />
                    :
                    <p>{will}</p>
                }
                <strong>Will</strong>
            </span>
            <span>
                {isEditing ?
                    <input defaultValue={pre} />
                    :
                    <p>{pre}</p>
                }
                <strong>Pre</strong>
            </span>
        </div>
    )
}