import { useEffect, useRef } from "react"
import { JsxElement } from "typescript";

export enum BasedOn {
    WIDTH,
    HEIGTH
}

export interface AspectRatio {
    basedOn: BasedOn;
    ratio: number;
}

export const useAspectRatio = ({basedOn, ratio}: AspectRatio) => {
    const elementReference = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const resize = () => {
            if (elementReference.current) {
                if (basedOn === BasedOn.WIDTH) {
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
    useEffect(() => {
        if (elementReference.current){
            if (basedOn === BasedOn.WIDTH) {
                elementReference.current.style.width = '100%';
                elementReference.current.style.maxWidth = '100%';
            } else {
                elementReference.current.style.height = '100%';
                elementReference.current.style.maxHeight = '100%';
            }
        }
    }, [elementReference.current]);
    return {elementReference};
}