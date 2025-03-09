import Link from 'next/link';
import DropdownMenu from './DropdownMenu';

export default function ProjectItem({ project, onEdit, onDelete, onOptions }) {
  const fileName = project.pathname.split('/').pop().split('.')[0];
  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <Link href={`/${encodeURIComponent(fileName)}`} legacyBehavior>
        <a className="text-lg font-semibold">{fileName}</a>
      </Link>
      <span className="text-gray-500">{project.title}</span>
      <DropdownMenu 
        onEdit={() => onEdit(project)} 
        onDelete={() => onDelete(project)} 
        onOptions={() => onOptions(project)} 
      />
    </div>
  );
}
