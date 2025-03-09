// pages/project/[projectId].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DropdownMenu from '../components/DropdownMenu'; // Asegúrate de que la ruta sea correcta
import { fetchProjectById } from '../utils/api'; // Asegúrate de que la ruta sea correcta
import { marked } from 'marked';

export default function ProjectPage() {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (projectId) {
      console.log(projectId);
      fetchProjectById(projectId)
        .then(data => setProject(data))
        .catch(err => console.error('Error fetching project:', err));
    }
  }, [router.isReady, projectId]);

  if (!router.isReady || !project) return <div className="text-center mt-16 text-gray-600 dark:text-gray-400">Cargando...</div>;

  const getVideoUrl = url => {
    if (url.includes('youtu.be')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  };

  const videoUrl = project.video ? getVideoUrl(project.video) : '';

  return (
    <div className={`container mx-auto p-4 ${darkMode ? 'dark' : ''} dark:bg-gray-900 dark:text-white transition-colors duration-300`}>
      <div className="relative">
        <DropdownMenu
          onEdit={() => console.log('Editar', project)}
          onDelete={() => console.log('Eliminar', project)}
          onOptions={() => console.log('Opciones', project)}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-center my-6">{project.title}</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 bg-blue-500 text-white rounded">
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </div>
      <div className="my-6 flex justify-center">
        {videoUrl ? (
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
            allow="picture-in-picture"
          ></iframe>
        ) : (
          <p className="text-center text-red-500">No se proporcionó un video de presentación.</p>
        )}
      </div>
      <div className="space-y-6">
        {project.contents &&
          project.contents.map((item, index) => (
            <div key={index} className="p-6 border rounded shadow-md bg-white dark:bg-gray-800">
              {item.type === 'markdown' ? (
                <div dangerouslySetInnerHTML={{ __html: marked(item.content) }} className="prose dark:prose-dark" />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: item.content }} className="prose dark:prose-dark" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
