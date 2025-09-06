import './CharacterRowsDisplay.css'
import { CharacterHomeInfo } from "@vault/common/interfaces/characterInterfaces"
import { useNavigate } from "react-router-dom"
import CharacterRow from './component/CharacterRow'

interface Props {
    usersCharacters: CharacterHomeInfo[] | null
}

export default function CharacterRowsDisplay({ usersCharacters }: Props) {
    return (
        <div className="user-characters-shell">
            {usersCharacters?.map((character, index) => <CharacterRow character={character} key={index} />)}
        </div>
    )
}