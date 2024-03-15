import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormValues } from "../infrastructure/entities/register_form_values";
import { RegisterDatasourceDev } from "../data/datasources/register_datasource";
import { RegisterRepositoryDev } from "../data/repositories/register_repository";
const registerDatasource = new RegisterDatasourceDev();
const registerRepository = new RegisterRepositoryDev(registerDatasource)

export const useRegister = () => {
    const {
        register, 
        handleSubmit,
        setError,
        formState : {errors}
    } = useForm<RegisterFormValues>()

    const onSubmit: SubmitHandler<RegisterFormValues> = (data: RegisterFormValues) => {
        const authenticate = async () => {
            try{
                const token = await registerRepository.getToken(data);
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