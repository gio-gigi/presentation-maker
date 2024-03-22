import { RegisterFormValues } from "../entities/register_form_values";

export interface AdminRegisterRepository{
    createUser(form: RegisterFormValues): Promise<void>;
}