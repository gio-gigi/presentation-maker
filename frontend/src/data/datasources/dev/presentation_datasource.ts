import { set } from "react-hook-form";
import { PresentationDatasource } from "../../../infrastructure/datasources/presentation_datasource";
import { PresentationInfoEntity, PresentationToUploadEntity } from "../../../infrastructure/entities/presentation_entity";
import { formatted_text_to_file } from "../../../utils/presentation/formatted_text_to_file";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class PresentationDatasourceDev implements PresentationDatasource {
    async uploadPresentation(presentation: PresentationToUploadEntity): Promise<boolean> {
        //blob to .txt file to auto-download
        const file = formatted_text_to_file(presentation.file);
        const blob = new Blob([file], { type: 'text/plain' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'presentation.txt';
        a.click();
        URL.revokeObjectURL(url);

        //blob to image to auto-download
        const urlImage = URL.createObjectURL(presentation.image);
        const aImage = document.createElement('a');
        aImage.href = urlImage;
        aImage.download = 'presentation.png';
        aImage.click();
        URL.revokeObjectURL(urlImage);

        await delay(1000);

        return Promise.resolve(false);
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
    },
    {
        id: '7',
        title: 'Presentation 1',
        author: 'Author 1',
        createdAt: new Date('2021-01-01T00:00:00Z')
    },
    {
        id: '8',
        title: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua',
        author: 'Author 1',
        createdAt: new Date('2021-01-01T00:00:00Z')
    },
    {
        id: '9',
        title: 'Presentation 2',
        author: 'Author 2',
        createdAt: new Date('2021-02-01T00:00:00Z')
    },
    {
        id: '10',
        title: 'Presentation 3',
        author: 'Author 3',
        createdAt: new Date('2021-03-01T00:00:00Z')
    },
    {
        id: '11',
        title: 'Presentation 1',
        author: 'Author 1',
        createdAt: new Date('2021-01-01T00:00:00Z')
    },
    {
        id: '12',
        title: 'Presentation 2',
        author: 'Author 2',
        createdAt: new Date('2021-02-01T00:00:00Z')
    },
    {
        id: '13',
        title: 'Presentation 3',
        author: 'Author 3',
        createdAt: new Date('2021-03-01T00:00:00Z')
    },
    {
        id: '14',
        title: 'Presentation 1',
        author: 'Author 1',
        createdAt: new Date('2021-01-01T00:00:00Z')
    },
];