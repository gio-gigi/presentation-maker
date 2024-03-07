import { PresentationDatasource } from "../../../infrastructure/datasources/presentation_datasource";
import { PresentationInfoEntity } from "../../../infrastructure/entities/presentation_entity";
import { PresentationRepository } from "../../../infrastructure/repositories/presentation_repository";

export class PresentationRepositoryDev implements PresentationRepository {
    constructor(
        private datasource: PresentationDatasource
    ){}
    async getPresentationList(page: number): Promise<PresentationInfoEntity[]> {
        return Promise.resolve(this.datasource.getPresentationList(page));
    }
}