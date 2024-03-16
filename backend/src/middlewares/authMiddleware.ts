import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { UserRole } from "../models/User";
import UnauthorizedError from "../errors/UnauthorizedError";
import { CustomRequestPayload } from "../interfaces/IPayloadInReq";
import { IPayload } from "../interfaces/IPayload";
dotenv.config();

export const addPayloadToReq = async (req: CustomRequestPayload, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const payload: JwtPayload | string = await jwt.verify(token, process.env.SECRET_JWT as string);
      let payloadObj: IPayload = payload as IPayload;
      req.payload = payloadObj;
    } else {
      req.payload = { email: undefined, userRole: undefined };
    }
    next();
  } catch (error: any) {
    next(new UnauthorizedError());
  }
};

export const guardRole = (role: UserRole) => {
  return (req: CustomRequestPayload, res: Response, next: NextFunction) => {
    if (req.payload?.userRole === role || req.payload?.userRole === UserRole.ADMIN) {
      next();
    } else {
      throw new UnauthorizedError({ message: `Your are not a ${role} user` });
    }
  };
};
