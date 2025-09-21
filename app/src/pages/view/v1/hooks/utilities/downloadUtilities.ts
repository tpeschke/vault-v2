import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function getWidthAndHeight(pdf: jsPDF): number[] {
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    return [width, height]
}

export async function getPageImage(page: string): Promise<string> {
    const pageHTML: any = document.getElementById(page);
    const canvasOne = await html2canvas(pageHTML, { scale: 2 })
    return canvasOne.toDataURL('image/jpeg');
}

export function getFileName(character: CharacterVersion1): string {
    const { name, ancestry, class: primaryClass, subclass } = character.pageOneInfo.generalInfo
    if (name) {
        return name
    } else {
        return `${ancestry} ${primaryClass}/${subclass}`
    }
}

export function getPregen(character: CharacterVersion1): CharacterVersion1 {
    const { pageOneInfo } = character
    const { leftColumnInfo } = pageOneInfo
    const { descriptions, convictions, relationships, flaws, reputation } = leftColumnInfo.characteristicInfo

    return {
        ...character,
        pageOneInfo: {
            ...pageOneInfo,
            generalInfo: {
                ...pageOneInfo.generalInfo,
                name: '',
            },
            leftColumnInfo: {
                ...leftColumnInfo,
                characteristicInfo: {
                    ...leftColumnInfo.characteristicInfo,
                    goals: [],
                    descriptions: descriptions.map(cleansePairObject),
                    convictions: convictions.map(cleansePairObject),
                    relationships: relationships.map(cleansePairObject),
                    flaws: flaws.map(cleansePairObject),
                    reputation: reputation.map(_ => cleansePairObject({ title: null, value: '' })),
                }
            }
        },
        pageTwoInfo: {
            ...character.pageTwoInfo
        },
        generalNotes: {
            ...character.generalNotes
        }
    }
}

function cleansePairObject({ id, value }: PairObject) {
    return { id, title: null, value }
}