import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { TopBar } from '@/components/layout/TopBar';

interface MockProject {
  id: string;
  name: string;
  format: string;
  status: string;
  clipsFolder: string;
  clipCount: number;
  updatedAt: string;
}

const mockProjects: MockProject[] = [
  {
    id: 'proj-1',
    name: 'NYC Weekend Vlog',
    format: 'on-camera',
    status: 'draft',
    clipsFolder: '/Users/demo/Videos/nyc',
    clipCount: 12,
    updatedAt: '2 hours ago',
  },
  {
    id: 'proj-2',
    name: 'Cooking Tutorial — Pasta',
    format: 'voiceover',
    status: 'scripted',
    clipsFolder: '/Users/demo/Videos/pasta',
    clipCount: 8,
    updatedAt: 'Yesterday',
  },
  {
    id: 'proj-3',
    name: 'Morning Routine',
    format: 'hybrid',
    status: 'exported',
    clipsFolder: '/Users/demo/Videos/routine',
    clipCount: 24,
    updatedAt: '3 days ago',
  },
];

export default function DashboardPage() {
  const hasProjects = mockProjects.length > 0;

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
        {hasProjects ? (
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
              {mockProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  project={{
                    name: project.name,
                    format: project.format,
                    status: project.status,
                    clipCount: project.clipCount,
                    updatedAt: project.updatedAt,
                  }}
                />
              ))}
            </div>
          </>
        ) : (
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
