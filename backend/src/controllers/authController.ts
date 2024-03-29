import { NextFunction } from "express";
import { AuthService } from "../services/authService";
import BadRequestError from "../errors/BadRequestError";
import { ILoginResult } from "../interfaces/ILoginResult";
import { Response, Request } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";
import { UserRole } from "../models/User";
import { CustomRequestPayload } from "../interfaces/IPayloadInReq";

const authService = new AuthService();
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email: string | undefined = req.body.email;
    const pwd: string | undefined = req.body.password;

    if (!email || !pwd) {
      return next(new BadRequestError({ logging: true, message: "pwd and email are required fields" }));
    }
    const loginResult: ILoginResult = await authService.loginUser(email, pwd);
    return res.status(201).json(loginResult);
  } catch (error: any) {
    next(new UnauthorizedError());
  }
};

export const createUser = async (req: CustomRequestPayload, res: Response, next: NextFunction) => {
  try {
    const email: string | undefined = req.body.email;
    const pwd: string | undefined = req.body.password;
    const name: string | undefined = req.body.name;
    let role: UserRole | undefined = req.body.role;
    if (req.payload?.userRole != UserRole.ADMIN) role = UserRole.VIEWER;
    if (!email || !pwd || !name) {
      return next(new BadRequestError({ logging: true, message: "email, pwd, name are required fields" }));
    }
    const token: String = await authService.createUser(email, pwd, name, role || UserRole.VIEWER);
    return res.status(201).json({ email, role, token });
  } catch (error: any) {
    next(error);
  }
};
