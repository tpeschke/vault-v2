import { CharacterHomeInfo } from "@vault/common/interfaces/characterInterfaces"
import { DeleteCharacterFunction } from "../../../../hooks/UsersCharactersHook"
import CharacterRowDisplay from "../charactersRowDisplay/CharacterRowsDisplay"
import HomeFooter from "../homeFooter/HomeFooter"

interface Props {
    usersCharacters: CharacterHomeInfo[] | null,
    deleteCharacter: DeleteCharacterFunction,
    addCharacter: () => void
}

export default function V2CharacterDisplay({ usersCharacters, deleteCharacter, addCharacter }: Props) {
    return (
        <div className="card">
            <div className="home-shell-heading">
                <i className="fa-solid fa-users"></i>
                <h1>Your Characters</h1>
            </div>
            <CharacterRowDisplay usersCharacters={usersCharacters} deleteCharacter={deleteCharacter} />
            <HomeFooter numberOfCharacters={usersCharacters?.length} addCharacter={addCharacter} />
        </div>
    )
}