'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScriptSection } from '@/components/editor/ScriptSection';

const TONES = ['Casual', 'Educational', 'Hype', 'Storytelling'];

const MOCK_SECTIONS = [
  {
    id: '1',
    index: 0,
    text: "We drove six hours on a Friday night, arrived at midnight, and immediately went to get dollar pizza. That's how you know it's a real NYC trip.",
    durationSeconds: 4,
  },
  {
    id: '2',
    index: 1,
    text: "Times Square at 2am hits different. I know everyone says it's touristy but at night the energy is actually kind of incredible.",
    durationSeconds: 5,
  },
  {
    id: '3',
    index: 2,
    text: "The Broadway thing was completely unplanned. We bought discount tickets outside the theater and somehow ended up in the third row for a show I'd been wanting to see for years.",
    durationSeconds: 6,
  },
];

const SECTION_COLORS = ['#4A7C6F', '#7C4A6A', '#4A5C7C'];

const HASHTAGS = ['#nyc', '#weekendtrip', '#travel', '#reels', '#nycvlog'];

interface ScriptPageProps {
  params: { id: string };
}

export default function ScriptPage({ params }: ScriptPageProps) {
  const [tone, setTone] = useState('Casual');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        projectName="NYC Weekend Vlog"
        status="scripted"
        activePage="script"
        projectId={params.id}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar title="Script" />
        <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
          <div style={{ maxWidth: 720 }}>

            {/* Form section */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: 8,
                }}
              >
                Topic
              </label>
              <textarea
                defaultValue="A weekend trip to NYC — come with me style vlog with narration over b-roll."
                style={{
                  width: '100%',
                  minHeight: 100,
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: 12,
                  fontSize: 14,
                  color: 'var(--text-primary)',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />

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
                Tone
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {TONES.map((t) => {
                  const isActive = tone === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
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
                      {t}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="primary"
                style={{ width: '100%', marginTop: 24 }}
              >
                Generate Script
              </Button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: 'var(--border)', margin: '32px 0' }} />

            {/* Hook card */}
            <div
              style={{
                backgroundColor: 'var(--surface-raised)',
                borderLeft: '3px solid var(--accent)',
                borderRadius: 6,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                }}
              >
                HOOK
              </div>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Alright so I just got back from New York and I need to tell you everything because it was absolutely unhinged.
              </p>
            </div>

            {/* Script sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {MOCK_SECTIONS.map((section) => (
                <ScriptSection
                  key={section.id}
                  section={section}
                  sectionColor={SECTION_COLORS[section.index]}
                  isSelected={false}
                  onSelect={() => {}}
                />
              ))}
            </div>

            {/* Caption card */}
            <div
              style={{
                backgroundColor: 'var(--surface-raised)',
                borderRadius: 6,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                }}
              >
                CAPTION
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-primary)', margin: 0, lineHeight: 1.6 }}>
                {"POV: you say 'let’s just go to NYC this weekend' on a Thursday night and actually do it 🗽✨ sometimes the unplanned trips are the best ones #nyc #weekendtrip #travel #reels"}
              </p>
            </div>

            {/* Hashtags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {HASHTAGS.map((tag) => (
                <Badge key={tag} variant="muted">{tag}</Badge>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <Button variant="primary">Use This Script</Button>
              <Button variant="secondary">Regenerate</Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
