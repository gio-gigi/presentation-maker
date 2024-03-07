import { Router } from "express";
import { loginUser } from "../controllers/authController";
const authRouter: Router = Router();

// login user
authRouter.post("/api/auth/login", loginUser);

export { authRouter };
