interface Props {

}

export default function StatsDisplay({ }: Props) {
    return (
        <div className="stats-shell false-table">
            <h2>Stats</h2>
            <span>
                <p>1</p>
                <strong>Str</strong>
            </span>
            <span>
                <p>2</p>
                <strong>Dex</strong>
            </span>
            <span>
                <p>3</p>
                <strong>Con</strong>
            </span>
            <span>
                <p>1</p>
                <strong>Int</strong>
            </span>
            <span>
                <p>1</p>
                <strong>Will</strong>
            </span>
            <span>
                <p>1</p>
                <strong>Pre</strong>
            </span>
        </div>
    )
}