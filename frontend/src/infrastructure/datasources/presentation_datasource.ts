import { PresentationInfoEntity } from "../entities/presentation_entity";

export interface PresentationDatasource {
    getPresentationList(page: number): Promise<PresentationInfoEntity[]>;
}
