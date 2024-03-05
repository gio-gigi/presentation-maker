import { Presentation } from '../infrastructure/entities/presentation_entity';
import placeholderImage from '../../assets/image_placeholder.jpg';

interface PresentationTileProps {
    presentation: Presentation;
}

export const PresentationTile = ({presentation}: PresentationTileProps) => {
    return (
        <div key={presentation.id}>
            <h1>{presentation.title}</h1>
            <p>{presentation.description}</p>
            <img style={{width: '100px', height: '100px'}} src={presentation.imageUrl ?? placeholderImage}/>
        </div>
    );
}