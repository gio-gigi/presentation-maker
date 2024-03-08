import { LoginDatasource } from "../../infrastructure/datasources/login_datasource";
import { FormValues } from "../../infrastructure/entities/login_form_values";
import { LoginRepository } from "../../infrastructure/repositories/login_repository";

export class LoginRepositoryDev implements LoginRepository{
    constructor(
        private datasource: LoginDatasource
    ){}
    async getToken(form: FormValues): Promise<string> {
        return this.datasource.getToken(form);
    }
}