import { Router } from "express";
import { loginUser, createUser } from "../controllers/authController";
const authRouter: Router = Router();

// login user or admin
authRouter.post("/api/auth/login", loginUser);

// create user
authRouter.post("/api/auth/register", createUser);

export { authRouter };
