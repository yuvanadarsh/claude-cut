'use client';

import React, { useState } from 'react';
import { ScriptSection } from './ScriptSection';

const SECTION_COLORS = ['#4A7C6F', '#7C4A6A', '#4A5C7C', '#7C6A4A'];

const MOCK_SECTIONS = [
  {
    id: '1',
    index: 0,
    text: "Alright, so last weekend we packed up the car and drove six hours to New York City. No plans, no reservations — just vibes.",
    durationSeconds: 4,
  },
  {
    id: '2',
    index: 1,
    text: "We hit Times Square first because, yeah, it's touristy, but at night it genuinely slaps. The energy is actually unreal.",
    durationSeconds: 5,
  },
  {
    id: '3',
    index: 2,
    text: "Broadway show was a last-minute thing. We grabbed discount tickets outside the theater and somehow ended up in the third row.",
    durationSeconds: 6,
  },
  {
    id: '4',
    index: 3,
    text: "Food was the highlight though. We ate at like 6 different places in one day — dollar pizza, ramen, and this insane bagel place at 2am.",
    durationSeconds: 5,
  },
];

export function ScriptPanel() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div
      style={{
        width: '55%',
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
        SCRIPT
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {MOCK_SECTIONS.map((section) => (
          <ScriptSection
            key={section.id}
            section={section}
            sectionColor={SECTION_COLORS[section.index]}
            isSelected={selectedId === section.id}
            onSelect={() => setSelectedId(section.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ScriptPanel;
