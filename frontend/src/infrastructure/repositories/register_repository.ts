import { RegisterFormValues } from "../entities/register_form_values";
import { LoggedInUser } from "../entities/user";

export interface RegisterRepository{
    getToken(form: RegisterFormValues): Promise<LoggedInUser>;
}