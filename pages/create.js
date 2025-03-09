// Página para crear un nuevo proyecto 
import { useRouter } from 'next/router';
import ProjectForm from '../components/ProjectForm';
import { createProject } from '../utils/api';

export default function CreateProject() {
  const router = useRouter();
  const handleSubmit = async (projectData) => {
    // Se crea un nuevo proyecto; se asigna un ID (por ejemplo, usando la marca de tiempo)
    const newProject = await createProject(projectData);
    // Redirigir a la página del proyecto creado
    router.push(`/${encodeURIComponent(newProject.id)}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Proyecto</h1>
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
}
