import { NextRequest, NextResponse } from 'next/server';
import { listProjects, createProject } from '@/lib/projects';
import type { ProjectFormat } from '@/types';

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, format, clipsFolder, topic } = body as {
    name: string;
    format: ProjectFormat;
    clipsFolder: string;
    topic: string;
  };

  const project = await createProject({ name, format, clipsFolder, topic });
  return NextResponse.json(project, { status: 201 });
}
