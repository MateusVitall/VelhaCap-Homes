import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.get("/", authMiddleware, userController.list);

export { userRoutes };