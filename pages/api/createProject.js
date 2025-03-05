// pages/api/createProject.js
import fs from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "__i-love-datacience", "projects");

// Asegurarse de que la carpeta exista
if (!fs.existsSync(PROJECTS_DIR)) {
  fs.mkdirSync(PROJECTS_DIR, { recursive: true });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, youtube, sections } = req.body;
    if (!title || !youtube || !Array.isArray(sections)) {
      res.status(400).json({ error: "Faltan datos requeridos" });
      return;
    }
    // Generamos un id único (usamos timestamp)
    const id = Date.now().toString();
    const project = { id, title, youtube, sections };

    try {
      fs.writeFileSync(path.join(PROJECTS_DIR, `${id}.json`), JSON.stringify(project, null, 2));
      res.status(200).json({ id });
    } catch (error) {
      res.status(500).json({ error: "Error al guardar el proyecto" });
    }
  } else {
    res.status(405).end();
  }
}
