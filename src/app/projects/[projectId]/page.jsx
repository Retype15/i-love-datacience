// src/app/projects/[projectId]/page.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import PlotlyChart from '../../../components/PlotlyChart';
import YouTubeEmbed from '../../../components/YouTubeEmbed';

export default async function ProjectPage({ params }) {
  // Asegurarse de que `params` se resuelva correctamente.
  const { projectId } = await params;  // Esto asegura que `params` se resuelva como una promesa.

  // URL para obtener el JSON del proyecto desde Vercel (ajustar el dominio correctamente)
  const blobUrl = `https://i-love-datacience.vercel.app/__i-love-datacience/projects/${encodeURIComponent(projectId)}.json`;

  // Obtener el JSON del proyecto
  const res = await fetch(blobUrl);
  if (!res.ok) {
    return <p>Error al cargar el proyecto.</p>;
  }
  
  const project = await res.json();

  // Mostrar la página del proyecto con su información
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{project.title}</h1>

      {/* Video de presentación de YouTube */}
      <section>
        <h2>Video de Presentación</h2>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${extractYouTubeID(project.videoUrl)}`}
          title="Video de presentación"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      {/* Contenido Markdown */}
      <section>
        <h2>Contenido Markdown</h2>
        <ReactMarkdown>{project.markdown}</ReactMarkdown>
      </section>

      {/* Gráficos con Plotly */}
      {project.charts && project.charts.map((chart, index) => (
        <div key={index}>
          <h3>{chart.title}</h3>
          <PlotlyChart data={chart.data} layout={chart.layout} />
        </div>
      ))}

      {/* Enlace para descargar el archivo asociado al proyecto */}
      {project.fileUrl && (
        <section>
          <h3>Descargar archivo del proyecto</h3>
          <a href={project.fileUrl} target="_blank" rel="noopener noreferrer">
            Descargar archivo
          </a>
        </section>
      )}
    </div>
  );
}

// Función auxiliar para extraer el ID del video de YouTube desde la URL
function extractYouTubeID(url) {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
