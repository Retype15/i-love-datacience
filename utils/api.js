const API_BASE_URL = "/api"; // Base URL de las API Routes
const BASE_PATH = '__i-love-datacience/projects';
const { list } = require("@vercel/blob");

export async function fetchProjects() {
  const response = await fetch('/api/getAllBlobs');
  if (!response.ok) {
    throw new Error('Error getting all blobs');
  }
  return await response.json();
}


/*export async function fetchProjectById(projectId) {
  const encodedString = encodeURIComponent(projectId);
  console.warn("Fetching project with ID:", projectId);
  const url = `${BASE_PATH}/${encodedString}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener el proyecto");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}*/

export async function fetchProjectById(projectId) {
  try {
    const response = await fetch(`${API_BASE_URL}/fetchProjectById?projectId=${encodeURIComponent(projectId)}`);
    const result = await response.json();
    return result.success ? result.project : null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function createProject(projectData) {
  try {
    const response = await fetch(`${API_BASE_URL}/createProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Proyecto creado:", result.project);
      return result.project;
    } else {
      console.error("Error al crear el proyecto:", result.error);
      return null;
    }
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    return null;
  }
}

export async function updateProject(projectId, projectData) {
  try {
    const response = await fetch(`${API_BASE_URL}/updateProject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId, projectData }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProject(projectId) {
  try {
    const response = await fetch(`${API_BASE_URL}/deleteProject`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
}
