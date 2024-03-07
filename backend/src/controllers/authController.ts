import { NextFunction } from "express";
import { AuthService } from "../services/authService";
import { IGetUserAuthInfoRequest } from "../interfaces/IGetUserAuthRequest";
import BadRequestError from "../errors/BadRequestError";
import { ILoginResult } from "../interfaces/ILoginResult";
import { Response } from "express";

const authService = new AuthService();
const loginUser = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const email: string | undefined = req.body.email;
    const pwd: string | undefined = req.body.pwd;

    if (!email || !pwd) {
      return next(new BadRequestError({ logging: true }));
    }
    const loginResult: ILoginResult = await authService.loginUser(email, pwd);
    console.log(loginResult);
    return res.status(201).json(loginResult);
  } catch (error: any) {
    next(error);
  }
};

export { loginUser };
