import React from 'react';
import { ClipThumbnail } from './ClipThumbnail';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Clip } from '@/types';

interface ClipPanelProps {
  clips: Clip[];
  loading: boolean;
  projectId: string;
}

export function ClipPanel({ clips, loading, projectId }: ClipPanelProps) {
  return (
    <div
      style={{
        flex: 1,
        padding: 24,
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 16,
        }}
      >
        CLIPS
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
        }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={144} />
            ))
          : clips.map((clip) => (
              <ClipThumbnail key={clip.id} clip={clip} projectId={projectId} />
            ))}
      </div>
    </div>
  );
}

export default ClipPanel;
