import { Request } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  email?: string;
  pwd?: string;
}
