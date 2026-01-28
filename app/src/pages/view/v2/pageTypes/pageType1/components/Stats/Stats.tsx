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
                    <p>{str}</p>
                </span>
                <span>
                    <strong>Dex</strong>
                    <p>{dex}</p>
                </span>
                <span>
                    <strong>Con</strong>
                    <p>{con}</p>
                </span>
            </div>
            <div>
                <span>
                    <strong>Mem</strong>
                    <p>{mem}</p>
                </span>
                <span>
                    <strong>Ins</strong>
                    <p>{ins}</p>
                </span>
                <span>
                    <strong>Pre</strong>
                    <p>{pre}</p>
                </span>
            </div>
        </div>
    )
}