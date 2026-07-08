import { exec } from 'child_process';
import { promisify } from 'util';
import type { Clip } from '@/types';

const execAsync = promisify(exec);

export async function getVideoDuration(filePath: string): Promise<number> {
  try {
    const { stdout } = await execAsync(
      `ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${filePath}"`
    );
    const duration = parseFloat(stdout.trim());
    return Number.isFinite(duration) ? duration : 0;
  } catch {
    return 0;
  }
}

export async function generateThumbnail(
  videoPath: string,
  outputPath: string
): Promise<boolean> {
  try {
    await execAsync(
      `ffmpeg -y -i "${videoPath}" -ss 00:00:01 -vframes 1 -vf "scale=320:180:force_original_aspect_ratio=decrease,pad=320:180:(ow-iw)/2:(oh-ih)/2" "${outputPath}"`
    );
    return true;
  } catch {
    return false;
  }
}

export async function processClips(
  clips: Clip[],
  thumbnailsDir: string
): Promise<Clip[]> {
  const fs = await import('fs/promises');
  const path = await import('path');
  await fs.mkdir(thumbnailsDir, { recursive: true });

  return Promise.all(
    clips.map(async (clip) => {
      const thumbnailFilename = `${clip.id}.jpg`;
      const thumbnailOutputPath = path.join(thumbnailsDir, thumbnailFilename);

      const [durationSeconds, thumbnailGenerated] = await Promise.all([
        getVideoDuration(clip.absolutePath),
        generateThumbnail(clip.absolutePath, thumbnailOutputPath),
      ]);

      return {
        ...clip,
        durationSeconds,
        thumbnailPath: thumbnailGenerated ? thumbnailFilename : undefined,
      };
    })
  );
}
