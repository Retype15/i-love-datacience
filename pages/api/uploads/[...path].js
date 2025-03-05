// pages/api/uploads/[...path].js
import fs from "fs";
import path from "path";

const UPLOAD_FOLDER = "/tmp/uploads";

export default function handler(req, res) {
  const { path: filePathArray } = req.query;
  if (!filePathArray || filePathArray.length < 2) {
    res.status(400).end("Ruta inválida");
    return;
  }
  const fileType = filePathArray[0]; // 'video' o 'html'
  const filename = filePathArray.slice(1).join("/");
  const filePath = path.join(UPLOAD_FOLDER, fileType, filename);
  if (fs.existsSync(filePath)) {
    if (fileType === "video") {
      res.setHeader("Content-Type", "video/mp4");
    } else if (fileType === "html") {
      res.setHeader("Content-Type", "text/html");
    }
    const fileBuffer = fs.readFileSync(filePath);
    res.status(200).send(fileBuffer);
  } else {
    res.status(404).end("Archivo no encontrado");
  }
}
