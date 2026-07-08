import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import type { Project, ProjectFormat } from '@/types';

export function getProjectsDir(): string {
  return path.join(os.homedir(), '.claude-cut', 'projects');
}

export function getThumbnailsDir(projectId: string): string {
  return path.join(getProjectsDir(), projectId, 'thumbnails');
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

export async function listProjects(): Promise<Project[]> {
  const dir = getProjectsDir();
  await ensureDir(dir);

  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const jsonFiles = entries.filter((f) => f.endsWith('.json'));
  const projects: Project[] = [];

  for (const file of jsonFiles) {
    try {
      const raw = await fs.readFile(path.join(dir, file), 'utf-8');
      projects.push(JSON.parse(raw) as Project);
    } catch {
      // skip malformed project files
    }
  }

  return projects.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function getProject(id: string): Promise<Project | null> {
  const filePath = path.join(getProjectsDir(), `${id}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Project;
  } catch {
    return null;
  }
}

export async function saveProject(project: Project): Promise<void> {
  const dir = getProjectsDir();
  await ensureDir(dir);
  const filePath = path.join(dir, `${project.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(project, null, 2), 'utf-8');
}

export async function createProject(data: {
  name: string;
  format: ProjectFormat;
  clipsFolder: string;
  topic: string;
}): Promise<Project> {
  const now = new Date().toISOString();
  const project: Project = {
    id: crypto.randomUUID(),
    name: data.name,
    format: data.format,
    status: 'draft',
    clipsFolder: data.clipsFolder,
    createdAt: now,
    updatedAt: now,
    script: {
      topic: data.topic,
      hook: '',
      sections: [],
      caption: '',
      hashtags: [],
    },
  };

  await saveProject(project);
  return project;
}
