// pages/project/[id].js
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import Plot from "react-plotly.js";

// Función auxiliar para extraer el ID del video de YouTube
function extractYouTubeId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

export default function Project({ project }) {
  if (!project) return <div>Proyecto no encontrado</div>;
  const videoId = extractYouTubeId(project.youtube);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{project.title}</h1>
      {embedUrl && (
        <div>
          <h2>Video de Presentación</h2>
          <iframe 
            width="560" 
            height="315" 
            src={embedUrl} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div>
        <h2>Contenido</h2>
        {project.sections.map((cell, idx) => (
          <div key={idx} style={{ marginBottom: "2rem", border: "1px solid #eee", padding: "1rem" }}>
            {cell.type === "markdown" && (
              <ReactMarkdown>{cell.content}</ReactMarkdown>
            )}
            {cell.type === "graph" && (() => {
              let graphData = {};
              try {
                graphData = JSON.parse(cell.content);
              } catch (error) {
                return <div>Error al parsear el JSON de la gráfica.</div>;
              }
              return (
                <Plot
                  data={graphData.data || []}
                  layout={graphData.layout || {}}
                  style={{ width: "100%" }}
                />
              );
            })()}
          </div>
        ))}
      </div>
      <a href="/">Volver</a>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const protocol = process.env.VERCEL_URL ? "https" : "http";
  const host = process.env.VERCEL_URL || "localhost:3000";
  const res = await fetch(`${protocol}://${host}/api/projects/${params.id}`);
  const data = await res.json();
  return { props: { project: data.project || null } };
}
