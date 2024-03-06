import express, { Express } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errors";
import { Request, Response } from "express";
const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("alive");
});
app.use(errorHandler);

export default app;
