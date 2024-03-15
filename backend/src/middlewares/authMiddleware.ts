import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { UserRole } from "../models/User";
import UnauthorizedError from "../errors/UnauthorizedError";
dotenv.config();

export const addPayloadToReq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const payload = await jwt.verify(token, process.env.SECRET_JWT as string);
      req.body.payload = payload;
    } else {
      req.body.payload = null;
    }
    next();
  } catch (error: any) {
    next(new UnauthorizedError());
  }
};

export const guardRole = (role: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.payload, role);
    if (req.body?.payload?.userRole === role || req.body?.payload?.userRole === UserRole.ADMIN) {
      next();
    } else {
      throw new UnauthorizedError({ message: `Your are not a ${role} user` });
    }
  };
};
