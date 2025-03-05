// src/app/projects/[projectId]/page.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';

// Si se van a incluir gráficas interactivas con plotly, se pueden cargar dinámicamente
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default async function ProjectPage({ params }) {
  const { projectId } = params;

  // NOTA: La URL para obtener el JSON dependerá de cómo Vercel Blob exponga los archivos.
  // Aquí se asume que los archivos se pueden obtener desde la misma ruta pública.
  const blobUrl = `https://<tu-dominio-vercel>/${encodeURIComponent(`__i-love-datacience/projects/${projectId}.json`)}`;

  const res = await fetch(blobUrl);
  if (!res.ok) {
    return <p>Error al cargar el proyecto.</p>;
  }
  const project = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{project.title}</h1>

      <section>
        <h2>Video de Presentación</h2>
        {extractYouTubeID(project.videoUrl) ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${extractYouTubeID(project.videoUrl)}`}
            title="Video de presentación"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>URL de video inválida.</p>
        )}
      </section>

      <section>
        <h2>Contenido Markdown</h2>
        <ReactMarkdown>{project.markdown}</ReactMarkdown>
      </section>

      {/* 
        Se pueden agregar secciones para gráficos interactivos, animaciones u otros componentes.
        Por ejemplo, si en el JSON se incluye un array de configuraciones de gráficos:
        
        {project.charts && project.charts.map((chart, index) => (
          <div key={index}>
            <h3>{chart.title}</h3>
            <Plot data={chart.data} layout={chart.layout} />
          </div>
        ))}
      */}
    </div>
  );
}

// Función auxiliar para extraer el ID del video de YouTube a partir de la URL
function extractYouTubeID(url) {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
