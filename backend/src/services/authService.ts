import { User, UserRole } from "../models/User";
import { AppDataSource } from "../config/data-source";
import bcrypt from "bcryptjs";
import UnauthorizedError from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";
import { ILoginResult } from "../interfaces/ILoginResult";
import dotenv from "dotenv";
import { UserService } from "./userService";
import { createToken } from "../utils/jwtUtils";
import { comparePwd, hashPwd } from "../utils/passwordUtils";
import { Repository } from "typeorm";
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
    const email: string = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const name: string = process.env.ADMIN_NAME || "admin";
    const role: UserRole = UserRole.ADMIN;
    const password: string = process.env.ADMIN_PASSWORD || "admin";
    const admin = await UserRepository.findOneBy({ email });
    if (admin) await UserRepository.delete({ email });
    const token: String = await new AuthService().createUser(email, password, name, role);
    console.log(`\x1b[32m\n[Admin created]\x1b[0m \nemail: ${email} \npassword: ${password} \ntoken: ${token}`);
  }
}
