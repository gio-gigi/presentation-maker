import { Presentation } from "../entities/presentation_entity";

export interface PresentationRepository {
    getPresentationList(page: number): Promise<Presentation[]>;
}