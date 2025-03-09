// Landing page: lista de proyectos y botón para agregar uno nuevo 
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProjectList from '../components/ProjectList';
import { fetchProjects } from '../utils/api';
require('dotenv').config({ path: '.env.local' });

export default function Home() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    // Se debe implementar la lógica para obtener los proyectos almacenados
    fetchProjects().then(data => setProjects(data));
  }, []);
  console.log("Projects:", projects);
  const handleEdit = (project) => {
    // Lógica para editar: podría redirigir a una página de edición
    console.log("Editar", project);
  };

  const handleDelete = (project) => {
    // Lógica para eliminar el proyecto
    console.log("Eliminar", project);
  };

  const handleOptions = (project) => {
    // Lógica para mostrar opciones adicionales
    console.log("Opciones", project);
  };
  
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">i love datacience</h1>
        <Link href="/create" className="px-4 py-2 bg-blue-500 text-white rounded">
            Agregar Proyecto
        </Link>
      </header>
      <ProjectList 
        projects={projects} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onOptions={handleOptions} 
      />
    </div>
  );
}
