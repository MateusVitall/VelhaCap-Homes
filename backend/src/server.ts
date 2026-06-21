import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import { userRoutes } from "./routes/user.routes";
import { imovelRoutes } from "./routes/imovel.routes";
import { authRoutes } from "./routes/auth.routes";
import { uploadRoutes } from "./routes/upload.routes";

const app = express();

app.use(cors());

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

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});