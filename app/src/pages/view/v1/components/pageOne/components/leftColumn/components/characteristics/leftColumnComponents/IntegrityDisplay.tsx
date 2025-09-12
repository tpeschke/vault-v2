interface Props {

}

export default function IntegrityDisplay({}: Props) {
    const integrity = 9

    function getLeftPosition(integrity: number): number {
        if (integrity <= 5) {
            return 21
        } else if (integrity <= 10) {
            return 76
        } else if (integrity <= 15) {
            return 135
        } else if (integrity <= 20) {
            return 194
        } else if (integrity <= 25) {
            return 258
        } else {
            return 21
        }
    }

    
    function placeholderFunction() {

    }

    return (
        <div className="integrity-shell">
            <span>
                <input onChange={placeholderFunction} defaultValue={integrity} />
                <strong>Integrity</strong>
            </span>
            <div>
                <div className="circle" style={{left: `${getLeftPosition(integrity)}px`}}></div>
                <p>0-5 N/A</p>
                <p>6-10 d4!</p>
                <p>11-15 d6!</p>
                <p>16-20 d8!</p>
                <p>21-25 d10!</p>
            </div>
            <span>
                <strong>Grit Dice</strong>
                <input onChange={placeholderFunction} defaultValue={1} />
            </span>
        </div>
    )
}