import { PresentationInfoEntity, PresentationToUploadEntity } from "../entities/presentation_entity";

export interface PresentationRepository {
    getPresentationList(page: number): Promise<PresentationInfoEntity[]>;
    uploadPresentation(presentation: PresentationToUploadEntity): Promise<boolean>;
}