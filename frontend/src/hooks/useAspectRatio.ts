import { useEffect, useRef } from "react"
import { JsxElement } from "typescript";

export enum BasedOn {
    HORIZONTAL,
    VERTICAL
}

interface useAspectRatioProps {
    basedOn: BasedOn;
    ratio: number;
}

export const useAspectRatio = ({basedOn, ratio}: useAspectRatioProps) => {
    const elementReference = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const resize = () => {
            if (elementReference.current) {
                if (basedOn === BasedOn.HORIZONTAL) {
                    elementReference.current.style.minHeight = `${elementReference.current.offsetWidth * ratio}px`;
                    elementReference.current.style.maxHeight = `${elementReference.current.offsetWidth * ratio}px`;
                } else {
                    elementReference.current.style.minWidth = `${elementReference.current.offsetHeight * ratio}px`;
                    elementReference.current.style.maxWidth = `${elementReference.current.offsetHeight * ratio}px`;
                }
            }
        }
        window.addEventListener('resize', resize);
        resize();
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, []);
    return {elementReference};
}