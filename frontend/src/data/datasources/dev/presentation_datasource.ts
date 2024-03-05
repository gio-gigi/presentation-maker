import { PresentationDatasource } from "../../../infrastructure/datasources/presentation_datasource";
import { Presentation } from "../../../infrastructure/entities/presentation_entity";

export class PresentationDatasourceDev implements PresentationDatasource {
    async getPresentationList(page: number): Promise<Presentation[]> {
        return Promise.resolve(presentationList);
    }
}
const presentationList: Presentation[] = [
    {
        id: '1',
        title: 'Presentation 1',
        description: 'Description 1',
        author: 'Author 1',
        createdAt: new Date('2021-01-01T00:00:00Z')
    },
    {
        id: '2',
        title: 'Presentation 2',
        description: 'Description 2',
        author: 'Author 2',
        createdAt: new Date('2021-02-01T00:00:00Z')
    },
    {
        id: '3',
        title: 'Presentation 3',
        description: 'Description 3',
        author: 'Author 3',
        createdAt: new Date('2021-03-01T00:00:00Z')
    }
];