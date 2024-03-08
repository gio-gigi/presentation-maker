import { UserRole } from "../models/User";

interface IUser {
  email: string;
  name: string;
  password: string;
  userRole: UserRole;
}
export { IUser };
