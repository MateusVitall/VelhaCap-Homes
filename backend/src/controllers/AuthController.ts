import { Request, Response } from "express";

import { prisma } from "../lib/prisma";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({
          error: "Email ou senha inválidos",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          error: "Email ou senha inválidos",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        },
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.flatten().fieldErrors,
        });
      }

      return res.status(500).json({
        error: "Erro ao fazer login",
      });
    }
  }
}
