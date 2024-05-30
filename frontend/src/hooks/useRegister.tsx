import { FieldErrors, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormValues } from "../infrastructure/entities/register_form_values";
import { RegisterDatasourceDev } from "../data/datasources/register_datasource";
import { RegisterRepositoryDev } from "../data/repositories/register_repository";
import { useAuth } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";
const registerDatasource = new RegisterDatasourceDev();
const registerRepository = new RegisterRepositoryDev(registerDatasource)

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
  

export const useRegister = () => {
    const {
        register, 
        handleSubmit,
        setError,
        formState : {errors}
    } = useForm<RegisterFormValues>({resolver});
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterFormValues> = (data: RegisterFormValues) => {
        const authenticate = async () => {
            try{
                const user = await registerRepository.getToken(data);
                login(user.user, user.token);
                navigate("/");
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