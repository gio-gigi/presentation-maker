import { FormValues } from "../entities/login_form_values";

export interface RegisterDatasource{
    getToken(form: FormValues): Promise<string>;
}