// src/app/api/projects/upload/route.js
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Se espera un JSON con los datos del proyecto:
    // { title, videoUrl, markdown, ... }
    const data = await request.json();

    // Generamos un identificador único para el proyecto (puede sustituirse por otro método)
    const projectId = Date.now().toString();

    // Definimos la ruta en Blob donde se almacenará el archivo JSON
    const filePath = `__i-love-datacience/projects/${projectId}.json`;

    // Guardamos la información del proyecto en Blob (como JSON)
    const blob = await put(filePath, JSON.stringify(data), { access: 'public' });

    return NextResponse.json({ success: true, blob, projectId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
