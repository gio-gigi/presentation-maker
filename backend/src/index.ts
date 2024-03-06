import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
