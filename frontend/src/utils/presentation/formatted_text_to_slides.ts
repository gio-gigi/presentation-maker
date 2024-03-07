import { PresentationMakerPage } from '../../pages/presentation_maker/presentation_maker_page';
const extractSlides = (formattedText: string): string[] => {
    const pattern = /\\slide\{(\s)*([\s\S]*?)(\s)*\}/g;
    const result = formattedText.matchAll(pattern);
    let slides: string[] = [];
    for (const match of result) {
        slides.push(match[2]);
    }
    return slides;
}


export const formattedTextToSlides = (formattedText: string): string[] => {
    return extractSlides(formattedText);
}