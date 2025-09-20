import './View.css'
import { useEffect } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import ViewVersionOne from "./v1/ViewVersionOne"
import CharacterHook from './v1/hooks/characterHook'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function View({ setLoading, pathname }: Props) {
    const { character } = CharacterHook(pathname)

    useEffect(() => {
        window.scrollTo(0, 0)

        if (setLoading) {
            setLoading(!!character)
        }
    }, [character])

    return (
        <div className="home-shell">
            {character && <ViewVersionOne character={character} />}
        </div>
    )
}