import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../infrastructure/entities/login_form_values";
import { LoginDatasourceDev } from "../data/datasources/dev/login_datasource";
import { LoginRepositoryDev } from "../data/repositories/login_repository";
import BadRequestError from "../errors/BadRequestError";
import UnauthorizedError from "../errors/UnautherizedError";
const loginDatasource = new LoginDatasourceDev();
const loginRepository = new LoginRepositoryDev(loginDatasource)

export const useLogin = () => {
    const {register, handleSubmit} = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const authenticate = async () => {
            const {email, password} = data
            try{
                //const token = await loginRepository.getToken(data);
                if(password==='admin'){
                    alert("Bienvenido")
                }
            }catch(UnautherizedError){
                alert("Datos incorrectos")
            }
        }
        authenticate();
    }

    return {register, handleSubmit, onSubmit};
}