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

  preco: z.number(),

  cidade: z.string(),

  bairro: z.string(),

  tipo: tipoImovelEnum.default("Casa"),

  quartos: z.number(),

  banheiros: z.number(),

  garagem: z.boolean(),

  disponivel: z.boolean().default(true),

  ownerName: z.string().optional(),

  ownerPhone: z.string().optional(),

  imagens: z.array(z.string()).default([]),
});

export const updateImovelSchema = z.object({
  titulo: z.string().min(3).max(40).optional(),
  descricao: z.string().min(5).optional(),
  preco: z.number().optional(),
  cidade: z.string().optional(),
  bairro: z.string().optional(),
  tipo: tipoImovelEnum.optional(),
  quartos: z.number().optional(),
  banheiros: z.number().optional(),
  garagem: z.boolean().optional(),
  disponivel: z.boolean().optional(),
  ownerName: z.string().optional(),
  ownerPhone: z.string().optional(),
  imagens: z.array(z.string()).optional(),
});