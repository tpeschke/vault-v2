import './Stats.css'
import { Stats } from "@vault/common/interfaces/v2/page1/statsInterface";

interface Props {
    stats: Stats
}

export default function StatsDisplay({ stats }: Props) {
    const { str, dex, con, mem, ins, pre } = stats

    return (
        <div className="stats-display-v2">
            <h1>Stats</h1>
            <div>
                <span>
                    <strong>Str</strong>
                    <p className="character-value">{str}</p>
                </span>
                <span>
                    <strong>Dex</strong>
                    <p className="character-value">{dex}</p>
                </span>
                <span>
                    <strong>Con</strong>
                    <p className="character-value">{con}</p>
                </span>
            </div>
            <div>
                <span>
                    <strong>Mem</strong>
                    <p className="character-value">{mem}</p>
                </span>
                <span>
                    <strong>Ins</strong>
                    <p className="character-value">{ins}</p>
                </span>
                <span>
                    <strong>Pre</strong>
                    <p className="character-value">{pre}</p>
                </span>
            </div>
        </div>
    )
}
