import { Router } from "express";
import { ImovelController } from "../controllers/ImovelController";
import { authMiddleware } from "../middlewares/auth.middleware";

const imovelRoutes = Router();

const imovelController = new ImovelController();

imovelRoutes.post("/", authMiddleware, imovelController.create);

imovelRoutes.get("/", imovelController.list);

imovelRoutes.get("/meus-imoveis", authMiddleware, imovelController.myImoveis);

imovelRoutes.get("/stats", authMiddleware, imovelController.getStats);

imovelRoutes.post("/:id/view", imovelController.registerView);

imovelRoutes.post("/:id/contato", imovelController.registerContact);

imovelRoutes.get("/:id", imovelController.show);

imovelRoutes.delete("/:id", authMiddleware, imovelController.delete);

imovelRoutes.put("/:id", authMiddleware, imovelController.update);

export { imovelRoutes };
