import { AspectRatio, BasedOn, useAspectRatio } from "../../hooks/useAspectRatio";
import { useResponsiveFont } from "../../hooks/useResponsiveFont";
import { VisualizableSlideEntity } from "../../infrastructure/entities/presentation_preview_entity";
import "./slide.css";

interface SlideProps {
  slide: VisualizableSlideEntity;
  id: string;
  aspectRatio: AspectRatio;
  slideNumber: number;
}

export const Slide = ({ slide, id, aspectRatio, slideNumber }: SlideProps) => {
  const { elementReference } = useAspectRatio(aspectRatio);
  const { fontSize, parentRef } = useResponsiveFont();
  return (
    <div ref={elementReference} id={id} className="slide" style={{fontSize, gap: '7em'}}>
      {slide.content.map((text, index) => {
        const curFontSize = text.fontSize/10 * fontSize;
        return (
          <p
            ref={parentRef}
            key={"p" + index}
            className="slide-content no-seleccionable"
            style={{
              fontFamily: text.fontFamily,
              fontWeight: text.fontWeigth,
              fontSize: `${curFontSize}px`,
            }}
          >
            {text.lines.map((line, index) => (
              <span key={"span" + index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        );
      })}
      <p className="slide-number" style={{fontSize: fontSize * 2}}>{slideNumber}</p>
    </div>
  );
};
