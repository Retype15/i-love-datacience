// pages/api/projects/[id].js
import fs from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "__i-love-datacience", "projects");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const filePath = path.join(PROJECTS_DIR, `${id}.json`);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const project = JSON.parse(content);
        res.status(200).json({ project });
      } catch (error) {
        res.status(500).json({ error: "Error al leer el proyecto" });
      }
    } else {
      res.status(404).json({ error: "Proyecto no encontrado" });
    }
  } else {
    res.status(405).end();
  }
}
