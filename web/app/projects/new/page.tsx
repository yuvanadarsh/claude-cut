'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Video, Mic, Layers, type LucideIcon } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import type { Project } from '@/types';

type Format = 'on-camera' | 'voiceover' | 'hybrid' | '';
type ScanState = { status: 'idle' | 'checking' | 'valid' | 'empty' | 'not-found'; count: number };

const formatOptions: {
  value: 'on-camera' | 'voiceover' | 'hybrid';
  label: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    value: 'on-camera',
    label: 'On Camera',
    description: 'You on screen, talking to camera',
    Icon: Video,
  },
  {
    value: 'voiceover',
    label: 'Voiceover',
    description: 'Your voice over b-roll footage',
    Icon: Mic,
  },
  {
    value: 'hybrid',
    label: 'Hybrid',
    description: 'Mix of on-camera and b-roll',
    Icon: Layers,
  },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        marginBottom: 32,
      }}
    >
      {[1, 2, 3].map((step, i) => (
        <React.Fragment key={step}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor:
                step <= current ? 'var(--accent)' : 'var(--border-active)',
              flexShrink: 0,
              transition: 'background-color 200ms ease',
            }}
          />
          {i < 2 && (
            <div
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'var(--border)',
                minWidth: 40,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [format, setFormat] = useState<Format>('');
  const [folder, setFolder] = useState('');
  const [topic, setTopic] = useState('');
  const [scanState, setScanState] = useState<ScanState>({ status: 'idle', count: 0 });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState(false);
  const folderInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!folder.trim()) {
      setScanState({ status: 'idle', count: 0 });
      return;
    }

    setScanState({ status: 'checking', count: 0 });
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/projects/temp-scan?path=${encodeURIComponent(folder)}`);
        const data = (await res.json()) as { count: number; valid: boolean };
        if (!data.valid) {
          setScanState({ status: 'not-found', count: 0 });
        } else if (data.count === 0) {
          setScanState({ status: 'empty', count: 0 });
        } else {
          setScanState({ status: 'valid', count: data.count });
        }
      } catch {
        setScanState({ status: 'not-found', count: 0 });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [folder]);

  function handleBrowseClick() {
    folderInputRef.current?.click();
  }

  function handleFolderInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const relativePath = files[0].webkitRelativePath;
      const topLevelDir = relativePath.split('/')[0];
      setFolder(topLevelDir);
    }
  }

  async function handleCreate() {
    setIsCreating(true);
    setCreateError(false);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, format, clipsFolder: folder, topic }),
      });
      if (!res.ok) throw new Error('Failed to create project');
      const project = (await res.json()) as Project;
      router.push(`/projects/${project.id}/script`);
    } catch {
      setCreateError(true);
      setIsCreating(false);
    }
  }

  const topBarLeft = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <button
        onClick={() => router.back()}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          padding: 4,
          borderRadius: 4,
          transition: 'color 150ms ease',
        }}
        aria-label="Go back"
      >
        <ChevronLeft size={18} />
      </button>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}
      >
        New Project
      </span>
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopBar titleNode={topBarLeft} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 520 }}>
          <StepIndicator current={step} />

          {/* Step 1 — Name + Format */}
          {step === 1 && (
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}
              >
                Project name
              </label>
              <Input
                placeholder="NYC weekend vlog"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                Content format
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 12,
                }}
              >
                {formatOptions.map(({ value, label, description, Icon }) => {
                  const selected = format === value;
                  return (
                    <Card
                      key={value}
                      onClick={() => setFormat(value)}
                      style={{
                        flex: 1,
                        border: selected
                          ? '1px solid var(--accent)'
                          : '1px solid var(--border)',
                        backgroundColor: selected
                          ? 'var(--surface-raised)'
                          : 'var(--surface)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 16,
                        transition: 'border-color 150ms ease, background-color 150ms ease',
                      }}
                    >
                      <Icon size={24} color="var(--text-secondary)" />
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginTop: 8,
                          textAlign: 'center',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--text-secondary)',
                          textAlign: 'center',
                          marginTop: 4,
                        }}
                      >
                        {description}
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 32,
                }}
              >
                <Button
                  variant="primary"
                  disabled={!name.trim() || !format}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 — Clips folder */}
          {step === 2 && (
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 6,
                }}
              >
                Where are your clips?
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  marginBottom: 20,
                }}
              >
                Select the folder on your Mac that contains your video clips and b-roll
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Input
                  placeholder="/Users/you/Videos/nyc-trip"
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  style={{ flex: 1 }}
                />
                <Button variant="secondary" onClick={handleBrowseClick}>
                  Browse
                </Button>
                <input
                  ref={folderInputRef}
                  type="file"
                  // @ts-expect-error non-standard attribute, no React typing
                  webkitdirectory=""
                  style={{ display: 'none' }}
                  onChange={handleFolderInputChange}
                />
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  marginTop: 6,
                }}
              >
                Type your full folder path, e.g. /Users/yourname/Videos/nyc-trip
              </div>

              {scanState.status === 'valid' && (
                <div style={{ fontSize: 13, color: 'var(--success)', marginTop: 8 }}>
                  {scanState.count} clip{scanState.count === 1 ? '' : 's'} found
                </div>
              )}
              {scanState.status === 'empty' && (
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
                  No video files found
                </div>
              )}
              {scanState.status === 'not-found' && (
                <div style={{ fontSize: 13, color: 'var(--destructive)', marginTop: 8 }}>
                  Folder not found
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 32,
                }}
              >
                <Button
                  variant="primary"
                  disabled={scanState.status !== 'valid'}
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 — Topic */}
          {step === 3 && (
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 6,
                }}
              >
                What&apos;s this reel about?
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  marginBottom: 20,
                }}
              >
                Give Claude enough context to write a strong script. The more specific, the better.
              </div>

              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="A weekend trip to NYC — I went with friends, we drove up Friday, hit Times Square, caught a Broadway show, explored the food scene. Want a 'come with me' style vlog with narration over b-roll."
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: 12,
                  minHeight: 120,
                  width: '100%',
                  resize: 'vertical',
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  marginTop: 32,
                  gap: 8,
                }}
              >
                <Button variant="primary" disabled={isCreating} onClick={handleCreate}>
                  {isCreating ? 'Creating...' : 'Create Project'}
                </Button>
                {createError && (
                  <div style={{ fontSize: 13, color: 'var(--destructive)' }}>
                    Something went wrong
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
