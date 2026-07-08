'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Project, ProjectStatus } from '@/types';

type ProjectCardData = Pick<
  Project,
  'name' | 'format' | 'status' | 'assembly' | 'updatedAt'
>;

interface ProjectCardProps {
  project: ProjectCardData;
  id: string;
}

function getStatusBadgeVariant(status: ProjectStatus): 'muted' | 'accent' {
  return status === 'exported' ? 'accent' : 'muted';
}

function formatRelativeTime(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
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
            {project.assembly?.clips.length ?? 0} clips
          </span>
          <span
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Updated {formatRelativeTime(project.updatedAt)}
          </span>
        </div>
        {/* Row 2: Open button right-aligned */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            href={project.status === 'draft' ? `/projects/${id}/script` : `/projects/${id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="ghost">Open</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;
