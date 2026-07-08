'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { TopBar } from '@/components/layout/TopBar';
import type { Project } from '@/types';

type LoadState = 'loading' | 'error' | 'ready';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  const fetchProjects = useCallback(async () => {
    setLoadState('loading');
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to load projects');
      const data = (await res.json()) as Project[];
      setProjects(data);
      setLoadState('ready');
    } catch {
      setLoadState('error');
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar
        titleNode={
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            claude-cut
          </span>
        }
      >
        <Link href="/projects/new" style={{ textDecoration: 'none' }}>
          <Button variant="primary">New Project</Button>
        </Link>
      </TopBar>

      {/* Main content */}
      <main style={{ flex: 1, padding: 32 }}>
        {loadState === 'loading' && (
          <>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: 0,
                marginBottom: 16,
              }}
            >
              Your Projects
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
              }}
              className="projects-grid"
            >
              {[0, 1, 2].map((i) => (
                <Card key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Skeleton height={18} width="60%" />
                  <Skeleton height={14} width="40%" />
                  <Skeleton height={14} width="80%" />
                </Card>
              ))}
            </div>
          </>
        )}

        {loadState === 'error' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minHeight: 'calc(100vh - 52px - 64px)',
              gap: 16,
            }}
          >
            <Card style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0, marginBottom: 12 }}>
                Could not load projects
              </p>
              <Button variant="ghost" onClick={fetchProjects}>
                Retry
              </Button>
            </Card>
          </div>
        )}

        {loadState === 'ready' && projects.length > 0 && (
          <>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: 0,
                marginBottom: 16,
              }}
            >
              Your Projects
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
              }}
              className="projects-grid"
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} id={project.id} project={project} />
              ))}
            </div>
          </>
        )}

        {loadState === 'ready' && projects.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minHeight: 'calc(100vh - 52px - 64px)',
              gap: 16,
            }}
          >
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', margin: 0 }}>
              No projects yet
            </p>
            <Link href="/projects/new" style={{ textDecoration: 'none' }}>
              <Button variant="primary">Create your first reel</Button>
            </Link>
          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
