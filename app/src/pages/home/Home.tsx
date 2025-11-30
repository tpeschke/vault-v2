import "./Home.css"
import { useEffect } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import UsersCharactersHook from "../../hooks/UsersCharactersHook"
import { useSelector } from "react-redux"
import { isUserLoggedOn } from "../../redux/slices/userSlice"
import V1CharacterDisplay from "./components/v1CharacterDisplay/V1CharacterDisplay"
import V2CharacterDisplay from "./components/V2CharacterDisplay.tsx/V2CharacterDisplay"

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function Home({ setLoading, pathname }: Props) {
    document.title = "Bonfire Character Vault"

    const userIsLoggedIn = useSelector(isUserLoggedOn)

    const { usersCharacters, deleteCharacter, addCharacter } = UsersCharactersHook(pathname)

    useEffect(() => {
        if (setLoading) {
            setLoading(!!usersCharacters)
        }
    }, [usersCharacters])

    return (
        <div className="home-shell">
            {userIsLoggedIn && usersCharacters ? (
                <>
                    <V2CharacterDisplay usersCharacters={usersCharacters[1]} addCharacter={addCharacter} deleteCharacter={deleteCharacter.deleteV1Character} />
                    <V1CharacterDisplay usersCharacters={usersCharacters[0]} deleteCharacter={deleteCharacter.deleteV1Character} />
                </>
            ) : (
                <h1>You Need to Log In To View Your Characters</h1>
            )}
        </div>
    )
}