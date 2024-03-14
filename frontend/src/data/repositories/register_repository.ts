import { RegisterDatasource } from "../../infrastructure/datasources/register_datasource";
import { RegisterFormValues } from "../../infrastructure/entities/register_form_values";
import { RegisterRepository } from "../../infrastructure/repositories/register_repository";

export class RegisterRepositoryDev implements RegisterRepository{
    constructor(
        private datasource: RegisterDatasource
    ){}
    async getToken(form: RegisterFormValues): Promise<string> {
        return this.datasource.getToken(form);
    }
}