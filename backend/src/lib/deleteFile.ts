import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.resolve("uploads");

export function deleteUploadedImage(url: string) {
  const baseUrl = process.env.APP_URL || "http://localhost:3000";
  const prefix = `${baseUrl}/uploads/`;

  if (!url.startsWith(prefix)) return;

  const filename = url.slice(prefix.length);
  const filePath = path.join(UPLOADS_DIR, filename);

  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Erro ao deletar imagem:", filePath, err.message);
    }
  });
}
