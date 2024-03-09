import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/data-source";
import { AuthService } from "./services/authService";

dotenv.config();
const port = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    app.listen(port, async () => {
      await new AuthService().defaultAdmin();
      console.log(`\x1b[32m[server]: Server is running at http://localhost:${port}\x1b[0m`);
    });
  })
  .catch((error) => console.log(error));

export default app;
