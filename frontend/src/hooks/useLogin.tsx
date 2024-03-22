import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../infrastructure/entities/login_form_values";
import { LoginDatasourceDev } from "../data/datasources/login_datasource";
import { LoginRepositoryDev } from "../data/repositories/login_repository";
import { useAuth } from "../contexts/auth_context";
import { useEffect } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
const loginDatasource = new LoginDatasourceDev();
const loginRepository = new LoginRepositoryDev(loginDatasource);

export const useLogin = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const authenticate = async () => {
      try { 
        const { user, token } = await loginRepository.getToken(data);
        await login(user, token);
        navigate("/");
      } catch (error: any) {
        setError("email", {
          type: "manual",
          message: error.response.data.errors[0].message,
        });
      }
    };
    authenticate();
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return { register, handleSubmit, onSubmit, errors };
};
