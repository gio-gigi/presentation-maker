import dotenv from "dotenv";
dotenv.config();
export const DB_PORT = parseInt(process.env.DB_PORT || "3306");
export const DB_USER = process.env.DB_USER || "root";
export const DB_PWD = process.env.DB_PWD || "";
export const DB_NAME = process.env.DB_NAME || "presentation_maker";
export const DB_LOGGING = process.env.DB_LOGGING === "true" || false;
export const DB_HOST = process.env.DB_HOST || "localhost";
