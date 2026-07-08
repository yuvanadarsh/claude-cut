import { NextRequest, NextResponse } from 'next/server';
import { getProject, saveProject } from '@/lib/projects';
import type { Project } from '@/types';

interface RouteParams {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const project = await getProject(params.id);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const existing = await getProject(params.id);
  if (!existing) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const updates = (await request.json()) as Partial<Project>;
  const updated: Project = {
    ...existing,
    ...updates,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };

  await saveProject(updated);
  return NextResponse.json(updated);
}
