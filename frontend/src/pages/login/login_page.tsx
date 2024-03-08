import { useLogin } from '../../hooks/useLogin'
import './styles/style.css'

export const LoginPage = () => {
    const {register, onSubmit, handleSubmit} = useLogin()

    return (
        <div className="login-root">
            <div className="wrapper">
                <div className="title">
                    Inicia sesión
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <input type="email" {...register('email')} required placeholder=""/>
                        <label>Email</label>
                    </div>
                    <div className="field">
                        <input type="password" {...register('password')} required/>
                        <label>Contraseña</label>
                    </div>
                    <div className="login-box">
                        <input type="submit" value="Login"/>
                    </div>
                    <div className="signup-link">
                        ¿No tienes cuenta? <a href="#">Regístrate</a>
                    </div>
                </form>
            </div>
        </div>
    )
}