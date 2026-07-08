'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Video, Mic, Layers, type LucideIcon } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

type Format = 'on-camera' | 'voiceover' | 'hybrid' | '';

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

  function handleCreate() {
    const id = Date.now().toString();
    router.push('/projects/' + id);
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
                  readOnly
                  style={{ flex: 1 }}
                />
                <Button variant="secondary" onClick={() => {}}>
                  Browse
                </Button>
              </div>

              {folder.length > 0 && (
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--success)',
                    marginTop: 8,
                  }}
                >
                  12 clips found
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 32,
                }}
              >
                <Button variant="primary" onClick={() => setStep(3)}>
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
                  justifyContent: 'flex-end',
                  marginTop: 32,
                }}
              >
                <Button variant="primary" onClick={handleCreate}>
                  Create Project
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
