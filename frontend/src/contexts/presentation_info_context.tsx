import { PresentationDatasourceDev } from "../data/datasources/dev/presentation_datasource";
import { PresentationRepositoryImpl } from "../data/repositories/dev/presentation_repository";
import { PresentationDatasourceProd } from '../data/datasources/prod/presentation_datasource_prod';

const presentationDatasource = new PresentationDatasourceProd();
export const presentationRepository = new PresentationRepositoryImpl(presentationDatasource);