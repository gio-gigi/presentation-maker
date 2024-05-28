import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import './styles/style.css'
import { useState } from 'react';
import { faWindowClose, faCircleExclamation, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePasswoordVisibility } from '../../hooks/usePasswordVisibility';

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register, 
        onSubmit, 
        handleSubmit,
        errors,
        clearErrors,
    } = useLogin(setIsLoading);

    const {
        values,
        handleClickShowPassword,
        handleMouseDownPassword,
      } = usePasswoordVisibility();

    return (
        <div className="login-root">
            {errors.root?.serverError.type===500 && 
                <div className="server-error-window">
                <div className="window-error-header">
                    <div className="window-title">
                    Error
                    </div>
                    <FontAwesomeIcon
                    icon={faWindowClose} 
                    className="window-close-button"
                    onClick={() => {clearErrors("root.serverError")}}
                    />
                </div>
                <div className="window-error-body">
                    <FontAwesomeIcon icon={faCircleExclamation} className="circle-exclamation-icon"/>
                    {errors.root?.serverError.message}
                </div>
                </div>
            }

            {isLoading && <div className="loading_spinner"/>}
            <div className="login-wrapper">
                <div className="title">
                    Inicia sesión
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <input type="email" {...register('email')} required placeholder=""/>
                        <label>Email</label>
                    </div>
                    <div className="field">
                        <input 
                            type={
                                values.showPassword
                                ? "text"
                                : "password"
                            }
                            {...register('password')}
                            placeholder=""  
                        />
                        <label>Contraseña</label>
                        <FontAwesomeIcon className="pass-visibility-button"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            icon={values.showPassword ? faEye : faEyeSlash}
                        />
                    </div>
                    {errors.root?.serverError.type===401 && 
                        <p className='login_error'>{errors.root?.serverError.message}</p>
                    }
                    <div className="login-box">
                        <input type="submit" value="Login"/>
                    </div>
                    <div className="signup-link">
                        ¿No tienes cuenta? <Link to={'/register'}>Regístrate</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}