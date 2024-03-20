import { useRegister } from "../../hooks/useRegister"
import './styles/style.css'
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { usePasswoordVisibility } from "../../hooks/usePasswordVisibility";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
    const {
        register, 
        onSubmit, 
        handleSubmit,
        errors,
    } = useRegister()

    const {
        values, 
        handleClickShowPassword, 
        handleMouseDownPassword
    } = usePasswoordVisibility()

    return (
        <div className="register-root">
            <div className="wrapper">
                <div className="title">
                    Registro
                </div>
                {errors.email && <div className='error-message'>{errors.email.message}</div>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <input type="email" {...register('email')} required placeholder=""/>
                        <label>Email</label>
                    </div>
                    <div className="field">
                        <input type="text" {...register('name')} required placeholder=""/>
                        <label>Nombre</label>
                    </div>
                    <div className="field">
                        <input type={
                                        values.showPassword
                                        ? "text"
                                        : "password"
                                    } 
                                     {...register('password')} required/>
                        <label>Contraseña</label>
                    </div>
                    <div className="password-box">
                        <div className="field">
                            <input type={
                                        values.showPassword
                                        ? "text"
                                        : "password"
                                    } 
                                {...register('password')} required/>
                            <label>Confirma la contraseña</label>
                        </div>
                        <IconButton className="pass-visibility-button"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {values.showPassword ? (
                                <Visibility />
                            ) : (
                                <VisibilityOff />
                            )}
                        </IconButton>
                    </div>
                    <div className="register-box">
                        <input type="submit" value="Crear cuenta"/>
                    </div>
                    <div className="signin-link">
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}