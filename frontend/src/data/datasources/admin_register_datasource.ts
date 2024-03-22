import { RegisterFormValues } from "../../infrastructure/entities/register_form_values";
import axios from "axios";
import { LoggedInUserModel } from "../models/prod/LoggedInUserModel";
import { AdminRegisterDatasource } from "../../infrastructure/datasources/admin_register_datasource";

const API_URL = "http://localhost:3001";

export class AdminRegisterDatasourceData implements AdminRegisterDatasource {
  async createUser(form: RegisterFormValues): Promise<void> {
    const { email, password, name , userRole} = form;
    const { status, data } = await axios.post<LoggedInUserModel>(
      API_URL + "/api/auth/register",
      {
        email: email,
        password: password,
        name: name,
        role: userRole,
      }
    );
    if (status !== 201) {
      throw new Error("Error");
    }
  }
}
