import { useState } from "react";
import { Slides } from "../utils/presentation/formatted_text_to_slides";
import { VisualizableSlideEntity } from "../infrastructure/entities/presentation_preview_entity";

export const usePresentationMaker = () => {
    const [slides, setSlides] = useState<VisualizableSlideEntity[]>([]);
    const onTextChange = (text: string) => {
        setSlides(Slides.formattedTextToSlides(text));
    }
    return {slides, onTextChange};
}