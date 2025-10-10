import { StatsInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { useContext } from "react"
import EditingContext from "../../../../../contexts/EditingContext"
import { UpdateStatFunction } from "../../../../../hooks/interfaces/pageOneInterfaces/UpdateCharacteristicInterfaces"

interface Props {
    statInfo: StatsInfo,
    updateStat: UpdateStatFunction
}

export default function StatsDisplay({ statInfo, updateStat }: Props) {
    const isEditing = useContext(EditingContext)
    
    const { str, dex, con, int, will, pre } = statInfo

    return (
        <div className="stats-shell false-table">
            <h2>Stats</h2>
            <span>
                {isEditing ?
                    <input type='number' onChange={(event: any) => updateStat('str', +event.target.value)} defaultValue={str} />
                    :
                    <p>{str}</p>
                }
                <strong>Str</strong>
            </span>
            <span>
                {isEditing ?
                    <input type='number' onChange={(event: any) => updateStat('dex', +event.target.value)} defaultValue={dex} />
                    :
                    <p>{dex}</p>
                }
                <strong>Dex</strong>
            </span>
            <span>
                {isEditing ?
                    <input type='number' onChange={(event: any) => updateStat('con', +event.target.value)} defaultValue={con} />
                    :
                    <p>{con}</p>
                }
                <strong>Con</strong>
            </span>
            <span>
                {isEditing ?
                    <input type='number' onChange={(event: any) => updateStat('int', +event.target.value)} defaultValue={int} />
                    :
                    <p>{int}</p>
                }
                <strong>Int</strong>
            </span>
            <span>
                {isEditing ?
                    <input type='number' onChange={(event: any) => updateStat('will', +event.target.value)} defaultValue={will} />
                    :
                    <p>{will}</p>
                }
                <strong>Will</strong>
            </span>
            <span>
                {isEditing ?
                    <input type='number' onChange={(event: any) => updateStat('pre', +event.target.value)} defaultValue={pre} />
                    :
                    <p>{pre}</p>
                }
                <strong>Pre</strong>
            </span>
        </div>
    )
}