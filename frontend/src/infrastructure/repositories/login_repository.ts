import { FormValues } from "../entities/login_form_values";
import { LoggedInUser } from "../entities/user";

export interface LoginRepository{
    getToken(form: FormValues): Promise<LoggedInUser>;
}