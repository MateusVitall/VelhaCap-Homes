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
      const data = createImovelSchema.parse(req.body);

      const usuario = await prisma.user.findUnique({
        where: {
          id: req.userId,
        },
      });

      const imovel = await prisma.imovel.create({
        data: {
          ...data,
          ownerName: usuario?.name,
          ownerPhone: usuario?.telefone,
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
      const imoveis = await prisma.imovel.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.json(imoveis);
    } catch (error) {
      console.log(error);

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
        include: {
          user: true,
        },
      });

      if (!imovel) {
        return res.status(404).json({
          error: "Imóvel não encontrado",
        });
      }

      return res.json(imovel);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: "Erro ao buscar imóvel",
      });
    }
  }

  async delete(req: Request, res: Response) {
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

      if (imovel.userId !== req.userId) {
        return res.status(403).json({
          error: "Acesso negado",
        });
      }

      await prisma.imovel.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: "Erro ao excluir imóvel",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const data = updateImovelSchema.parse(req.body);

      const imovelExistente = await prisma.imovel.findUnique({
        where: { id },
      });

      if (!imovelExistente) {
        return res.status(404).json({
          error: "Imóvel não encontrado",
        });
      }

      if (imovelExistente.userId !== req.userId) {
        return res.status(403).json({
          error: "Acesso negado",
        });
      }

      const imovel = await prisma.imovel.update({
        where: { id },
        data,
        include: {
          user: true,
        },
      });

      return res.json(imovel);
    } catch (error) {
      console.log(error);

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

  async myImoveis(req: Request, res: Response) {
    try {
      const imoveis = await prisma.imovel.findMany({
        where: {
          userId: req.userId,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.json(imoveis);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: "Erro ao listar seus imóveis",
      });
    }
  }
}
