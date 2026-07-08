'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProjectCardData {
  name: string;
  format: string;
  status: string;
  clipCount: number;
  updatedAt: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  id: string;
}

function getStatusBadgeVariant(status: string): 'muted' | 'accent' {
  return status === 'exported' ? 'accent' : 'muted';
}

export function ProjectCard({ project, id }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      style={{
        borderColor: isHovered ? 'var(--border-active)' : 'var(--border)',
        transition: 'border-color 150ms ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top section */}
      <div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}
        >
          {project.name}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Badge variant="muted">{project.format}</Badge>
          <Badge variant={getStatusBadgeVariant(project.status)}>
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Bottom section */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 12,
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {project.clipCount} clips
          </span>
          <span
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Updated {project.updatedAt}
          </span>
        </div>
        <Link href={`/projects/${id}`} style={{ textDecoration: 'none' }}>
          <Button variant="ghost">Open</Button>
        </Link>
      </div>
    </Card>
  );
}

export default ProjectCard;
