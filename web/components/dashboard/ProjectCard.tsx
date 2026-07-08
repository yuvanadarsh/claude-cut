'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { ProjectFormat, ProjectStatus } from '@/types';

interface ProjectCardData {
  name: string;
  format: ProjectFormat;
  status: ProjectStatus;
  clipCount: number;
  updatedAt: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  id: string;
}

function getStatusBadgeVariant(status: ProjectStatus): 'muted' | 'accent' {
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
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {/* Row 1: clip count (left) + updated timestamp (right) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
        {/* Row 2: Open button right-aligned */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href={`/projects/${id}`} style={{ textDecoration: 'none' }}>
            <Button variant="ghost">Open</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;
