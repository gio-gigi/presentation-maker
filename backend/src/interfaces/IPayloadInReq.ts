import { Request } from "express";
export interface CustomRequestPayload extends Request<any> {
  payload?: any;
}
