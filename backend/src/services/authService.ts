import { User } from "../models/User";
import { AppDataSource } from "../config/data-source";
import bcrypt from "bcryptjs";
import UnauthorizedError from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";
import { ILoginResult } from "../interfaces/ILoginResult";
import dotenv from "dotenv";
import { userExists } from "./userService";
const UserRepository = AppDataSource.getRepository(User);
dotenv.config();
const SECRET_JWT: string | undefined = process.env.SECRET_JWT;

export class AuthService {
  async loginUser(email: string, pwd: string): Promise<ILoginResult> {
    const user: User | null = await UserRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedError({ message: "User does not extist", logging: true, code: 401 });
    }
    const passwordMatch = await this.comparePwd(user.password, pwd);
    if (!passwordMatch) {
      throw new UnauthorizedError({ message: "Passwords dont match", logging: true });
    }
    const token: string = await this.getJwt(email);
    return { isAdmin: user.admin, email, token };
  }

  async createUser(email: string, pwd: string, name: string, admin: boolean): Promise<User> {
    const user: User = new User();
    user.email = email;
    user.password = await this.hashPwd(pwd);
    user.name = name;
    user.admin = admin;
    if (await userExists(email)) throw new UnauthorizedError({ message: "User already exists", logging: true });
    await UserRepository.save(user);
    return user;
  }

  async getJwt(email: string): Promise<string> {
    const token: string = await jwt.sign(email, SECRET_JWT || "mysecret ");
    return token;
  }

  private async comparePwd(dbPwd: string, userPwd: string): Promise<boolean> {
    const ans: boolean = await bcrypt.compare(userPwd, dbPwd);
    return ans;
  }

  private async hashPwd(pwd: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPwd: string = await bcrypt.hash(pwd, salt);
    return hashedPwd;
  }
}
