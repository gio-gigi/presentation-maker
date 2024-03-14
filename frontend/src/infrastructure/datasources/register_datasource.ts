import { RegisterFormValues } from "../entities/register_form_values";

export interface RegisterDatasource{
    getToken(form: RegisterFormValues): Promise<string>;
}