import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server update");
});

app.listen(3001, () => {
  console.log(`[server]: Server is running at http://localhost:${3001}`);
});
