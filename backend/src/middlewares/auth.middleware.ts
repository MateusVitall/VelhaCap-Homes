import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token não informado",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      "senha-super-secreta"
    ) as { id: string };

    req.userId = decoded.id;

    return next();

  } catch {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
}