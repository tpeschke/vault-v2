import { CharacterHomeInfo } from "@vault/common/interfaces/characterInterfaces"
import { DeleteCharacterFunction } from "../../../../hooks/UsersCharactersHook"
import CharacterRowDisplay from "../charactersRowDisplay/CharacterRowsDisplay"

interface Props {
    usersCharacters: CharacterHomeInfo[] | null,
    deleteCharacter: DeleteCharacterFunction
}

export default function V1CharacterDisplay({ usersCharacters, deleteCharacter }: Props) {
    if (!usersCharacters || usersCharacters.length === 0) { return <></>}
    return (
        <div className="card">
            <div className="home-shell-heading">
                <i className="fa-solid fa-users"></i>
                <h1>Your Ancient Characters</h1>
            </div>
            <CharacterRowDisplay usersCharacters={usersCharacters} deleteCharacter={deleteCharacter} viewRoute="view"/>
        </div>
    )
}