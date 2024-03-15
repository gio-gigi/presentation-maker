import { useEffect, useState } from "react";

interface useDragControlProps {
  nextSlide: () => void;
  prevSlide: () => void;
}

export const useDragControl = ({nextSlide, prevSlide}: useDragControlProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTranslateX(e.clientX - startX);
    }
  };

  const onMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (translateX > 100) {
        console.log("prev slide");
        prevSlide();
      } else if (translateX < -100) {
        console.log("next slide");
        nextSlide();
      }
    }
  };

  return { onMouseDown, onMouseMove, onMouseUp };
};
