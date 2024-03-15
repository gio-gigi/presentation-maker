import { UserRole } from "../models/User";

export interface ITokenPayload {
  email: string;
  role: UserRole;
}
