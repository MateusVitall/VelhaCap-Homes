import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  createImovelSchema,
  updateImovelSchema,
} from "../schemas/imovel.schema";
import { ZodError } from "zod";

export class ImovelController {
  async create(req: Request, res: Response) {
    try {
      console.log("User logado:", req.userId);

      const data = createImovelSchema.parse(req.body);

      const imovel = await prisma.imovel.create({
        data: {
        ...data,
        userId: req.userId,
      },
    });


      return res.status(201).json(imovel);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.flatten().fieldErrors,
        });
      }

      return res.status(500).json({
        error: "Erro ao criar imóvel",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const imoveis = await prisma.imovel.findMany();

      return res.json(imoveis);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao listar imóveis",
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const imovel = await prisma.imovel.findUnique({
        where: { id },
      });

      if (!imovel) {
        return res.status(404).json({
          error: "Imóvel não encontrado",
        });
      }

      return res.json(imovel);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar imóvel",
      });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      await prisma.imovel.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao excluir imóvel",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const data = updateImovelSchema.parse(req.body);

      const imovel = await prisma.imovel.update({
        where: { id },
        data,
      });

      return res.json(imovel);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.flatten().fieldErrors,
        });
      }

      return res.status(500).json({
        error: "Erro ao atualizar imóvel",
      });
    }
  }
}
