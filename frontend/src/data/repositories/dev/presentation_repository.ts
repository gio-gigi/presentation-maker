import { PresentationDatasource } from "../../../infrastructure/datasources/presentation_datasource";
import { PresentationContentEntity } from "../../../infrastructure/entities/presentation_content";
import { PresentationInfoEntity, PresentationToUploadEntity } from "../../../infrastructure/entities/presentation_entity";
import { PresentationRepository } from "../../../infrastructure/repositories/presentation_repository";

export class PresentationRepositoryImpl implements PresentationRepository {
    constructor(
        private datasource: PresentationDatasource
    ){}
    async getPresentation(id: string): Promise<PresentationContentEntity> {
        return this.datasource.getPresentation(id);
    }
    async uploadPresentation(presentation: PresentationToUploadEntity): Promise<boolean> {
        return this.datasource.uploadPresentation(presentation);
    }
    async getPresentationList(page: number): Promise<PresentationInfoEntity[]> {
        return Promise.resolve(this.datasource.getPresentationList(page));
    }
}