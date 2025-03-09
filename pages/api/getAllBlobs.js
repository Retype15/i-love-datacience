import { list } from '@vercel/blob'; // Asegúrate de importar la función `list` correctamente

export default async function handler(req, res) {
  try {
    const response = await list();
    
    // Construye un array con los enlaces de descarga
    const projects = response.blobs.map(blob => ({
      pathname: blob.pathname,
      downloadUrl: blob.downloadUrl,
    }));
    
    // Envía la respuesta en formato JSON
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
}
