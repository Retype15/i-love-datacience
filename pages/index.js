// pages/index.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home({ projects }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    plotly: null,
    html: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.video) data.append("video", formData.video);
    if (formData.plotly) data.append("plotly", formData.plotly);
    if (formData.html) data.append("html", formData.html);

    const res = await fetch("/api/createProject", {
      method: "POST",
      body: data
    });
    const json = await res.json();
    if (json.id) {
      router.push(`/project/${json.id}`);
    }
  };

  return (
    <div>
      <h1>Crear un nuevo proyecto</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Título:</label><br/>
        <input type="text" name="title" onChange={handleChange} required /><br/><br/>

        <label>Descripción (Markdown):</label><br/>
        <textarea name="description" onChange={handleChange} rows="10" cols="50"></textarea><br/><br/>

        <label>Video de presentación (mp4, webm, ogg):</label><br/>
        <input type="file" name="video" accept="video/mp4,video/webm,video/ogg" onChange={handleChange} /><br/><br/>

        <label>Gráfica Plotly (JSON):</label><br/>
        <input type="file" name="plotly" accept=".json" onChange={handleChange} /><br/><br/>

        <label>Archivo HTML para animaciones u otras páginas:</label><br/>
        <input type="file" name="html" accept=".html,.htm" onChange={handleChange} /><br/><br/>

        <button type="submit">Crear Proyecto</button>
      </form>

      <h2>Proyectos existentes</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <a href={`/project/${project.id}`}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  // Se obtiene la lista de proyectos desde la API interna.
  const res = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/projects`);
  const data = await res.json();
  return {
    props: {
      projects: data.projects || []
    }
  };
}
