import { CharacterHomeInfo } from "@vault/common/interfaces/characterInterfaces"
import { SafehouseHomeInfo } from "@vault/common/interfaces/safehouse/safehouse"
import { DeleteCharacterFunction } from "../../../../hooks/UsersCharactersHook"
import { DeleteSafehouseFunction } from "../../../../hooks/UsersSafehousesHook"
import CharacterRowDisplay from "../charactersRowDisplay/CharacterRowsDisplay"
import HomeFooter from "../homeFooter/HomeFooter"
import Safehouses from "../safehouses/Safehouses"

interface Props {
    usersCharacters: CharacterHomeInfo[] | null,
    deleteCharacter: DeleteCharacterFunction,
    addCharacter: () => void,
    safehouses: SafehouseHomeInfo[] | null,
    addSafehouse: () => void,
    deleteSafehouse: DeleteSafehouseFunction
}

export default function V2CharacterDisplay({ usersCharacters, deleteCharacter, addCharacter, safehouses, addSafehouse, deleteSafehouse }: Props) {
    return (
        <div className="card">
            <div className="home-shell-heading">
                <i className="fa-solid fa-users"></i>
                <h1>Your Characters</h1>
            </div>
            <CharacterRowDisplay usersCharacters={usersCharacters} deleteCharacter={deleteCharacter} />
            <HomeFooter numberOfCharacters={usersCharacters?.length} addCharacter={addCharacter} />
            <Safehouses safehouses={safehouses} onAdd={addSafehouse} onDelete={deleteSafehouse} />
        </div>
    )
}