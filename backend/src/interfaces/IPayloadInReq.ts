import { Request } from "express";
import { UserRole } from "../models/User";
export interface CustomRequestPayload extends Request<any> {
  payload?: {
    email?: string;
    userRole?: UserRole;
  };
}
