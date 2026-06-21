import { Router } from "express";
import { UploadController } from "../controllers/UploadController";
import { upload } from "../middlewares/upload";
import { authMiddleware } from "../middlewares/auth.middleware";

const uploadRoutes = Router();

const uploadController = new UploadController();

uploadRoutes.post(
  "/",

  (req, res, next) => {
    console.log("1 - REQUISIÇÃO CHEGOU");
    next();
  },

  authMiddleware,

  (req, res, next) => {
    console.log("2 - PASSOU AUTH");
    next();
  },

  upload.single("imagem"),

  (req, res, next) => {
    console.log("3 - PASSOU MULTER");
    next();
  },

  uploadController.upload
);

export { uploadRoutes };