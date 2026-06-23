import { v2 as cloudinary } from "cloudinary";

export function deleteUploadedImage(url: string) {
  if (!url.includes("res.cloudinary.com")) return;

  const parts = url.split("/");
  const folderAndFile = parts.slice(parts.indexOf("upload") + 1).join("/");
  const publicId = folderAndFile.replace(/\.[^.]+$/, "");

  cloudinary.uploader.destroy(publicId).catch((err) => {
    console.error("Erro ao deletar imagem do Cloudinary:", publicId, err.message);
  });
}
