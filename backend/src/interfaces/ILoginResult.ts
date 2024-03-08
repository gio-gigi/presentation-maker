import { UserRole } from "../models/User";

export interface ILoginResult {
  role?: UserRole;
  email?: string;
  token?: string;
}
