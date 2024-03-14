import { RegisterDatasource } from "../../infrastructure/datasources/register_datasource";
import { RegisterFormValues } from "../../infrastructure/entities/register_form_values";
import axios from "axios";

const API_URL = "http://localhost:3001"

export class RegisterDatasourceDev implements RegisterDatasource{
    async getToken(form: RegisterFormValues): Promise<string> {
        const {email, password, name} = form
        const response = await axios.post<{token: string}>(API_URL+'/api/auth/register',
            {
                "email": email,
                "password": password,
                "name": name
            });
        return response.data.token;
    }
}   