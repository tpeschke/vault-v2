import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { viewURL } from "../../../../frontend-config";
import jsPDF from "jspdf";
import { getFileName, getPageImage, getPregen, getWidthAndHeight } from "./utilities/downloadUtilities";
import { delay } from '@vault/common/utilities/timingFunctions'
import PageThree from "../components/pageThree/PageThree";

interface CharacterHookReturn {
    character: CharacterVersion1 | null,
    downloadCharacter: DownloadCharacterFunction,
    isDownloading: boolean
}

export type DownloadCharacterFunction = (isPregen: boolean) => void

export default function CharacterHook(pathname: string): CharacterHookReturn {
    const [character, setCharacter] = useState<CharacterVersion1 | null>(null)

    useEffect(() => {
        const [_, baseURL, characterID] = pathname.split('/')
        axios.get(viewURL + characterID).then(({ data }) => {
            setCharacter(data)
        })
    }, [pathname])

    const [isDownloading, setIsDownloading] = useState(false)
    const [oldCharacter, setOldCharacter] = useState<CharacterVersion1 | null>(null)

    useEffect(() => {
        if (isDownloading) {
            const pdf = new jsPDF("p", "mm", "letter");
            const widthAndHeight = getWidthAndHeight(pdf)

            if (character) {
                let promiseArray: any[] = []

                promiseArray.push(getPageImage('page-one'))
                promiseArray.push(getPageImage('page-two'))

                if (!character?.generalNotes.isSecret || character.userInfo.ownsThisCharacter) {
                    promiseArray.push(getPageImage('page-three'))
                }

                Promise.all(promiseArray).then(pages => {
                    pdf.addImage(pages[0], 'jpeg', 0, 0, widthAndHeight[0], widthAndHeight[1] - 5);

                    pdf.addPage(widthAndHeight);
                    pdf.addImage(pages[1], 'jpeg', 0, 0, widthAndHeight[0], widthAndHeight[1] - 5);

                    if (pages[2]) {
                        pdf.addPage(widthAndHeight);
                        pdf.addImage(pages[2], 'jpeg', 0, 0, widthAndHeight[0], widthAndHeight[1] - 5);
                    }

                    const fileName = getFileName(character)

                    pdf.save(`${fileName}.pdf`)

                    if (oldCharacter) {
                        setCharacter(oldCharacter)
                    }

                    setIsDownloading(false)
                })
            }
        }
    }, [isDownloading])

    async function downloadCharacter(isPregen: boolean): Promise<void> {
        if (character) {
            let oldCharacter: CharacterVersion1 | null = null
            if (isPregen) {
                oldCharacter = { ...character }
                setOldCharacter(oldCharacter)
                setCharacter(getPregen(character))
            }

            setIsDownloading(true)
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }

    return {
        character,
        downloadCharacter,
        isDownloading
    }
}