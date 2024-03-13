import { PresentationDatasourceDev } from "../data/datasources/dev/presentation_datasource";
import { PresentationRepositoryImpl } from "../data/repositories/dev/presentation_repository";

const presentationDatasource = new PresentationDatasourceDev();
export const presentationRepository = new PresentationRepositoryImpl(presentationDatasource);