import fs from 'fs/promises';
import path from 'path';
import type { Clip } from '@/types';

const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];

export function getVideoExtensions(): string[] {
  return VIDEO_EXTENSIONS;
}

export async function scanClipsFolder(folderPath: string): Promise<Clip[]> {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  const videoFiles = entries.filter(
    (entry) =>
      entry.isFile() &&
      VIDEO_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())
  );

  return videoFiles.map((entry) => ({
    id: crypto.randomUUID(),
    filename: entry.name,
    absolutePath: path.join(folderPath, entry.name),
    type: 'broll' as const,
    durationSeconds: 0,
    thumbnailPath: undefined,
  }));
}
