import { useState } from "react";
import { Slides } from "../utils/presentation/formatted_text_to_slides";
import { VisualizableSlideEntity } from "../infrastructure/entities/presentation_preview_entity";

export const usePresentationMaker = () => {
    const [slides, setSlides] = useState<VisualizableSlideEntity[]>([]);
    const [content, setContent] = useState<string>('');
    const onTextChange = (text: string) => {
        setSlides(Slides.formattedTextToSlides(text));
        setContent(text);
    }
    return {slides, onTextChange, content};
}