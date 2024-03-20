import { LoginDatasource } from "../../infrastructure/datasources/login_datasource";
import { FormValues } from "../../infrastructure/entities/login_form_values";
import axios from "axios";
import { LoggedInUser } from "../../infrastructure/entities/user";
import { LoggedInUserModel } from "../models/prod/LoggedInUserModel";
import { UserRole } from "../../constants/roles";

const API_URL = "http://localhost:3001";

export class LoginDatasourceDev implements LoginDatasource {
  async getToken(form: FormValues): Promise<LoggedInUser> {
    const { email, password } = form;
    const { data } = await axios.post<LoggedInUserModel>(
      API_URL + "/api/auth/login",
      {
        email: email,
        password: password,
      }
    );
    const user: LoggedInUser = {
      user: {
        email: data.email,
        role: data.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.VIEWER,
      },
      token: data.token,
    };
    return user;
  }
}
