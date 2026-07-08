import React from 'react';
import { ClipThumbnail } from './ClipThumbnail';

const MOCK_CLIPS = [
  { id: '1', filename: 'nyc-drive.mp4', durationSeconds: 32 },
  { id: '2', filename: 'times-square.mp4', durationSeconds: 45 },
  { id: '3', filename: 'broadway-exterior.mp4', durationSeconds: 15 },
  { id: '4', filename: 'walmart-pepsi.mp4', durationSeconds: 8 },
  { id: '5', filename: 'ramen-bowl.mp4', durationSeconds: 12 },
  { id: '6', filename: 'bagel-2am.mp4', durationSeconds: 20 },
];

export function ClipPanel() {
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
        {MOCK_CLIPS.map((clip) => (
          <ClipThumbnail key={clip.id} clip={clip} />
        ))}
      </div>
    </div>
  );
}

export default ClipPanel;
