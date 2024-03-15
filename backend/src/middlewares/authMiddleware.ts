import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { UserRole } from "../models/User";
import UnauthorizedError from "../errors/UnauthorizedError";
import { CustomRequestPayload } from "../interfaces/IPayloadInReq";
dotenv.config();

export const addPayloadToReq = async (req: CustomRequestPayload, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const payload = await jwt.verify(token, process.env.SECRET_JWT as string);
      req.payload = payload;
    } else {
      req.payload = null;
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
