import { User, UserRole } from "../models/User";
import { AppDataSource } from "../config/data-source";
import UnauthorizedError from "../errors/UnauthorizedError";
import { ILoginResult } from "../interfaces/ILoginResult";
import dotenv from "dotenv";
import { UserService } from "./userService";
import { createToken } from "../utils/jwtUtils";
import { comparePwd, hashPwd } from "../utils/passwordUtils";
import { Repository } from "typeorm";
import { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PWD } from "../constants/admin";
const UserRepository = AppDataSource.getRepository(User);
dotenv.config();

export class AuthService {
  async loginUser(email: string, pwd: string): Promise<ILoginResult> {
    const user: User | null = await UserRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedError({ message: "User does not extist", logging: true, code: 401 });
    }
    const passwordMatch = await comparePwd(user.password, pwd);
    if (!passwordMatch) {
      throw new UnauthorizedError({ message: "Passwords dont match", logging: true });
    }
    const token: string = await createToken(email, user.role);
    return { role: user.role, email, token };
  }

  async createUser(email: string, pwd: string, name: string, role: UserRole): Promise<String> {
    const user: User = new User();
    user.email = email;
    user.name = name;
    user.role = role;
    user.password = await hashPwd(pwd);
    if (await UserService.userExists(email)) throw new UnauthorizedError({ message: "User already exists", logging: true });
    await UserRepository.save(user);
    return await createToken(email, role);
  }

  async defaultAdmin() {
    const UserRepository: Repository<User> = AppDataSource.getRepository(User);
    const email: string = ADMIN_EMAIL;
    const name: string = ADMIN_NAME;
    const role: UserRole = UserRole.ADMIN;
    const password: string = ADMIN_PWD;
    const admin = await UserRepository.findOneBy({ email });
    let token: String = "";
    if (admin) {
      admin.password = await hashPwd(password);
      token = await createToken(email, role);
    } else {
      token = await new AuthService().createUser(email, password, name, role);
    }
    console.log(`\x1b[32m\n[Admin created]\x1b[0m \nemail: ${email} \npassword: ${password} \ntoken: ${token}`);
  }
}
