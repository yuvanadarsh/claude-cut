'use client';

import React, { useState } from 'react';
import { Film } from 'lucide-react';

interface Clip {
  id: string;
  filename: string;
  durationSeconds: number;
}

interface ClipThumbnailProps {
  clip: Clip;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export function ClipThumbnail({ clip }: ClipThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--surface-raised)',
        border: `1px solid ${isHovered ? 'var(--border-active)' : 'var(--border)'}`,
        borderRadius: 6,
        overflow: 'hidden',
        transition: 'border-color 150ms ease',
        cursor: 'pointer',
      }}
    >
      {/* Thumbnail area */}
      <div
        style={{
          height: 100,
          backgroundColor: '#1A1A1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Film size={24} color="var(--text-muted)" />
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>
              Assign to section
            </span>
          </div>
        )}
      </div>

      {/* Bottom info area */}
      <div style={{ padding: 8 }}>
        <div
          style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {clip.filename}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--text-muted)',
            marginTop: 2,
          }}
        >
          {formatDuration(clip.durationSeconds)}
        </div>
      </div>
    </div>
  );
}

export default ClipThumbnail;
