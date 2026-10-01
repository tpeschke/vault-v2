import './Favor.css'
import { Favor } from "@vault/common/interfaces/v2/page1/favor"

interface Props {
    favor: Favor
}

export default function FavorDisplay({ favor }: Props) {
    const { current, max, anointed } = favor

    return (
        <div className="favor-v2">
            <h1>Favor</h1>
            <div>
                <span>
                    <em>Current</em>
                    <p>{current}</p>
                </span>
                <span>
                    <em>Max</em>
                    <p>{max}</p>
                </span>
                <span>
                    <em>Anointed?</em>
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
