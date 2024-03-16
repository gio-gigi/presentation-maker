import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Presentation } from "../models/Presentation";
import { DB_HOST, DB_LOGGING, DB_NAME, DB_PORT, DB_PWD, DB_USER } from "../constants/db";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  synchronize: true,
  logging: DB_LOGGING,
  entities: [User, Presentation],
  subscribers: [],
  migrations: [],
});
