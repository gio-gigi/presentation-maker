import { PresentationEditor } from '../../components/presentation_editor/presentation_editor';
import { PresentationPreview } from '../../components/presentation_preview/presentation_preview';
import './presentation_maker_page.css';

export const PresentationMakerPage = () => {
    return (
        <div className='pm-page'>
            <PresentationEditor />
            <PresentationPreview />
        </div>
    );
};