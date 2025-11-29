import { CharacterHomeInfo } from "@vault/common/interfaces/characterInterfaces"
import { DeleteCharacterFunction } from "../../../../hooks/UsersCharactersHook"
import CharacterRowDisplay from "../charactersRowDisplay/CharacterRowsDisplay"

interface Props {
    usersCharacters: CharacterHomeInfo[] | null,
    deleteCharacter: DeleteCharacterFunction
}

export default function V2CharacterDisplay({ usersCharacters, deleteCharacter }: Props) {
    return (
        <div className="card">
            <div className="home-shell-heading">
                <i className="fa-solid fa-users"></i>
                <h1>Your Characters</h1>
            </div>
            <CharacterRowDisplay usersCharacters={usersCharacters} deleteCharacter={deleteCharacter} />
            {/* I'm pausing the ability to add new characters until the new update is made */}
            {/* <HomeFooter numberOfCharacters={usersCharacters?.length} addCharacter={addCharacter} /> */}
        </div>
    )
}