import { FormValues } from "../entities/login_form_valyes";

export interface LoginDatasource{
    getToken(form: FormValues): Promise<string>;
}