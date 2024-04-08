import { RegisterDatasource } from "../../infrastructure/datasources/register_datasource";
import { RegisterFormValues } from "../../infrastructure/entities/register_form_values";
import axios from "axios";
import { LoggedInUser } from "../../infrastructure/entities/user";
import { LoggedInUserModel } from "../models/prod/LoggedInUserModel";
import { UserRole } from "../../constants/roles";
import { APIUrl } from "../../constants/api_url";

export class RegisterDatasourceDev implements RegisterDatasource {
  async getToken(form: RegisterFormValues): Promise<LoggedInUser> {
    const { email, password, name } = form;
    const { status, data } = await axios.post<LoggedInUserModel>(
      APIUrl + "api/auth/register",
      {
        email: email,
        password: password,
        name: name,
      }
    );
    if (status !== 201) {
      throw new Error("Error");
    }
    return {
      user: {
        email: data.email,
        role: data.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.VIEWER,
      },
      token: data.token,
    };
  }
}
