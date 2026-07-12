import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  createImovelSchema,
  updateImovelSchema,
} from "../schemas/imovel.schema";
import { ZodError } from "zod";
import { deleteUploadedImage } from "../lib/deleteFile";

export class ImovelController {
  async create(req: Request, res: Response) {
    try {
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
      const imoveis = await prisma.imovel.findMany({
        where: {
          disponivel: true,
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

      imovel.imagens.forEach(deleteUploadedImage);

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

      const parsed = updateImovelSchema.parse(req.body);

      const data = Object.fromEntries(
        Object.entries(parsed).filter(([_, v]) => v !== undefined)
      );

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: "Nenhum dado enviado" });
      }

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

      if (data.imagens) {
        const imagensRemovidas = imovelExistente.imagens.filter(
          (url) => !(data.imagens as string[]).includes(url)
        );
        imagensRemovidas.forEach(deleteUploadedImage);
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

  async registerView(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      await prisma.imovel.update({
        where: { id },
        data: { viewsCount: { increment: 1 } },
      });

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao registrar visualização" });
    }
  }

  async registerContact(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const imovel = await prisma.imovel.findUnique({ where: { id } });

      if (!imovel) {
        return res.status(404).json({ error: "Imóvel não encontrado" });
      }

      await prisma.contato.create({
        data: { imovelId: id },
      });

      return res.status(201).json({ message: "Contato registrado" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao registrar contato" });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const imoveis = await prisma.imovel.findMany({
        where: { userId: req.userId },
        select: { id: true, viewsCount: true },
      });

      const totalViews = imoveis.reduce((sum, i) => sum + i.viewsCount, 0);

      const totalContatos = await prisma.contato.count({
        where: {
          imovel: { userId: req.userId },
        },
      });

      return res.json({
        totalImoveis: imoveis.length,
        totalViews,
        totalContatos,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao buscar estatísticas" });
    }
  }
}
