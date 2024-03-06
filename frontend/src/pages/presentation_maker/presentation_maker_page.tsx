import { PresentationEditor } from '../../components/presentation_editor/presentation_editor';
import { PresentationPreview } from '../../components/presentation_preview/presentation_preview';
export const PresentationMakerPage = () => {
    return (
        <div>
            <PresentationEditor />
            <PresentationPreview />
        </div>
    );
};