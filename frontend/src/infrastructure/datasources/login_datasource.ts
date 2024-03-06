import { FormValues } from "../entities/login_form_values";

export interface LoginDatasource{
    getToken(form: FormValues): Promise<string>;
}