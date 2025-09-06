interface Props {

}

export default function MovementDisplay({ }: Props) {
    return (
        <div className="movement-shell false-table">
            <h2>Movement</h2>
            <span>
                <strong>Crawl</strong>
                <p>2.5</p>
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Walk</strong>
                <p>5</p>
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Jog</strong>
                <p>10</p>
                <strong>∞ Seconds</strong>
            </span>
            <span>
                <strong>Run</strong>
                <p>15</p>
                <strong>10 Second Interval</strong>
            </span>
            <span>
                <strong>Sprint</strong>
                <p>20</p>
                <strong>5 Seconds Interval</strong>
            </span>
        </div>
    )
}