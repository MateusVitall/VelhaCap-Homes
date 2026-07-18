import { z } from "zod";

export const tipoImovelEnum = z.enum([
  "Casa",
  "Apartamento",
  "Kitnet",
  "Sobrado",
  "Sala Comercial",
]);

export const createImovelSchema = z.object({
  titulo: z.string().min(3, "Título curto demais").max(40, "Título longo demais"),

  descricao: z.string().min(5, "Descrição obrigatória"),

  preco: z.number().positive("Preço deve ser positivo"),

  cidade: z.string().min(1, "Cidade obrigatória"),

  bairro: z.string().min(1, "Bairro obrigatório"),

  tipo: tipoImovelEnum.default("Casa"),

  quartos: z.number().int().nonnegative("Número de quartos inválido"),

  banheiros: z.number().int().nonnegative("Número de banheiros inválido"),

  garagem: z.boolean(),

  disponivel: z.boolean().default(true),

  ownerName: z.string().optional(),

  ownerPhone: z.string().optional(),

  imagens: z.array(z.string()).default([]),
});

export const updateImovelSchema = z.object({
  titulo: z.string().min(3).max(40).optional(),
  descricao: z.string().min(5).optional(),
  preco: z.number().positive("Preço deve ser positivo").optional(),
  cidade: z.string().min(1).optional(),
  bairro: z.string().min(1).optional(),
  tipo: tipoImovelEnum.optional(),
  quartos: z.number().int().nonnegative().optional(),
  banheiros: z.number().int().nonnegative().optional(),
  garagem: z.boolean().optional(),
  disponivel: z.boolean().optional(),
  ownerName: z.string().optional(),
  ownerPhone: z.string().optional(),
  imagens: z.array(z.string()).optional(),
});