export interface VisualizablePresentationEntity {
    slides: VisualizableSlideEntity[];
}

export interface VisualizableSlideEntity {
    content: SlideTextEntity[];
}

export interface SlideTextEntity {
    lines: string[];
    fontSize: number;
    fontFamily: string;
    fontWeigth: string;
}

export interface SlideV2Entity {
    content: string;
}