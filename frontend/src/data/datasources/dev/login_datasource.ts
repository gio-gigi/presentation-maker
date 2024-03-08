import BadRequestError from "../../../errors/BadRequestError";
import UnauthorizedError from "../../../errors/UnautherizedError";
import { LoginDatasource } from "../../../infrastructure/datasources/login_datasource";
import { FormValues } from "../../../infrastructure/entities/login_form_values";
import axios from "axios";

const API_URL = "https://localhost:3001/api/auth/signin"

export class LoginDatasourceDev implements LoginDatasource{
    async getToken(form: FormValues): Promise<string> {
        const {email, password} = form
        try {
            const response = await axios.post<{token: string}>(API_URL, {email, password});
            if (response.status === 200) {
                return response.data.token;
            } else if (response.status === 401) {
                throw new UnauthorizedError()
            } else {
                throw new BadRequestError()
            }
        } catch (error) {
            throw error;
        }
    }
}   