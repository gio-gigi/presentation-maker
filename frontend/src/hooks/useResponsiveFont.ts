import { useEffect, useRef, useState } from "react";

export const useResponsiveFont = () => {
    const [fontSize, setFontSize] = useState(16);
    const parentRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        const handleResize = () => {
            if (parentRef.current) {
                const parentWidth = parentRef.current.offsetWidth;
                setFontSize(parentWidth / 100);
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return {fontSize, parentRef};
}