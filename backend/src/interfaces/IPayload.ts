import { UserRole } from "../models/User";
export interface IPayload {
  email?: string;
  userRole?: UserRole;
}
