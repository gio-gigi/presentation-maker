import { SubmitHandler, useForm } from "react-hook-form";
import './styles/style.css'

interface FormValues {
    email : string
    password : string
};

export const LoginPage = () => {
    const {register, handleSubmit} = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    return (
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
    )
}