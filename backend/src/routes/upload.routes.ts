import { Router } from "express";
import { UploadController } from "../controllers/UploadController";
import { upload } from "../middlewares/upload";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadLimiter } from "../middlewares/rateLimit";

const uploadRoutes = Router();

const uploadController = new UploadController();

uploadRoutes.post(
  "/",
  uploadLimiter,
  authMiddleware,
  upload.single("imagem"),
  uploadController.upload
);

export { uploadRoutes };