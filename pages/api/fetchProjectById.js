import { NextResponse } from "next/server";

const BASE_URL = "https://3kd8fds38lvbrrcg.public.blob.vercel-storage.com/__i-love-datacience/projects";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Método no permitido" });
  }

  const { projectId } = req.query;
  if (!projectId) {
    return res.status(400).json({ success: false, error: "Falta projectId" });
  }

  const url = `${BASE_URL}/${encodeURIComponent(projectId)}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener el proyecto");

    const data = await response.json();
    return res.status(200).json({ success: true, project: data });
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
