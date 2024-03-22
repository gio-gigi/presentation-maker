import axios from 'axios';
import { PresentationDatasource } from '../../../infrastructure/datasources/presentation_datasource';
import { PresentationContentEntity } from '../../../infrastructure/entities/presentation_content';
import { PresentationInfoEntity, PresentationToUploadEntity } from '../../../infrastructure/entities/presentation_entity';
import { PresentationInfoModel } from '../../models/prod/presentation_info_model';
import { presentationContentEntityFromPresentationContentModel, presentationInfoEntityfromPresentationInfoModel } from '../../utils/presentation';
import { PresentationContentModel } from '../../models/prod/presentation_content_model';
import UnauthorizedError from '../../../errors/UnautherizedError';

const API_URL = 'http://localhost:3001/';

export class PresentationDatasourceProd implements PresentationDatasource {
    async getPresentationList(page: number): Promise<PresentationInfoEntity[]> {
        const {data, status} = await axios.get<{presentations: PresentationInfoModel[]}>(API_URL + 'api/presentation');
        
        console.log(data);
        const presentations = data.presentations.map(presentationInfoEntityfromPresentationInfoModel);
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
        if (status === 401) {
            throw new UnauthorizedError({code: 401, message: 'Unauthorized'});
        }
        return status === 201;
    }
    async getPresentation(id: string): Promise<PresentationContentEntity> {
        const { status, data } = await axios.get<{presentation: PresentationContentModel}>(API_URL + 'api/presentation/' + id);
        console.log(data);
        if (status !== 200) {
            throw new Error('Error fetching presentation');
        }
        return presentationContentEntityFromPresentationContentModel(data.presentation);
    }

}