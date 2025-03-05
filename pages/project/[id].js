// pages/project/[id].js
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import Plot from "react-plotly.js";

export default function Project({ project }) {
  if (!project) return <div>Proyecto no encontrado</div>;

  let plotlyData = null;
  let plotlyLayout = null;
  if (project.plotly) {
    try {
      const parsed = JSON.parse(project.plotly);
      plotlyData = parsed.data;
      plotlyLayout = parsed.layout;
    } catch (e) {
      // error al parsear
    }
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <h2>Descripción</h2>
      <div>
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </div>

      {project.video && (
        <div>
          <h2>Video de presentación</h2>
          <video width="640" controls>
            <source src={`/api/uploads/video/${project.video}`} type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
      )}

      {project.plotly && plotlyData && (
        <div>
          <h2>Gráfica Interactiva</h2>
          <Plot data={plotlyData} layout={plotlyLayout} />
        </div>
      )}

      {project.html && (
        <div>
          <h2>Contenido Adicional</h2>
          <iframe src={`/api/uploads/html/${project.html}`} width="100%" height="500"></iframe>
        </div>
      )}

      <br />
      <a href="/">Volver</a>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/projects/${id}`);
  const data = await res.json();
  return {
    props: {
      project: data.project || null
    }
  };
}
