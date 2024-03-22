import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormValues } from "../infrastructure/entities/register_form_values";
import { AdminRegisterDatasourceData } from "../data/datasources/admin_register_datasource";
import { AdminRegisterRepositoryData } from "../data/repositories/admin_register_repository";
const registerDatasource = new AdminRegisterDatasourceData();
const registerRepository = new AdminRegisterRepositoryData(registerDatasource)

export const useAdminRegister = () => {
    const {
        register, 
        handleSubmit,
        setError,
        formState : {errors}
    } = useForm<RegisterFormValues>();

    const onSubmit: SubmitHandler<RegisterFormValues> = (data: RegisterFormValues) => {
        const createNewUser = async () => {
            try{
                const {password, password2} = data;
                if(password!=password2){
                    setError("password2",{
                        type:"manual",
                        message:"Las contraseñas no coinciden"
                    })
                    return;
                }
                const user = await registerRepository.createUser(data);
                console.log("Created");
            }catch(error: any){
                setError("email",{
                    type:"manual", 
                    message:error.response.data.errors[0].message,
                })
            }
        }
        createNewUser();
    }
    return {register, handleSubmit, onSubmit, errors};
}