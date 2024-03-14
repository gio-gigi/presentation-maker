import { RegisterFormValues } from "../entities/register_form_values";

export interface RegisterRepository{
    getToken(form: RegisterFormValues): Promise<string>;
}