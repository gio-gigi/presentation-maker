import { Presentation } from '../../infrastructure/entities/presentation_entity';
import placeholderImage from '../../assets/image_placeholder.jpg';
import './presentation_tile.css';

interface PresentationTileProps {
    presentation: Presentation;
}

export const PresentationTile = ({presentation}: PresentationTileProps) => {
    return (
        <div key={presentation.id} className='tile'>
            <div className="sub-tile">
                <div className="image-container">
                <img className ='placeholder_img' src={presentation.imageUrl ?? placeholderImage}/>
                </div>
                <div className="text-container">
                    <h3 className='presentation-title'>{presentation.title}</h3>
                    <p className='author-name'>{presentation.author}</p>
                </div>
            </div>
        </div>
    );
}