import { BasedOn, useAspectRatio } from '../../hooks/useAspectRatio';
import './slide.css';

export const Slide = () => {
    const { elementReference } = useAspectRatio({basedOn: BasedOn.HORIZONTAL, ratio: 2/3});
    return <div ref={elementReference} className="slide">

    </div>
}