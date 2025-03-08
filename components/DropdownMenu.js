// Componente para el menú desplegable (editar, opciones, eliminar) 
import { useState } from 'react';

export default function DropdownMenu({ onEdit, onOptions, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        className="p-2 focus:outline-none" 
        onClick={() => setOpen(!open)}>
        &#x22EE;
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
          <button className="block w-full text-left p-2 hover:bg-gray-100" onClick={onEdit}>Editar</button>
          <button className="block w-full text-left p-2 hover:bg-gray-100" onClick={onOptions}>Opciones</button>
          <button className="block w-full text-left p-2 hover:bg-gray-100" onClick={onDelete}>Eliminar</button>
        </div>
      )}
    </div>
  );
}
