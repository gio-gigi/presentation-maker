// Purpose: To store the admin credentials.
import dotenv from "dotenv";
dotenv.config();

export const ADMIN_PWD = process.env.ADMIN_PWD || "admin";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
export const ADMIN_NAME = process.env.ADMIN_NAME || "admin";
