// Lista de proyectos 
import ProjectItem from './ProjectItem';

export default function ProjectList({ projects, onEdit, onDelete, onOptions }) {
  console.log("ProjectList:", projects);
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectItem 
          key={project.id} 
          project={project} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onOptions={onOptions} 
        />
      ))}
    </div>
  );
}
