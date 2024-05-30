import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../infrastructure/entities/login_form_values";
import { LoginDatasourceDev } from "../data/datasources/login_datasource";
import { LoginRepositoryDev } from "../data/repositories/login_repository";
import { useAuth } from "../contexts/auth_context";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
const loginDatasource = new LoginDatasourceDev();
const loginRepository = new LoginRepositoryDev(loginDatasource);

export const useLogin = (setIsLoading : Dispatch<SetStateAction<boolean>>) => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const authenticate = async () => {
      setIsLoading(true);
      try { 
        const { user, token } = await loginRepository.getToken(data);
        await login(user, token);
        navigate("/");
      } catch (error: any) {
        if(axios.isAxiosError(error)){
          error as AxiosError;
          switch(error.code){
            case(axios.AxiosError.ERR_BAD_REQUEST):
              setError("root.serverError", {type: "401", message: "Correo electrónico o contraseña incorrectos"});
              break;
            case(axios.AxiosError.ERR_NETWORK):
            setError("root.serverError", {type: "500", message: "Conexión con el servidor fallida"});
            break;
          }
        }
      }
      setIsLoading(false);
    };
    authenticate();
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return { register, handleSubmit, onSubmit, errors , clearErrors};
};
