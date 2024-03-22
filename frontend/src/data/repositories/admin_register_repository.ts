import { AdminRegisterDatasource } from "../../infrastructure/datasources/admin_register_datasource";
import { RegisterFormValues } from "../../infrastructure/entities/register_form_values";
import { AdminRegisterRepository } from "../../infrastructure/repositories/admin_register_repository";

export class AdminRegisterRepositoryData implements AdminRegisterRepository{
    constructor(
        private datasource: AdminRegisterDatasource
    ){}
    async createUser(form: RegisterFormValues): Promise<void> {
        return this.datasource.createUser(form);
    }
}