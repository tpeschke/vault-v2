import "./Home.css"
import { useEffect } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import UsersCharactersHook from "../../hooks/UsersCharactersHook"
import CharacterRowDisplay from "./components/charactersRowDisplay/CharacterRowsDisplay"
import HomeFooter from "./components/homeFooter/HomeFooter"

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function Home({ setLoading, pathname }: Props) {
    const { usersCharacters } = UsersCharactersHook(pathname)

    useEffect(() => {
        if (setLoading) {
            setLoading(!!usersCharacters)
        }
    }, [usersCharacters])

    return (
        <div className="home-shell card">
            <div className="home-shell-heading">
                <i className="fa-solid fa-users"></i>
                <h1>Your Characters</h1>
            </div>
            <CharacterRowDisplay usersCharacters={usersCharacters} />
            <HomeFooter numberOfCharacters={usersCharacters?.length} />
        </div>
    )
}