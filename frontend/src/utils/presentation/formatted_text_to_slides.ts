import { AvailableFontWeights, AvailableFonts } from '../../constants/font';
import { SlideTextEntity, VisualizableSlideEntity } from '../../infrastructure/entities/presentation_preview_entity';
import { PresentationMakerPage } from '../../pages/presentation_maker/presentation_maker_page';
export class Slides {
    private static extractSlides(formattedText: string): string[] {
        const pattern = /\/slide\{(\s)*([\s\S]*?)(\s)*\}/g;
        const result = formattedText.matchAll(pattern);
        let slides: string[] = [];
        for (const match of result) {
            slides.push(match[2]);
        }
        return slides;
    }

    private static extractSlideContent(slide: string): SlideTextEntity[] {
        const pattern = /\/text\[(\d+),([a-zA-Z]+),([a-z]+)\]\((\s)*([\s\S]*?)(\s)*\)/g;
        const result = slide.matchAll(pattern);
        let content: SlideTextEntity[] = [];
        for (const match of result) {
            const isValidFontName = AvailableFonts.some((font) => font === match[2]);
            const isValidFontWeight = AvailableFontWeights.some((font) => font === match[3]);
            if (!isValidFontName || !isValidFontWeight) {
                continue;
            }
            const lines = match[5].split('\n');
            content.push({
                lines: lines,
                fontSize: parseInt(match[1]),
                fontFamily: match[2],
                fontWeigth: match[3]
            });
        }
        return content;
    }

    public static formattedTextToSlides(formattedText: string): VisualizableSlideEntity[] {
        const slidesWithoutFormat = this.extractSlides(formattedText);
        let slides: VisualizableSlideEntity[] = [];
        slidesWithoutFormat.forEach((slide) => {
            const slideContent = this.extractSlideContent(slide);
            if (slideContent.length === 0) {
                return;
            }
            slides.push({
                content: this.extractSlideContent(slide)
            });
        });
        return slides;
    }
}