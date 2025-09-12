import './NerveDisplay.css'

interface Props {

}

export default function NerveDisplay({ }: Props) {
    const nerve = 44
    const fatigue = 1

    const unsure = Math.ceil(nerve * .25)
    const tense = Math.floor(nerve * .5)
    const shaken = Math.ceil(nerve * .75)

    function getLeftPosition(fatigue: number): number {
        if (fatigue === 0) {
            return 243
        } else if (fatigue === 1) {
            return 158
        } else if (fatigue === 2) {
            return 78
        } else if (fatigue === 3) {
            return -2
        } else {
            return 243
        }
    }

    function placeholderFunction() {

    }

    return (
        <div className='nerve-display-shell'>
            <div>
                <h2>Nerve</h2>
                <div className='nerve-categories-shell'>
                    <div className='circle' style={{left: `${getLeftPosition(fatigue)}px`}}></div>
                    <span>
                        <strong>U</strong>
                        <p>1 - {unsure}</p>
                    </span>
                    <span>
                        <strong>T</strong>
                        <p>{unsure + 1} - {tense}</p>
                    </span>
                    <span>
                        <strong>S</strong>
                        <p>{tense + 1} - {shaken}</p>
                    </span>
                    <span>
                        <strong>Br</strong>
                        <p>{shaken + 1} - {nerve}</p>
                    </span>
                </div>
                <div className='stress-n-relaxation-shell'>
                    <span>
                        <strong>Stress</strong>
                        <input onClick={placeholderFunction} />
                    </span>
                    <span>
                        <strong>Relaxation</strong>
                        <input onClick={placeholderFunction} />
                    </span>
                </div>
            </div>
        </div>
    )
}
