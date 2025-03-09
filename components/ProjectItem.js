import Link from 'next/link';
import DropdownMenu from './DropdownMenu';

export default function ProjectItem({ project, onEdit, onDelete, onOptions }) {
  const fileName = project.pathname.split('/').pop().split('.')[0];

  return (
    <div className="p-4 border rounded-lg flex justify-between items-center bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md transition-colors duration-300">
      <Link href={`/${encodeURIComponent(fileName)}`} legacyBehavior>
        <a className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
          {fileName}
        </a>
      </Link>
      <span className="text-gray-500 dark:text-gray-400">{project.title}</span>
      <DropdownMenu 
        onEdit={() => onEdit(project)} 
        onDelete={() => onDelete(project)} 
        onOptions={() => onOptions(project)} 
      />
    </div>
  );
}
