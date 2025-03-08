// Funciones para interactuar con el Blob (crear, leer, actualizar, eliminar) 
import { put } from "@vercel/blob";

const BASE_URL = "https://3kd8fds38lvbrrcg.public.blob.vercel-storage.com/__i-love-datacience/projects";
const BASE_PATH = '__i-love-datacience/projects';

export async function fetchProjects() {
  // Aquí se debería implementar la lógica para obtener la lista de proyectos.
  // Una posibilidad es mantener un índice en otra ubicación (o en edge-config).
  // Por ahora, se retorna un arreglo vacío.
  return [];
}

export async function fetchProjectById(projectId) {
  const url = `${BASE_URL}/${encodeURIComponent(projectId)}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener el proyecto");
  return res.json();
}


export async function createProject(projectData) {
    // Generar un ID único para el proyecto (por ejemplo, usando Date.now())
    const projectId = Date.now().toString();
    // Construir el nombre del archivo incluyendo la carpeta y extensión .json
    const fileName = `${BASE_PATH}/${encodeURIComponent(projectId)}.json`;
    const data = { ...projectData, id: projectId };
  
    // Usar la función put para subir el JSON convertido a string
    const { url } = await put(fileName, JSON.stringify(data), {
      access: 'public',
      contentType: 'application/json'
    });
  
    console.log("Proyecto creado en:", url);
    return data;
  }

export async function updateProject(projectId, projectData) {
  const url = `${BASE_URL}/${encodeURIComponent(projectId)}.json`;
  const data = { ...projectData, id: projectId };
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al actualizar el proyecto");
  return data;
}

export async function deleteProject(projectId) {
  const url = `${BASE_URL}/${encodeURIComponent(projectId)}.json`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error("Error al eliminar el proyecto");
  return true;
}
