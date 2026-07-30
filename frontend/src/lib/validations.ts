import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Nome muito curto (mínimo 3 caracteres)")
    .refine((v) => v.trim().split(/\s+/).length >= 2, "Informe nome e sobrenome"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export const propertySchema = z.object({
  title: z.string().min(3, "Título muito curto").max(40, "Título muito longo"),
  description: z.string().min(5, "Descrição obrigatória"),
  price: z.number().positive("Preço deve ser positivo"),
  city: z.string().min(1, "Cidade obrigatória"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  tipo: z.string().optional(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  garage: z.boolean(),
  ownerName: z.string().optional(),
  ownerPhone: z.string().optional(),
  images: z.array(z.string()).optional(),
});
