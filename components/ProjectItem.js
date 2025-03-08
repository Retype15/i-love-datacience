// Representa un proyecto en la lista 
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';

export default function ProjectItem({ project, onEdit, onDelete, onOptions }) {
  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <Link href={`/${project.id}`}>
        <a className="text-lg font-semibold">{project.title}</a>
      </Link>
      <DropdownMenu 
        onEdit={() => onEdit(project)} 
        onDelete={() => onDelete(project)} 
        onOptions={() => onOptions(project)} 
      />
    </div>
  );
}
