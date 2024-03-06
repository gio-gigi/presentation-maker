import dotenv from "dotenv";
import app from "./app";
import { DataSource } from "typeorm";
import { AppDataSource } from "./config/data-source";

dotenv.config();
const port = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

export default app;
