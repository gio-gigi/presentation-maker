import { PresentationInfoEntity, PresentationToUploadEntity } from "../entities/presentation_entity";

export interface PresentationDatasource {
    getPresentationList(page: number): Promise<PresentationInfoEntity[]>;
    uploadPresentation(presentation: PresentationToUploadEntity): Promise<boolean>;
}
