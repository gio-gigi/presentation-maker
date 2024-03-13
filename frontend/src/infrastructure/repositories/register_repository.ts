import { FormValues } from "../entities/login_form_values";

export interface RegisterRepository{
    getToken(form: FormValues): Promise<string>;
}