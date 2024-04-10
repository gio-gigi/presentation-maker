import { AvailableFontWeights, AvailableFonts } from '../../constants/font';
import { SlideTextEntity, VisualizableSlideEntity } from '../../infrastructure/entities/presentation_preview_entity';

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

    private static extractSlideTitle(slide: string): SlideTextEntity | null{
        const pattern = /\/title\[(\d+),([a-zA-Z | \s]+)\]\((\s)*([\s\S]*?)(\s)*\)/gm;
        const result = slide.matchAll(pattern);
        let title: SlideTextEntity | undefined = undefined;
        for(const match of result){
            const isValidFontName = AvailableFonts.some((font) => font === match[2]);
            if (!isValidFontName) {
                continue;
            }
            const lines = match[4].split('\n');
            title = {
                lines: lines,
                fontSize: parseInt(match[1]),
                fontFamily: match[2],
                fontWeigth: 'bold'
            };
            return title;
        }
        return null;
    }

    private static extractSlideTexts(slide: string): SlideTextEntity[] {
        const pattern = /\/text\[(\d+),([a-zA-Z | \s]+),([a-z]+)\]\((\s)*([\s\S]*?)(\s)*\)/g;
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

    private static extractSlideContent(slide: string): SlideTextEntity[] {
        const title = this.extractSlideTitle(slide+'');
        const texts = this.extractSlideTexts(slide+'');
        return title ? [title, ...texts] : texts;
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