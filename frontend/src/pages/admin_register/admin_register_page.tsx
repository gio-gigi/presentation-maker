import { BackButton } from "../../components/back_button/back_button";
import './styles/style.css';
import { useAdminRegister } from "../../hooks/useAdminRegister";
import './styles/style.css';
import { faEyeSlash, faEye , faUser, faUserTie} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePasswoordVisibility } from "../../hooks/usePasswordVisibility";
import { useUserSelecter } from "../../hooks/useUserSelecter";
import { UserRole } from "../../constants/roles";

export const AdminRegisterPage = () => {
    const {
        register, 
        onSubmit, 
        handleSubmit,
        errors,
    } = useAdminRegister()

    const {
        values, 
        handleClickShowPassword, 
        handleMouseDownPassword
    } = usePasswoordVisibility()

    const {
        valuesIcon,
        handleClickChangeIcon,
        handleMouseDownIconSelecter,
    } = useUserSelecter()

    return (
        <div className="admin-register-root">
            <div className="admin-register-nav-bar">
                <BackButton/>
                <div className="admin-register-title">Registro de usuarios</div>
            </div>
            <div className="admin-register-conteiner">
                <div className="admin-register-form-conteiner">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="admin-register-form-user-selector-container">
                            <FontAwesomeIcon className="admin-register-user-selector-icon"
                                onClick={handleClickChangeIcon}
                                onMouseDown={handleMouseDownIconSelecter}
                                icon={valuesIcon.adminIcon ? faUserTie : faUser}
                            />
                            <div className="admin-register-user-selector-label">{valuesIcon.adminIcon ? "Admin" : "Espectador"}</div>
                            <input type="hidden" {...register('userRole')} value={valuesIcon.adminIcon ? UserRole.ADMIN : UserRole.VIEWER}/>
                        </div>
                        <div className="admin-register-form-fields">
                            <div className="admin-register-field">
                                <input type="email" {...register('email')} required placeholder=""/>
                                <label>Email</label>
                            </div>
                            {errors.email && <div className='admin-register-error-message'>{errors.email.message}</div>}
                            <div className="admin-register-field">
                                <input type="text" {...register('name')} required placeholder=""/>
                                <label>Nombre</label>
                            </div>
                            <div className="admin-register-field">
                                <input type={
                                                values.showPassword
                                                ? "text"
                                                : "password"
                                            } 
                                            {...register('password')} required/>
                                <label>Contraseña</label>
                            </div>
                            <div className="admin-register-password-box">
                                <div className="admin-register-field">
                                    <input type={
                                                values.showPassword
                                                ? "text"
                                                : "password"
                                            } 
                                        {...register('password2')} required/>
                                    <label>Confirma la contraseña</label>
                                </div>
                                <FontAwesomeIcon className="admin-register-pass-visibility-button"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    icon={values.showPassword ? faEye : faEyeSlash}
                                />
                            </div>
                            {errors.password2 && <div className='admin-register-error-message'>{errors.password2.message}</div>}
                            <div className="admin-register-register-box">
                                <input type="submit" value="Crear cuenta"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};