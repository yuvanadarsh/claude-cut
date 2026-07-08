'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { ScriptPanel } from '@/components/editor/ScriptPanel';
import { ClipPanel } from '@/components/editor/ClipPanel';
import { EffectsBar } from '@/components/editor/EffectsBar';
import type { Clip, Project } from '@/types';

interface EditorPageProps {
  params: { id: string };
}

export default function EditorPage({ params }: EditorPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [clips, setClips] = useState<Clip[]>([]);
  const [clipsLoading, setClipsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const projectRes = await fetch(`/api/projects/${params.id}`);
      if (projectRes.ok) {
        setProject((await projectRes.json()) as Project);
      }

      const clipsRes = await fetch(`/api/projects/${params.id}/clips`);
      if (clipsRes.ok) {
        setClips((await clipsRes.json()) as Clip[]);
      }
      setClipsLoading(false);
    }
    load();
  }, [params.id]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        projectName={project?.name ?? ''}
        status={project?.status ?? 'draft'}
        activePage="editor"
        projectId={params.id}
      />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <TopBar title="Editor">
          <Button variant="secondary">Generate Script</Button>
          <Button variant="primary">Export</Button>
        </TopBar>
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <ScriptPanel />
          <div style={{ width: '1px', background: 'var(--border)', flexShrink: 0 }} />
          <ClipPanel clips={clips} loading={clipsLoading} projectId={params.id} />
        </div>
        <EffectsBar />
      </div>
    </div>
  );
}
