import axios from 'axios';
import { PresentationDatasource } from '../../../infrastructure/datasources/presentation_datasource';
import { PresentationContentEntity } from '../../../infrastructure/entities/presentation_content';
import { PresentationInfoEntity, PresentationToUploadEntity } from '../../../infrastructure/entities/presentation_entity';
import { PresentationInfoModel } from '../../models/prod/presentation_info_model';
import { presentationEntityfromPresentationModel } from '../../utils/presentation';

const API_URL = 'http://localhost:3001/';

export class PresentationDatasourceProd implements PresentationDatasource {
    async getPresentationList(page: number): Promise<PresentationInfoEntity[]> {
        const {data, status} = await axios.get<{presentations: PresentationInfoModel[]}>(API_URL + 'api/presentation');
        const presentations = data.presentations.map(presentationEntityfromPresentationModel);
        return presentations;
    }
    async uploadPresentation(presentation: PresentationToUploadEntity): Promise<boolean> {
        const form = new FormData();
        const image = new File([presentation.image], 'test.jpg', { type: presentation.image.type });
        form.append('img', image);
        form.append('title', presentation.title ?? 'Titulo por defecto');
        form.append('content', presentation.file);
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        const {status} = await axios.post(API_URL + 'api/presentation', form, {headers});
        console.log(status);
        return status === 201;
    }
    getPresentation(id: string): Promise<PresentationContentEntity> {
        throw new Error('Method not implemented.');
    }

}