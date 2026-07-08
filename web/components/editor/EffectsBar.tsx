'use client';

import React, { useState } from 'react';

const EFFECTS = ['Zoom Punch', 'Ken Burns', 'Speed Ramp', 'Fade', 'Jump Cut'];

export function EffectsBar() {
  const [activeEffects, setActiveEffects] = useState<string[]>([]);

  function toggleEffect(effect: string) {
    setActiveEffects((prev) =>
      prev.includes(effect) ? prev.filter((e) => e !== effect) : [...prev, effect]
    );
  }

  return (
    <div
      style={{
        height: 52,
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 8,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: 12,
          color: 'var(--text-muted)',
          marginRight: 16,
          whiteSpace: 'nowrap',
        }}
      >
        Effects for section 1
      </span>
      {EFFECTS.map((effect) => {
        const isActive = activeEffects.includes(effect);
        return (
          <button
            key={effect}
            onClick={() => toggleEffect(effect)}
            style={{
              backgroundColor: isActive ? 'var(--accent)' : 'var(--surface-raised)',
              color: isActive ? '#000' : 'var(--text-secondary)',
              fontWeight: isActive ? 600 : 400,
              border: isActive ? 'none' : '1px solid var(--border)',
              borderRadius: 16,
              padding: '0 14px',
              height: 30,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'background-color 150ms ease, color 150ms ease',
              fontFamily: 'inherit',
            }}
          >
            {effect}
          </button>
        );
      })}
    </div>
  );
}

export default EffectsBar;
