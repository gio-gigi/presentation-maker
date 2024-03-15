import { useEffect, useState } from "react";

export const useFullScreen = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const toggleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };
    useEffect(() => {
        document.onfullscreenchange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
        return () => {
            document.onfullscreenchange = null;
        };
    }, []);
    return { isFullScreen, toggleFullScreen };
}