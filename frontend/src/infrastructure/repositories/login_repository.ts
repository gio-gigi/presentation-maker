import { FormValues } from "../entities/login_form_values";

export interface LoginRepository{
    getToken(form: FormValues): Promise<string>;
}