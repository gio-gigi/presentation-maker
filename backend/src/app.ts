import express, { Express, NextFunction } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errors";
import { Request, Response } from "express";
import { authRouter } from "./routes/auth";
import UnauthorizedError from "./errors/UnauthorizedError";
import bcrypt from "bcryptjs";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("hola", salt);
  console.log(hashedPassword);
});

app.use(errorHandler);

export default app;
