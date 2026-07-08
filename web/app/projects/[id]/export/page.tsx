'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';

const QUALITY_OPTIONS = ['Draft', 'Standard', 'High'];
const FPS_OPTIONS = ['30fps', '60fps'];
const POSITION_OPTIONS = ['Bottom', 'Center', 'Top'];
const COLOR_PRESETS = ['#FFFFFF', '#FFE347', '#47F0FF', '#000000'];

function getPillBorderRadius(index: number, total: number): string {
  if (total === 1) return '4px';
  if (index === 0) return '4px 0 0 4px';
  if (index === total - 1) return '0 4px 4px 0';
  return '0';
}

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div style={{ display: 'flex' }}>
      {options.map((opt, i) => {
        const isActive = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              backgroundColor: isActive ? 'var(--accent)' : 'var(--surface-raised)',
              color: isActive ? '#000' : 'var(--text-secondary)',
              fontWeight: isActive ? 600 : 400,
              border: '1px solid var(--border)',
              borderLeft: i === 0 ? '1px solid var(--border)' : 'none',
              borderRadius: getPillBorderRadius(i, options.length),
              padding: '0 16px',
              height: 32,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'background-color 150ms ease, color 150ms ease',
              fontFamily: 'inherit',
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

interface ExportPageProps {
  params: { id: string };
}

export default function ExportPage({ params }: ExportPageProps) {
  const [quality, setQuality] = useState('Standard');
  const [fps, setFps] = useState('30fps');
  const [burnSubtitles, setBurnSubtitles] = useState(true);
  const [fontSize, setFontSize] = useState(24);
  const [position, setPosition] = useState('Bottom');
  const [subtitleColor, setSubtitleColor] = useState('#FFFFFF');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        projectName="NYC Weekend Vlog"
        status="draft"
        activePage="export"
        projectId={params.id}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar title="Export" />
        <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
          <div style={{ maxWidth: 600 }}>

            {/* Quality */}
            <label
              style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                marginBottom: 8,
              }}
            >
              Quality
            </label>
            <SegmentedControl options={QUALITY_OPTIONS} value={quality} onChange={setQuality} />

            {/* Frame rate */}
            <label
              style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                marginTop: 20,
                marginBottom: 8,
              }}
            >
              Frame rate
            </label>
            <SegmentedControl options={FPS_OPTIONS} value={fps} onChange={setFps} />

            {/* Subtitles toggle */}
            <label
              style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                marginTop: 20,
                marginBottom: 8,
              }}
            >
              Subtitles
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                onClick={() => setBurnSubtitles(!burnSubtitles)}
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: burnSubtitles ? 'var(--accent)' : 'var(--border)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 150ms ease',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: 2,
                    left: burnSubtitles ? 20 : 2,
                    transition: 'left 150ms ease',
                  }}
                />
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {burnSubtitles ? 'On' : 'Off'}
              </span>
            </div>

            {/* Subtitle options */}
            {burnSubtitles && (
              <div
                style={{
                  marginTop: 16,
                  padding: 16,
                  backgroundColor: 'var(--surface-raised)',
                  borderRadius: 6,
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                {/* Font size */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: 8,
                    }}
                  >
                    Font size
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input
                      type="range"
                      min={16}
                      max={48}
                      step={2}
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      style={{ flex: 1, accentColor: 'var(--accent)' }}
                    />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 13,
                        color: 'var(--text-muted)',
                        minWidth: 30,
                        textAlign: 'right',
                      }}
                    >
                      {fontSize}
                    </span>
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: 8,
                    }}
                  >
                    Position
                  </label>
                  <SegmentedControl
                    options={POSITION_OPTIONS}
                    value={position}
                    onChange={setPosition}
                  />
                </div>

                {/* Color */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: 8,
                    }}
                  >
                    Color
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {COLOR_PRESETS.map((color) => (
                      <div
                        key={color}
                        onClick={() => setSubtitleColor(color)}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: color,
                          cursor: 'pointer',
                          outline: subtitleColor === color ? '2px solid var(--accent)' : 'none',
                          outlineOffset: 2,
                          border: color === '#FFFFFF' ? '1px solid var(--border)' : 'none',
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Export button */}
            <Button
              variant="primary"
              style={{ width: '100%', marginTop: 32, height: 48, fontSize: 16 }}
            >
              Export Reel
            </Button>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: 'var(--border)', margin: '32px 0' }} />

            {/* Progress section */}
            <div>
              <div
                style={{
                  width: '100%',
                  height: 6,
                  backgroundColor: 'var(--border)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '60%',
                    height: '100%',
                    backgroundColor: 'var(--accent)',
                    borderRadius: 3,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  marginTop: 8,
                }}
              >
                Assembling clips...
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
