import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DropdownMenu from '../components/DropdownMenu';
import { fetchProjectById } from '../utils/api';
import marked from 'marked';

export default function ProjectPage() {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId).then(data => setProject(data));
    }
  }, [projectId]);

  if (!project) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <DropdownMenu 
          onEdit={() => console.log("Editar", project)}
          onDelete={() => console.log("Eliminar", project)}
          onOptions={() => console.log("Opciones", project)}
        />
      </div>
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <div className="my-4">
        <iframe 
          width="560" 
          height="315" 
          src={project.video.replace("watch?v=", "embed/")} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="space-y-4">
        {project.contents.map((item, index) => (
          <div key={index} className="p-4 border rounded">
            {item.type === 'markdown' ? (
              <div dangerouslySetInnerHTML={{ __html: marked(item.content) }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
