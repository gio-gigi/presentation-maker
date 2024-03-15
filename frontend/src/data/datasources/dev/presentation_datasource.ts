import { set } from "react-hook-form";
import { PresentationDatasource } from "../../../infrastructure/datasources/presentation_datasource";
import { PresentationInfoEntity, PresentationToUploadEntity } from "../../../infrastructure/entities/presentation_entity";
import { formatted_text_to_file } from "../../../utils/presentation/formatted_text_to_file";
import { PresentationContentEntity } from "../../../infrastructure/entities/presentation_content";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class PresentationDatasourceDev implements PresentationDatasource {
    async getPresentation(id: string): Promise<PresentationContentEntity> {
        //text to blob
        const type = 'text/plain';
        const blob = new Blob([presentationContent], { type });
        return Promise.resolve({
            content: blob,
            contentType: type
        });
    }
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

const presentationContent = `
/slide{
    /text[60,Arial,bold](
        La Guerra Fría
    )
    /text[40,Arial,normal](
        Un conflicto político e ideológico que dominó las relaciones internacionales después de la Segunda Guerra Mundial.
    )
    }
    
    /slide{
    /text[60,Arial,bold](
        Antecedentes
    )
    /text[40,Arial,normal](
        - Fin de la Segunda Guerra Mundial.
        - Ruptura ideológica entre el bloque capitalista liderado por EE. UU. y el bloque comunista liderado por la URSS.
        - División de Alemania y Berlín.
    )
    }
    
    /slide{
    /text[60,Arial,bold](
        Cortina de Hierro
    )
    /text[40,Arial,normal](
        - Término que simboliza la división ideológica y política en Europa.
        - Discurso de Winston Churchill en 1946.
    )
    }
    
    /slide{
    /text[60,Arial,bold](
        Carrera Armamentista
    )
    /text[40,Arial,normal](
        - Competencia intensa entre EE. UU. y la URSS en la producción de armas nucleares.
        - Concepto de Mutually Assured Destruction (MAD).
    )
    }
    
    /slide{
    /text[60,Arial,bold](
        Guerra de Corea (1950-1953)
    )
    /text[40,Arial,normal](
        - Conflicto entre Corea del Norte (comunista) y Corea del Sur (capitalista).
        - Intervención de EE. UU. y la URSS.
    )
    }    
`;