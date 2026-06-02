import express from "express";
import cors from "cors";

import { userRoutes } from "./routes/user.routes";
import { imovelRoutes } from "./routes/imovel.routes";
import { authRoutes } from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/imoveis", imovelRoutes);

app.use(authRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});