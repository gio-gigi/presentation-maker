
import { VisualizableSlideEntity } from '../../infrastructure/entities/presentation_preview_entity';
import { Slide } from '../slide/slide';
import './presentation_preview.css';
interface PresentationPreviewProps {
    slides: VisualizableSlideEntity[];
}
export const PresentationPreview = ({slides}: PresentationPreviewProps) => {
    return (
        <div className="ppw-container">
            <h2 className="title">Preview de la presentación</h2>
            <div className='slides-list'>
                {
                    slides.map((slide, index) => {
                        return <Slide key={`slide-${index}`} id = {`slide-${index}`} slide={slide}/>
                    })
                }
            </div>
        </div>
    );
}