// pages/index.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home({ projects }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [youtube, setYoutube] = useState("");
  const [sections, setSections] = useState([]);

  // Agregar una nueva sección vacía
  const addSection = () => {
    setSections([...sections, { type: "markdown", content: "" }]);
  };

  // Actualizar una sección específica
  const updateSection = (index, field, value) => {
    const newSections = sections.slice();
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, youtube, sections };
    const res = await fetch("/api/createProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.id) {
      router.push(`/project/${data.id}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crear un nuevo proyecto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br />
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Enlace al video de presentación (YouTube):</label><br />
          <input 
            type="url" 
            value={youtube} 
            onChange={(e) => setYoutube(e.target.value)} 
            required 
          />
        </div>
        <div>
          <h2>Secciones (como celdas de Jupyter)</h2>
          {sections.map((section, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
              <label>Tipo:</label>{" "}
              <select
                value={section.type}
                onChange={(e) => updateSection(index, "type", e.target.value)}
              >
                <option value="markdown">Markdown</option>
                <option value="graph">Gráfica (Plotly JSON)</option>
              </select>
              <br />
              <label>Contenido:</label><br />
              <textarea
                rows="5"
                cols="50"
                value={section.content}
                onChange={(e) => updateSection(index, "content", e.target.value)}
              ></textarea>
            </div>
          ))}
          <button type="button" onClick={addSection}>Agregar Sección</button>
        </div>
        <br />
        <button type="submit">Crear Proyecto</button>
      </form>

      <h2>Proyectos existentes</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <a href={`/project/${project.id}`}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Se obtienen los proyectos desde el API (que lee los archivos en __i-love-datacience/projects)
export async function getServerSideProps() {
  const protocol = process.env.VERCEL_URL ? "https" : "http";
  const host = process.env.VERCEL_URL || "localhost:3000";
  const res = await fetch(`${protocol}://${host}/api/projects`);
  const data = await res.json();
  return { props: { projects: data.projects || [] } };
}
