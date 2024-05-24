import { FieldErrors, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormValues } from "../infrastructure/entities/register_form_values";
import { AdminRegisterDatasourceData } from "../data/datasources/admin_register_datasource";
import { AdminRegisterRepositoryData } from "../data/repositories/admin_register_repository";
import { useNavigate, useNavigation } from "react-router-dom";
import { useConfirmMessage } from "../contexts/confirm_message_context";
const registerDatasource = new AdminRegisterDatasourceData();
const registerRepository = new AdminRegisterRepositoryData(registerDatasource)

const resolver: Resolver<RegisterFormValues> = async (data) => {
    const passwordPatternLower = /[a-z]+/;
    const passwordPatternUpper = /[A-Z]+/;
    const passwordPatternChars = /[@#$%&]+/;

    const errors: FieldErrors<RegisterFormValues> = {};
  
    if (!data.email) {
      errors.email = {
        type: "required",
        message: "El correo electronico es requerido"
      };
    }else{
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(data.email)) {
        errors.email = {
          type: "validate",
          message: "El correo electronico no es válido"
        };
      }
    }

    if (!data.name){
        errors.name = {
            type: "required",
            message: "El nombre es requerido"
        }
    }
  
    if (!data.password) {
        errors.password = {
          type: "required",
          message: "La contraseña es requerida"
        };
      }else{
        if(data.password.length<8){
            errors.password = {
                type: "minLength",
                message: "La contraseña debe ser minímo de 8 carácteres"
            }
        }

        if(!passwordPatternLower.test(data.password)){
            errors.password = {
                type: "pattern",
                message: "La contraseña debe tener una letra minúscula"
            }
        }

        if(!passwordPatternUpper.test(data.password)){
            errors.password = {
                type: "pattern",
                message: "La contraseña debe tener una letra mayúscula"
            }
        }
        
        if(!passwordPatternChars.test(data.password)){
            errors.password = {
                type: "pattern",
                message: "La contraseña debe tener al menos un carácter raro"
            }
        }

        if(data.confirmPassword!=data.password){
            errors.confirmPassword = {
              type: "validate",
              message: "Las contraseñas deben coincidir"
            }; 
        }
      }
    
      if (!data.confirmPassword) {
        errors.confirmPassword = {
          type: "required",
          message: "La contraseña es requerida"
        };
      }
  
    return {
      values: Object.keys(errors).length > 0 ? {} : data,
      errors: errors,
    };
};

export const useAdminRegister = () => {
    const {
        register, 
        handleSubmit,
        setError,
        setValue,
        formState : {errors}
    } = useForm<RegisterFormValues>({resolver});
    const navigation = useNavigate();
    const { showMessage } = useConfirmMessage();

    const onSubmit: SubmitHandler<RegisterFormValues> = (data: RegisterFormValues) => {
        const createNewUser = async () => {
            try{
                await registerRepository.createUser(data);
                showMessage("Usuario creado con exito");
                navigation("/");
            }catch(error: any){
                setError("email",{
                    type:"manual", 
                    message:error.response.data.errors[0].message,
                })
            }
        }
        createNewUser();
    }
    return {register, handleSubmit, onSubmit, errors, setValue};
}