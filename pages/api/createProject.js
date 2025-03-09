// pages/api/createProject.js
import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const projectData = req.body;
    console.log("Recibido:", projectData);
    const projectId = `${projectData.title}-${projectData.user}`; // Puedes ajustar el ID según tus necesidades
    const BASE_PATH = '__i-love-datacience/projects';
    const fileName = `${BASE_PATH}/${projectId}.json`;

    const options = {
      addRandomSuffix: false,
      access: 'public',
      contentType: 'application/json',
    };

    const blob = await put(fileName, JSON.stringify(projectData), options);
    const data = { ...projectData, id: projectId };

    console.log("Proyecto creado en:", fileName, "as blob:", blob);
    return res.status(200).json({ success: true, project: data });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
