import './CharacterRowsDisplay.css'
import { CharacterHomeInfo } from "@vault/common/interfaces/characterInterfaces"
import CharacterRow from './component/CharacterRow'
import { DeleteCharacterFunction } from '../../../../hooks/UsersCharactersHook'

interface Props {
    usersCharacters: CharacterHomeInfo[] | null,
    deleteCharacter: DeleteCharacterFunction
}

export default function CharacterRowsDisplay({ usersCharacters, deleteCharacter }: Props) {
    return (
        <div className="user-characters-shell">
            {usersCharacters?.map((character) => <CharacterRow character={character} deleteCharacter={deleteCharacter} key={character.id} />)}
        </div>
    )
}