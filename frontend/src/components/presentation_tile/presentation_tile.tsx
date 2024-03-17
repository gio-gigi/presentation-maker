import { PresentationInfoEntity } from '../../infrastructure/entities/presentation_entity';
import placeholderImage from '../../assets/image_placeholder.jpg';
import './presentation_tile.css';
import { useNavigate } from 'react-router-dom';

interface PresentationTileProps {
    presentation: PresentationInfoEntity;
}

export const PresentationTile = ({presentation}: PresentationTileProps) => {
    const navigate = useNavigate();
    const handleClicked = () => {
        navigate(`/presentation/${presentation.id}`);
    }
    return (
        <div key={presentation.id} className='tile' onClick={handleClicked}>
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