import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL deve ser uma URL válida"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET deve ter pelo menos 16 caracteres"),
  FRONTEND_URL: z.string().url("FRONTEND_URL deve ser uma URL válida"),
  APP_URL: z.string().url().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME é obrigatório"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY é obrigatório"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET é obrigatório"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Variáveis de ambiente inválidas:");
  const fieldErrors = parsed.error.flatten().fieldErrors;
  for (const [field, errors] of Object.entries(fieldErrors)) {
    console.error(`  ${field}: ${(errors ?? []).join(", ")}`);
  }
  process.exit(1);
}

export const env = parsed.data;
