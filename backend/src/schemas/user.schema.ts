import { z } from "zod";

export const createUserSchema = z.object({

  name: z
    .string()
    .min(3, "Nome curto demais")
    .max(50, "Nome longo demais"),

  email: z
    .string()
    .email("Email inválido")
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa"),

});