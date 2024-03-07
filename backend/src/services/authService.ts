import { User } from "../models/User";
import { AppDataSource } from "../config/data-source";
import bcrypt from "bcryptjs";
import UnauthorizedError from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";
import { ILoginResult } from "../interfaces/ILoginResult";

const UserRepository = AppDataSource.getRepository(User);

export class AuthService {
  async loginUser(email: string, pwd: string): Promise<ILoginResult> {
    const user: User | null = await UserRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedError({ message: "User does not extist", logging: true, code: 401 });
    }
    console.log("user" + user.password);
    const passwordMatch = await this.comparePwd(user.password, pwd);
    if (!passwordMatch) {
      throw new UnauthorizedError({ message: "Passwords dont match", logging: true });
    }
    const token: string = await jwt.sign(email, "secret");
    return { isAdmin: user.admin, email, token };
  }

  private async comparePwd(dbPwd: string, userPwd: string): Promise<boolean> {
    const ans: boolean = await bcrypt.compare(userPwd, dbPwd);
    return ans;
  }
}
