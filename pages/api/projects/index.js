// pages/api/projects/index.js
import fs from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "__i-love-datacience", "projects");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const files = fs.readdirSync(PROJECTS_DIR);
      const projects = files
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
          const content = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
          return JSON.parse(content);
        });
      res.status(200).json({ projects });
    } catch (error) {
      res.status(500).json({ error: "Error al leer los proyectos" });
    }
  } else {
    res.status(405).end();
  }
}
