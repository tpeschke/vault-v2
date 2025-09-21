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