import { Request } from "express";
export interface IGetUserFromReq extends Request {
  email?: string;
  name?: string;
  password?: string;
  admin?: boolean;
}
