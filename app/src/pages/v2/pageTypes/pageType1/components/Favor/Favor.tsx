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
            <div>
                <span>
                    <strong>Current</strong>
                    <p>{current}</p>
                </span>
                <span>
                    <strong>Max</strong>
                    <p>{max}</p>
                </span>
                <span>
                    <strong>Anointed?</strong>
                    {anointed ?
                        <i className="fa-solid fa-check"></i>
                        :
                        <i className="fa-solid fa-x"></i>
                    }
                </span>
            </div>
        </div>
    )
}
