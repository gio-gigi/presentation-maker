import jwt from "jsonwebtoken";
import { ITokenPayload } from "../interfaces/ITokenPayload";
import UnauthorizedError from "../errors/UnauthorizedError";
import { UserRole } from "../models/User";
import { SECRET_JWT } from "../constants/jwt";

export const createToken = async (email: string, userRole: UserRole): Promise<string> => {
  return await jwt.sign({ email, userRole }, SECRET_JWT);
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
