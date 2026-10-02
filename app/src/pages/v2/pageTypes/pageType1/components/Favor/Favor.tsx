import './Favor.css'
import { Favor } from "@vault/common/interfaces/v2/page1/favor"

interface Props {
    favor: Favor
}

export default function FavorDisplay({ favor }: Props) {
    const { anointed, current, max } = favor

    return (
        <div className="favor-v2">
            <h1>Favor</h1>
            <div className="favor-body">
                <em className="favor-prompt">What is your relationship to the Divine?</em>
                <div className="favor-track">
                    <p className="center-text character-value">{current}</p>
                    <span>/</span>
                    <p className="center-text character-value">{max}</p>
                    <span className="anointed-row">
                        <em>Anointed?</em>
                        <span className={anointed ? 'anointed-box checked' : 'anointed-box'}></span>
                    </span>
                </div>
            </div>
        </div>
    )
}
