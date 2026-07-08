import { NextRequest, NextResponse } from 'next/server';
import { getProject, getThumbnailsDir, saveProject } from '@/lib/projects';
import { scanClipsFolder } from '@/lib/clips';
import { processClips } from '@/lib/ffmpeg';

interface RouteParams {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const project = await getProject(params.id);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const scannedClips = await scanClipsFolder(project.clipsFolder);
  const clips = await processClips(scannedClips, getThumbnailsDir(params.id));

  await saveProject({
    ...project,
    assembly: {
      ...project.assembly,
      clips,
    },
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json(clips);
}
