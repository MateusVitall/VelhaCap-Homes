import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { createUserSchema } from "../schemas/user.schema";

import { ZodError } from "zod";

import bcrypt from "bcryptjs";

export class UserController {

  async create(req: Request, res: Response) {
  try {

    const data = createUserSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    );

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });

  } catch (error) {

  if (error instanceof ZodError) {
    return res.status(400).json({
      errors: error.flatten().fieldErrors,
    });
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return res.status(400).json({
      error: "Email já cadastrado",
    });
  }

  return res.status(500).json({
    error: "Erro ao criar usuário",
  });
}
}

  async list(req: Request, res: Response) {
    try {

      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, createdAt: true },
      });

      return res.json(users);

    } catch (error) {

      return res.status(500).json({
        error: "Erro ao listar usuários",
      });
    }
  }

}