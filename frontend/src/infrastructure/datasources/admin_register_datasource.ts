import { RegisterFormValues } from "../entities/register_form_values";

export interface AdminRegisterDatasource{
    createUser(form: RegisterFormValues): Promise<void>;
}