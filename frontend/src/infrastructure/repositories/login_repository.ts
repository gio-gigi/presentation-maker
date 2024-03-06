import { FormValues } from "../entities/login_form_valyes";

export interface LoginRepository{
    getToken(form: FormValues): Promise<string>;
}