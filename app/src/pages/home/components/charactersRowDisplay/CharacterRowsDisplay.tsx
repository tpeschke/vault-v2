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
        <>
            {usersCharacters && usersCharacters?.length > 0 ? (
                <div className="user-characters-shell">
                    {usersCharacters?.map((character) => <CharacterRow character={character} deleteCharacter={deleteCharacter} key={character.id} />)}
                </div>
            ) : (
                <div className='no-characters-shell'>
                    <h2>You Have No Characters</h2>
                    <p>Currently, the ability to add new characters is paused until BonfireNext is fully supported.</p>
                </div>
            )}
        </>
    )
}