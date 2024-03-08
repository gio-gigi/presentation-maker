import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { ITokenPayload } from "../interfaces/ITokenPayload";
import UnauthorizedError from "../errors/UnauthorizedError";
import { UserRole } from "../models/User";
dotenv.config();
const SECRET_JWT: string = process.env.SECRET_JWT || "mysecret";

export const createToken = async (email: string, admin: UserRole): Promise<string> => {
  return await jwt.sign({ email, admin }, SECRET_JWT);
};

export const getTokenData = (token: string): Promise<ITokenPayload | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_JWT, (err, decoded) => {
      if (err) {
        throw new UnauthorizedError({ message: "Invalid token", logging: true });
      } else {
        resolve(decoded as ITokenPayload);
      }
    });
  });
};
