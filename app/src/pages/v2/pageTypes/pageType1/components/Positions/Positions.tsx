import './Positions.css'

const POSITION_ROWS: { position: string, abr: string, explanation: string, outlined?: boolean }[] = [
    { position: 'Low + X', abr: 'LX', explanation: 'Rolled 1. X starts 0, +1 Boon / X' },
    { position: 'Strong 3', abr: 'S3', explanation: '3 dice, take lowest' },
    { position: 'Strong 2', abr: 'S2', explanation: '2 smallest dice, take lowest' },
    { position: 'Strong 1', abr: 'S1', explanation: 'Smallest die' },
    { position: 'Neutral', abr: 'N', explanation: 'Middle-sized die', outlined: true },
    { position: 'Weak 1', abr: 'W1', explanation: 'Largest die', outlined: true },
    { position: 'Weak 2', abr: 'W2', explanation: '2 largest die, take highest' },
    { position: 'Weak 3', abr: 'W3', explanation: '3 dice, take highest' },
    { position: 'High + X', abr: 'HX', explanation: 'Max largest die. X starts 0, +1 Comp. / X' },
]

export default function PositionsDisplay() {
    return (
        <div className="positions-v2">
            <h1>Positions</h1>
            <div className="positions-header">
                <em>Position</em>
                <em>Abr</em>
                <em>Explanation</em>
            </div>
            {POSITION_ROWS.map(({ position, abr, explanation, outlined }) => (
                <div key={position} className={outlined ? 'positions-row outlined' : 'positions-row'}>
                    <p>{position}</p>
                    <p>{abr}</p>
                    <p>{explanation}</p>
                </div>
            ))}
        </div>
    )
}
