import { useRegister } from "../../hooks/useRegister"
import './styles/style.css';
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePasswoordVisibility } from "../../hooks/usePasswordVisibility";
import { Link } from 'react-router-dom'

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <input type="text" {...register('email')} placeholder=""/>
                        <label>Email</label>
                    </div>
                    {errors.email && <div className='error-message'>{errors.email.message}</div>}
                    <div className="field">
                        <input type="text" {...register('name')} placeholder=""/>
                        <label>Nombre</label>
                    </div>
                    {errors.name && <div className='error-message'>{errors.name.message}</div>}
                    <div className="field">
                        <input type={
                                        values.showPassword
                                        ? "text"
                                        : "password"
                                    } 
                                     {...register('password')}
                                     placeholder=""/>
                        <label>Contraseña</label>
                    </div>
                    {errors.password && <div className='error-message'>{errors.password.message}</div>}
                    <div className="password-box">
                        <div className="field">
                            <input type={
                                        values.showPassword
                                        ? "text"
                                        : "password"
                                    } 
                                {...register('confirmPassword')}
                                placeholder=""/>
                            <label>Confirma la contraseña</label>
                        </div>
                        <FontAwesomeIcon className="pass-visibility-button"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            icon={values.showPassword ? faEye : faEyeSlash}
                        />
                    </div>
                    {errors.confirmPassword && <div className='error-message'>{errors.confirmPassword.message}</div>}
                    <div className="register-box">
                        <input type="submit" value="Crear cuenta"/>
                    </div>
                    <div className="signin-link">
                        ¿Ya tienes cuenta? <Link to={'/login'}>Inicia sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}