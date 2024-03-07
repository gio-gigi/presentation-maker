
import { Slide } from '../slide/slide';
import './presentation_preview.css';
export const PresentationPreview = () => {
    return (
        <div className="ppw-container">
            <h2 className="title">Preview de la presentación</h2>
            <div className='slides-list'>
                <Slide/>
                <Slide/>
                <Slide/>
                <Slide/>
                <Slide/>
                <Slide/>
            </div>
        </div>
    );
}