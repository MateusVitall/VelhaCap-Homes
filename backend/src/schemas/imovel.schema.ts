import { z } from "zod";

export const createImovelSchema = z.object({
  titulo: z.string().min(3, "Título curto demais").max(40, "Título longo demais"),

  descricao: z.string().min(5, "Descrição obrigatória"),

  preco: z.number(),

  cidade: z.string(),

  bairro: z.string(),

  quartos: z.number(),

  banheiros: z.number(),

  garagem: z.boolean(),

  ownerName: z.string().optional(),

  ownerPhone: z.string().optional(),

  imagens: z.array(z.string()).default([]),
});

export const updateImovelSchema =
  createImovelSchema.partial();