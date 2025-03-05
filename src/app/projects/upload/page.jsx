// src/app/projects/upload/page.jsx
'use client';

import { useState, useRef } from 'react';

export default function ProjectUploadPage() {
  const [projectId, setProjectId] = useState(null);
  const [message, setMessage] = useState('');

  // Referencias a los campos del formulario
  const titleRef = useRef(null);
  const videoRef = useRef(null);
  const markdownRef = useRef(null);
  // Se pueden agregar más refs para gráficos, animaciones u otros servicios

  const handleSubmit = async (event) => {
    event.preventDefault();
    const projectData = {
      title: titleRef.current.value,
      videoUrl: videoRef.current.value,
      markdown: markdownRef.current.value,
      // Aquí se pueden agregar otros campos según se necesite
    };

    const response = await fetch('/api/projects/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    const result = await response.json();
    if (result.success) {
      setProjectId(result.projectId);
      setMessage('¡Proyecto subido exitosamente!');
    } else {
      setMessage('Error al subir el proyecto: ' + result.error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Subir Proyecto de Ciencias de Datos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>Título del Proyecto:</strong></label>
          <br />
          <input type="text" ref={titleRef} required style={{ width: '100%' }} />
        </div>
        <br />
        <div>
          <label><strong>URL del Video de Presentación (YouTube):</strong></label>
          <br />
          <input type="url" ref={videoRef} required style={{ width: '100%' }} />
        </div>
        <br />
        <div>
          <label><strong>Contenido Markdown:</strong></label>
          <br />
          <textarea ref={markdownRef} required style={{ width: '100%', height: '200px' }} />
        </div>
        <br />
        {/* Se pueden agregar más campos dinámicos para gráficas, animaciones, etc. */}
        <button type="submit">Subir Proyecto</button>
      </form>
      {message && <p>{message}</p>}
      {projectId && (
        <p>
          Accede a tu proyecto en: <a href={`/projects/${projectId}`}>Proyecto {projectId}</a>
        </p>
      )}
    </div>
  );
}
