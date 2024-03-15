import { useRef } from "react";

interface useArrowsControlProps {
  nextSlide: () => void;
  prevSlide: () => void;
}

export const useArrowsControl = ({
  nextSlide,
  prevSlide,
}: useArrowsControlProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const onKeyDown = (e: React.KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  };

  const requestFocus = () => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  };

  return { onKeyDown, elementRef, requestFocus };
};
