import { User } from "../models/User";
import { AppDataSource } from "../config/data-source";
import bcrypt from "bcryptjs";
import UnauthorizedError from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";
import { ILoginResult } from "../interfaces/ILoginResult";
import dotenv from "dotenv";
import { userExists } from "./userService";
import { createToken } from "../utils/jwtUtils";
import { comparePwd, hashPwd } from "../utils/passwordUtils";
const UserRepository = AppDataSource.getRepository(User);
dotenv.config();
const SECRET_JWT: string | undefined = process.env.SECRET_JWT;

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
    const token: string = await createToken(email, user.admin);
    return { isAdmin: user.admin, email, token };
  }

  async createUser(email: string, pwd: string, name: string, admin: boolean): Promise<String> {
    const user: User = new User();
    user.email = email;
    user.name = name;
    user.admin = admin;
    user.password = await hashPwd(pwd);
    if (await userExists(email)) throw new UnauthorizedError({ message: "User already exists", logging: true });
    await UserRepository.save(user);
    return await createToken(email, admin);
  }
}
