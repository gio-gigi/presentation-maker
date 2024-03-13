import { RegisterDatasource } from "../../infrastructure/datasources/register_datasource";
import { FormValues } from "../../infrastructure/entities/login_form_values";
import { RegisterRepository } from "../../infrastructure/repositories/register_repository";

export class RegisterRepositoryDev implements RegisterRepository{
    constructor(
        private datasource: RegisterDatasource
    ){}
    async getToken(form: FormValues): Promise<string> {
        return this.datasource.getToken(form);
    }
}