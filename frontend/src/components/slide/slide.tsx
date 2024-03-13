import { BasedOn, useAspectRatio } from "../../hooks/useAspectRatio";
import { useResponsiveFont } from "../../hooks/useResponsiveFont";
import { VisualizableSlideEntity } from "../../infrastructure/entities/presentation_preview_entity";
import "./slide.css";

interface SlideProps {
  slide: VisualizableSlideEntity;
  id: string;
}

export const Slide = ({ slide, id }: SlideProps) => {
  const { elementReference } = useAspectRatio({
    basedOn: BasedOn.HORIZONTAL,
    ratio: 2 / 3,
  });
  const { fontSize, parentRef } = useResponsiveFont();
  return (
    <div ref={elementReference} id={id} className="slide" style={{fontSize, gap: '7em'}}>
      {slide.content.map((text, index) => {
        const curFontSize = text.fontSize/10 * fontSize;
        return (
          <p
            ref={parentRef}
            key={"p" + index}
            className="slide-content"
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
    </div>
  );
};
