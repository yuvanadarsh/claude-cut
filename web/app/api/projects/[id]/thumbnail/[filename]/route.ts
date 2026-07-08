import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getThumbnailsDir } from '@/lib/projects';

interface RouteParams {
  params: { id: string; filename: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const filePath = path.join(getThumbnailsDir(params.id), path.basename(params.filename));

  try {
    const data = await fs.readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      headers: { 'Content-Type': 'image/jpeg' },
    });
  } catch {
    return NextResponse.json({ error: 'Thumbnail not found' }, { status: 404 });
  }
}
