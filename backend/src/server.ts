import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import { userRoutes } from "./routes/user.routes";
import { imovelRoutes } from "./routes/imovel.routes";
import { authRoutes } from "./routes/auth.routes";
import { uploadRoutes } from "./routes/upload.routes";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(
  "/uploads",
  express.static(path.resolve("uploads"))
);

app.use("/upload", uploadRoutes);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/users", userRoutes);
app.use("/imoveis", imovelRoutes);

app.use(authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});