import express, { Express } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errors";
import { authRouter } from "./routes/auth";
import { addPayloadToReq } from "./middlewares/authMiddleware";
import { presentationRouter } from "./routes/presentation";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(addPayloadToReq);
app.use(authRouter, presentationRouter);

app.use(errorHandler);

export default app;
