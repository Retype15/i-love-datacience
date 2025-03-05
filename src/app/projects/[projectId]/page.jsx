// src/app/projects/[projectId]/page.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import PlotlyChart from '../../../components/PlotlyChart';
import YouTubeEmbed from '../../../components/YouTubeEmbed';
import { getDownloadUrl } from '@vercel/blob';

export default async function ProjectPage({ params }) {
  const { projectId } = await params;

  const blobUrl = `https://3kd8fds38lvbrrcg.public.blob.vercel-storage.com/__i-love-datacience/projects/${encodeURIComponent(projectId)}.json`;

  const res = await fetch(blobUrl);
  console.log('Response:', res);
  if (!res.ok) {
    return <p className="text-red-500">Error al cargar el proyecto.</p>;
  }

  const project = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Video de Presentación</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${extractYouTubeID(project.videoUrl)}`}
            title="Video de presentación"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contenido Markdown</h2>
        <div className="prose">
          <ReactMarkdown>{project.markdown}</ReactMarkdown>
        </div>
      </section>

      {project.charts && project.charts.map((chart, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{chart.title}</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <PlotlyChart data={chart.data} layout={chart.layout} />
          </div>
        </div>
      ))}

      {project.fileUrl && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Descargar archivo del proyecto</h3>
          <a
            href={project.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Descargar archivo
          </a>
        </section>
      )}
    </div>
  );
}

function extractYouTubeID(url) {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
