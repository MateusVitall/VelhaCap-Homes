import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { loginLimiter } from "../middlewares/rateLimit";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/login", loginLimiter, authController.login);

export { authRoutes };