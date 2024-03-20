import { RegisterDatasource } from "../../infrastructure/datasources/register_datasource";
import { RegisterFormValues } from "../../infrastructure/entities/register_form_values";
import { LoggedInUser } from "../../infrastructure/entities/user";
import { RegisterRepository } from "../../infrastructure/repositories/register_repository";

export class RegisterRepositoryDev implements RegisterRepository{
    constructor(
        private datasource: RegisterDatasource
    ){}
    async getToken(form: RegisterFormValues): Promise<LoggedInUser> {
        return this.datasource.getToken(form);
    }
}