import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { ScriptPanel } from '@/components/editor/ScriptPanel';
import { ClipPanel } from '@/components/editor/ClipPanel';
import { EffectsBar } from '@/components/editor/EffectsBar';

interface EditorPageProps {
  params: { id: string };
}

export default function EditorPage({ params }: EditorPageProps) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        projectName="NYC Weekend Vlog"
        status="draft"
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
          <ClipPanel />
        </div>
        <EffectsBar />
      </div>
    </div>
  );
}
