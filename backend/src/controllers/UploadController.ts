import { Request, Response } from "express";

export class UploadController {
  async upload(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Nenhuma imagem enviada",
      });
    }

    const baseUrl = process.env.APP_URL || "http://localhost:3000";

    return res.status(201).json({
      url: `${baseUrl}/uploads/${file.filename}`,
    });
  }
}