import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  const { blobs } = await list({ prefix: '__i-love-datacience/projects/' });

  const projects = blobs.map((blob) => ({
    id: blob.url.split('/').pop().replace('.json', ''),
    title: blob.url.split('/').pop().replace('.json', '').replace(/-/g, ' ')
  }));

  return NextResponse.json(projects);
}
