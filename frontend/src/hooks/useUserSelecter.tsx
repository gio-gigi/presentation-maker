import { useState } from "react"

export const useUserSelecter = () => {
    const [valuesIcon, setValues] = useState({
        adminIcon: false,
    });

    const handleClickChangeIcon = () => {
        setValues({
            ...valuesIcon,
            adminIcon: !valuesIcon.adminIcon,
        });
    };

    const handleMouseDownIconSelecter = (event: any) => {
        event.preventDefault();
    };

    return {valuesIcon, handleClickChangeIcon, handleMouseDownIconSelecter};
}