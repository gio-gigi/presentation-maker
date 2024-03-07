import { NextFunction } from "express";
import { AuthService } from "../services/authService";
import { IGetUserFromReq } from "../interfaces/IGetUserFromReq";
import BadRequestError from "../errors/BadRequestError";
import { ILoginResult } from "../interfaces/ILoginResult";
import { Response } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";

const authService = new AuthService();
const loginUser = async (req: IGetUserFromReq, res: Response, next: NextFunction) => {
  try {
    const email: string | undefined = req.body.email;
    const pwd: string | undefined = req.body.pwd;

    if (!email || !pwd) {
      return next(new BadRequestError({ logging: true, message: "pwd and email are required fields" }));
    }
    const loginResult: ILoginResult = await authService.loginUser(email, pwd);
    return res.status(201).json(loginResult);
  } catch (error: any) {
    next(new UnauthorizedError());
  }
};

const createUser = async (req: IGetUserFromReq, res: Response, next: NextFunction) => {
  try {
    const email: string | undefined = req.body.email;
    const pwd: string | undefined = req.body.pwd;
    const name: string | undefined = req.body.name;
    const admin: boolean | undefined = req.body.admin;

    if (!email || !pwd || !name) {
      return next(new BadRequestError({ logging: true, message: "email, pwd, name are required fields" }));
    }
    const token: String = await authService.createUser(email, pwd, name, false);
    return res.status(201).json({ email, admin: false, token });
  } catch (error: any) {
    next(error);
  }
};

export { loginUser, createUser };
