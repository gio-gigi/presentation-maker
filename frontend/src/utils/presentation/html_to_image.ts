import html2canvas from "html2canvas"

const canvasToBlob = (canvas: HTMLCanvasElement) => {
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error("Failed to convert canvas to blob"));
            }
        });
    });
}

export const html_to_image = async (html: HTMLElement) => {
    const canvas = await html2canvas(html);
    const blob = await canvasToBlob(canvas);
    if (blob) {
        return blob;
    }
    throw new Error("Failed to convert html to image");
}