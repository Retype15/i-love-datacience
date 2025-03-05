'use client';

import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch('/api/projects/list');
      const data = await response.json();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Proyectos de Ciencia de Datos</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
