import './Stats.css'
import { Stats } from "@vault/common/interfaces/v2/page1/statsInterface";
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    stats: Stats
    pageID: number
    updates: PageType1Updates
}

export default function StatsDisplay({ stats, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const { str, dex, con, mem, ins, pre } = stats

    function statCell(label: string, key: keyof Stats, value: number) {
        return (
            <span>
                <strong>{label}</strong>
                {isEditing ?
                    <input className="character-value" type="number" value={value} onChange={event => updates.updateStat(pageID, key, +event.target.value)} />
                    :
                    <p className="character-value">{value}</p>
                }
            </span>
        )
    }

    return (
        <div className="stats-display-v2">
            <h1>Stats</h1>
            <div>
                {statCell('Str', 'str', str)}
                {statCell('Dex', 'dex', dex)}
                {statCell('Con', 'con', con)}
            </div>
            <div>
                {statCell('Mem', 'mem', mem)}
                {statCell('Ins', 'ins', ins)}
                {statCell('Pre', 'pre', pre)}
            </div>
        </div>
    )
}
