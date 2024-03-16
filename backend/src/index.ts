import app from "./app";
import { AppDataSource } from "./config/data-source";
import { AuthService } from "./services/authService";
import { SERVER_PORT } from "./constants/server";

AppDataSource.initialize()
  .then(() => {
    app.listen(SERVER_PORT, async () => {
      await new AuthService().defaultAdmin();
      console.log(`\x1b[32m[server]: Server is running at http://localhost:${SERVER_PORT}\x1b[0m`);
    });
  })
  .catch((error) => console.log(error));

export default app;
