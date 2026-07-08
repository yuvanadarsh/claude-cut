'use client';

import React, { useState } from 'react';

interface Section {
  id: string;
  index: number;
  text: string;
  durationSeconds: number;
  assignedClipId?: string;
}

interface ScriptSectionProps {
  section: Section;
  sectionColor: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function ScriptSection({ section, sectionColor, isSelected, onSelect }: ScriptSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderLeft: `3px solid ${sectionColor}`,
        backgroundColor: isSelected ? '#202020' : 'var(--surface-raised)',
        borderRadius: 6,
        padding: 16,
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 150ms ease, filter 150ms ease',
        filter: isHovered || isSelected ? 'brightness(1.15)' : 'none',
      }}
    >
      {/* Section number — top right */}
      <span
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--text-muted)',
        }}
      >
        {section.index + 1}
      </span>

      {/* Section text */}
      <p
        style={{
          fontSize: 14,
          color: 'var(--text-primary)',
          lineHeight: 1.6,
          margin: 0,
          paddingRight: 20,
        }}
      >
        {section.text}
      </p>

      {/* Duration */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: 'var(--text-muted)',
          marginTop: 8,
        }}
      >
        ~{section.durationSeconds}s
      </div>

      {/* Clip assignment status */}
      {!section.assignedClipId && (
        <div
          style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            marginTop: 4,
          }}
        >
          No clip assigned
        </div>
      )}
    </div>
  );
}

export default ScriptSection;
