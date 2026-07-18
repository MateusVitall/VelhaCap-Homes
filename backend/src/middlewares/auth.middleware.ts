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

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Formato de token inválido",
    });
  }

  const token = authHeader.substring(7);

  if (!token) {
    return res.status(401).json({
      error: "Token não informado",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };

    req.userId = decoded.id;

    return next();

  } catch {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
}