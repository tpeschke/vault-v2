import { StatsInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"

interface Props {
    statInfo: StatsInfo
}

export default function StatsDisplay({ statInfo }: Props) {
    const { str, dex, con, int, will, pre } = statInfo

    return (
        <div className="stats-shell false-table">
            <h2>Stats</h2>
            <span>
                <p>{str}</p>
                <strong>Str</strong>
            </span>
            <span>
                <p>{dex}</p>
                <strong>Dex</strong>
            </span>
            <span>
                <p>{con}</p>
                <strong>Con</strong>
            </span>
            <span>
                <p>{int}</p>
                <strong>Int</strong>
            </span>
            <span>
                <p>{will}</p>
                <strong>Will</strong>
            </span>
            <span>
                <p>{pre}</p>
                <strong>Pre</strong>
            </span>
        </div>
    )
}