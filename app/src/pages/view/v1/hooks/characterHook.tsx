import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { viewURL } from "../../../../frontend-config";
import jsPDF from "jspdf";
import { getPageImage, getWidthAndHeight } from "./utilities/downloadUtilities";

interface CharacterHookReturn {
    character: CharacterVersion1 | null,
    downloadCharacter: () => void,
    isDownloading: boolean
}

export default function CharacterHook(pathname: string): CharacterHookReturn {
    const [character, setCharacter] = useState<CharacterVersion1 | null>(null)

    useEffect(() => {
        const [_, baseURL, characterID] = pathname.split('/')
        axios.get(viewURL + characterID).then(({ data }) => {
            setCharacter(data)
        })
    }, [pathname])

    const [isDownloading, setIsDownloading] = useState(false)

    async function downloadCharacter(): Promise<void> {
        if (character) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            setIsDownloading(true)

            const pdf = new jsPDF("p", "mm", "letter");
            const widthAndHeight = getWidthAndHeight(pdf)

            const pageOne = await getPageImage('page-one')
            pdf.addImage(pageOne, 'jpeg', 0, 0, widthAndHeight[0], widthAndHeight[1] - 5);

            pdf.addPage(widthAndHeight);
            const pageTwo = await getPageImage('page-two')
            pdf.addImage(pageTwo, 'jpeg', 0, 0, widthAndHeight[0], widthAndHeight[1] - 5);

            if (!character.generalNotes.isSecret || character.userInfo.ownsThisCharacter) {
                pdf.addPage(widthAndHeight);
                const pageThree = await getPageImage('page-three')
                pdf.addImage(pageThree, 'jpeg', 0, 0, widthAndHeight[0], widthAndHeight[1] - 5);
            }

            let fileName;
            const { name, ancestry, class: primaryClass, subclass } = character.pageOneInfo.generalInfo
            if (name) {
                fileName = name
            } else {
                fileName = `${ancestry} ${primaryClass}/${subclass}`
            }
            pdf.save(`${fileName}.pdf`);
            
            setIsDownloading(false)
        }
    }

    return {
        character,
        downloadCharacter,
        isDownloading
    }
}