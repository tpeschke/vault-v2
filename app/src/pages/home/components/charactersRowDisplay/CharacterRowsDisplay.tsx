import './CharacterRowsDisplay.css'
import { CharacterHomeInfo } from "@vault/common/interfaces/characterInterfaces"
import CharacterRow from './component/CharacterRow'
import { DeleteCharacterFunction } from '../../../../hooks/UsersCharactersHook'

interface Props {
    usersCharacters: CharacterHomeInfo[] | null,
    deleteCharacter: DeleteCharacterFunction,
    viewRoute?: 'v' | 'view'
}

export default function CharacterRowsDisplay({ usersCharacters, deleteCharacter, viewRoute = 'v' }: Props) {
    return (
        <>
            {usersCharacters && usersCharacters?.length > 0 ? (
                <div className="user-characters-shell">
                    {usersCharacters?.map((character) => <CharacterRow character={character} deleteCharacter={deleteCharacter} key={character.id} viewRoute={viewRoute}/>)}
                </div>
            ) : (
                <div className='no-characters-shell'>
                    <h2>You Have No Characters</h2>
                </div>
            )}
        </>
    )
}