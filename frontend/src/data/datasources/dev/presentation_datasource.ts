import { PresentationDatasource } from "../../../infrastructure/datasources/presentation_datasource";
import { PresentationInfoEntity, PresentationToUploadEntity } from "../../../infrastructure/entities/presentation_entity";

export class PresentationDatasourceDev implements PresentationDatasource {
    uploadPresentation(presentation: PresentationToUploadEntity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async getPresentationList(page: number): Promise<PresentationInfoEntity[]> {
        return Promise.resolve(presentationList);
    }
}
const presentationList: PresentationInfoEntity[] = [
    {
        id: '1',
        title: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua',
        author: 'Author 1',
        createdAt: new Date('2021-01-01T00:00:00Z')
    },
    {
        id: '2',
        title: 'Presentation 2',
        author: 'Author 2',
        createdAt: new Date('2021-02-01T00:00:00Z')
    },
    {
        id: '3',
        title: 'Presentation 3',
        author: 'Author 3',
        createdAt: new Date('2021-03-01T00:00:00Z')
    },
    {
        id: '4',
        title: 'Presentation 1',
        author: 'Author 1',
        createdAt: new Date('2021-01-01T00:00:00Z')
    },
    {
        id: '5',
        title: 'Presentation 2',
        author: 'Author 2',
        createdAt: new Date('2021-02-01T00:00:00Z')
    },
    {
        id: '6',
        title: 'Presentation 3',
        author: 'Author 3',
        createdAt: new Date('2021-03-01T00:00:00Z')
    }
];