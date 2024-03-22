import { PresentationEditor } from '../../components/presentation_editor/presentation_editor';
import { PresentationPreview } from '../../components/presentation_preview/presentation_preview';
import './presentation_maker_page.css';
import { usePresentationMaker } from '../../hooks/usePresentationMaker';
import { useUploadPresentation } from '../../hooks/useUploadPresentation';
import { APIRequestStatusEnum } from '../../constants/api_request';
import { FullPageLoader } from '../../components/full_page_loader/full_page_loader';
import { HomePage } from '../home/home_page';
import { InfoModal } from '../../components/info_modal/info_modal';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/back_button/back_button';

export const PresentationMakerPage = () => {
    const {slides, onTextChange, content} = usePresentationMaker();
    const {status, uploadPresentation} = useUploadPresentation();
    const navigate = useNavigate();

    const handleUpload = () => {
        uploadPresentation(content);
    }

    if (status.status === APIRequestStatusEnum.SUCCESS) {
        navigate('/', {replace: true});
    }

    if (status.status === APIRequestStatusEnum.LOADING) {
        return (
            <FullPageLoader></FullPageLoader>
        );
    }
    console.log('render');

    return (
        <div className='pm-page'>
            <BackButton />
            {
                status.status === APIRequestStatusEnum.ERROR && <InfoModal message='Error al subir la presentación, intentalo más tarde' />
            }
            <PresentationEditor onTextChange={onTextChange} />
            <PresentationPreview slides={slides}/>
            {
                slides.length > 0 && <button className='upload-button' onClick={handleUpload}>Subir Presentacion</button>
            }
        </div>
    );
};