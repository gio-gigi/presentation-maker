import { RegisterFormValues } from "../entities/register_form_values";
import { LoggedInUser } from "../entities/user";

export interface RegisterDatasource{
    getToken(form: RegisterFormValues): Promise<LoggedInUser>;
}