import { DataSource } from "typeorm";
import { User } from "../models/User";
import dotenv from "dotenv";
import { Presentation } from "../models/Presentation";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PWD || "root",
  database: "presentation_maker",
  synchronize: true,
  logging: true,
  entities: [User, Presentation],
  subscribers: [],
  migrations: [],
});
