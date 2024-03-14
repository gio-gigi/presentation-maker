import { useState } from "react"

export const usePasswoordVisibility = () => {
    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return {values, handleClickShowPassword, handleMouseDownPassword};
}