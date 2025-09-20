import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { viewURL } from "../../../../frontend-config";

interface CharacterHookReturn {
    character: CharacterVersion1 | null
}

export default function CharacterHook(pathname: string): CharacterHookReturn {
    const [character, setCharacter] = useState<CharacterVersion1 | null>(null)

    useEffect(() => {
        const [_, baseURL, characterID] = pathname.split('/')
        axios.get(viewURL + characterID).then(({data}) => {
            console.log(data)
        })
    }, [pathname])

    return {
        character
    }
}