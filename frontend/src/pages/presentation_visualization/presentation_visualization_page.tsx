import { useParams } from "react-router-dom";
import { usePresentationVisualization } from "../../hooks/usePresentationVisualization";
import { APIRequestStatusEnum } from "../../constants/api_request";
import { FullPageLoader } from "../../components/full_page_loader/full_page_loader";
import { Slide } from "../../components/slide/slide";
import "./presentation_visualization_page.css";
import { BasedOn } from "../../hooks/useAspectRatio";
import { AspectRatioEnum } from "../../constants/aspect_ratio";
import { useFullScreen } from "../../hooks/useFullScreen";
import { useDragControl } from "../../hooks/useDragControl";
import { useArrowsControl } from "../../hooks/useArrowsControl";

export const PresentationVisualizationPage = () => {
  const { id } = useParams();
  const { status, nextSlide, currentSlide, prevSlide } =
    usePresentationVisualization({
      id,
    });
  const { isFullScreen, toggleFullScreen } = useFullScreen();
  const { onMouseDown, onMouseMove, onMouseUp } = useDragControl({
    prevSlide,
    nextSlide,
  });
  const { onKeyDown, requestFocus, elementRef } = useArrowsControl({ nextSlide, prevSlide });

  if (
    status.status === APIRequestStatusEnum.LOADING ||
    currentSlide === undefined
  ) {
    return <FullPageLoader />;
  }

  const handleFullscreenRequest = () => {
    toggleFullScreen();
    requestFocus();
  }

  return (
    <div className="page" ref={elementRef} tabIndex={0} onKeyDown={onKeyDown}>
      {!isFullScreen && (
        <button onClick={handleFullscreenRequest} className="fullscreen-btn">
          Pantalla Completa
        </button>
      )}
      <div
        className="presentation-container"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <Slide
          slide={currentSlide}
          id="current-slide"
          aspectRatio={{
            basedOn:
              BasedOn.HEIGTH,
            ratio:
              AspectRatioEnum.SIXTEEN_NINE
          }}
        />
      </div>
    </div>
  );
};
