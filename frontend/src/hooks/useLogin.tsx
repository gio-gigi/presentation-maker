import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../infrastructure/entities/login_form_values";
import { LoginDatasourceDev } from "../data/datasources/dev/login_datasource";
import { LoginRepositoryDev } from "../data/repositories/login_repository";
const loginDatasource = new LoginDatasourceDev();
const loginRepository = new LoginRepositoryDev(loginDatasource)

export const useLogin = () => {
    const {
        register, 
        handleSubmit,
        setError,
        formState : {errors}
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        const authenticate = async () => {
            try{
                const token = await loginRepository.getToken(data);
                console.log(token)
            }catch(error: any){
                setError("email",{
                    type:"manual", 
                    message:error.response.data.errors[0].message,
                })
            }
        }
        authenticate();
    }

    return {register, handleSubmit, onSubmit, errors};
}