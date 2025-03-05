// src/app/page.jsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido a i-Love-DataScience</h1>
      <p>Explora y comparte proyectos de ciencia de datos.</p>
      <div style={{ marginTop: '1rem' }}>
        <Link href="/projects/upload">
          <button style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
            Crear y Subir Proyecto
          </button>
        </Link>
      </div>
    </div>
  );
}
