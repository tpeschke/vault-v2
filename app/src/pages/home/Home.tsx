import "./Home.css"
import { useEffect } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import UsersCharactersHook from "../../hooks/UsersCharactersHook"
import CharacterRowDisplay from "./components/charactersRowDisplay/CharacterRowsDisplay"
import HomeFooter from "./components/homeFooter/HomeFooter"
import { useSelector } from "react-redux"
import { isUserLoggedOn } from "../../redux/slices/userSlice"

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function Home({ setLoading, pathname }: Props) {
    const userIsLoggedIn = useSelector(isUserLoggedOn)

    const { usersCharacters, deleteCharacter } = UsersCharactersHook(pathname)

    useEffect(() => {
        if (setLoading) {
            setLoading(!!usersCharacters)
        }
    }, [usersCharacters])

    return (
        <div className="home-shell card">
            {userIsLoggedIn ? (
                <>
                    <div className="home-shell-heading">
                        <i className="fa-solid fa-users"></i>
                        <h1>Your Characters</h1>
                    </div>
                    <CharacterRowDisplay usersCharacters={usersCharacters} deleteCharacter={deleteCharacter} />
                    {/* I'm pausing the ability to add new characters until the new update is made */}
                    {/* <HomeFooter numberOfCharacters={usersCharacters?.length} addCharacter={addCharacter} /> */}
                </>
            ) : (
                <h1>You Need to Log In To View Your Characters</h1>
            )}
        </div>
    )
}