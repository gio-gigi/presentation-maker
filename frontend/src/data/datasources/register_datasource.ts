import { RegisterDatasource } from "../../infrastructure/datasources/register_datasource";
import { FormValues } from "../../infrastructure/entities/login_form_values";
import axios from "axios";

const API_URL = "http://localhost:3001"

export class RegisterDatasourceDev implements RegisterDatasource{
    async getToken(form: FormValues): Promise<string> {
        const {email, password} = form
        const response = await axios.post<{token: string}>(API_URL+'/api/auth/register',
            {
                "email": email,
                "password": password
            });
        return response.data.token;
    }
}   