import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
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