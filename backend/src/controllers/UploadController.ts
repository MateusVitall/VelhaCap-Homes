import { Request, Response } from "express";

export class UploadController {
  async upload(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Nenhuma imagem enviada",
      });
    }

    return res.status(201).json({
      url: file.path,
    });
  }
}
