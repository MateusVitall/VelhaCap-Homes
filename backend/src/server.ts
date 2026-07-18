import "dotenv/config";
import "./config/env";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";

import { userRoutes } from "./routes/user.routes";
import { imovelRoutes } from "./routes/imovel.routes";
import { authRoutes } from "./routes/auth.routes";
import { uploadRoutes } from "./routes/upload.routes";
import { generalLimiter } from "./middlewares/rateLimit";

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(generalLimiter);

app.use("/upload", uploadRoutes);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/users", userRoutes);
app.use("/imoveis", imovelRoutes);

app.use(authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ error: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});