'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { ProjectStatus } from '@/types';

type ActivePage = 'script' | 'editor' | 'export';

interface SidebarProps {
  projectName: string;
  status: ProjectStatus;
  activePage: ActivePage;
  projectId: string;
}

interface NavItem {
  label: string;
  page: ActivePage;
  href: string;
}

export function Sidebar({ projectName, status, activePage, projectId }: SidebarProps) {
  const [hoveredPage, setHoveredPage] = useState<ActivePage | null>(null);
  const [backHovered, setBackHovered] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Script', page: 'script', href: `/projects/${projectId}/script` },
    { label: 'Editor', page: 'editor', href: `/projects/${projectId}` },
    { label: 'Export', page: 'export', href: `/projects/${projectId}/export` },
  ];

  return (
    <nav
      style={{
        width: 240,
        minWidth: 240,
        height: '100vh',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Back to dashboard */}
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          height: 36,
          paddingLeft: 16,
          textDecoration: 'none',
          color: backHovered ? 'var(--text-secondary)' : 'var(--text-muted)',
          fontSize: 12,
          transition: 'color 150ms ease',
        }}
        onMouseEnter={() => setBackHovered(true)}
        onMouseLeave={() => setBackHovered(false)}
      >
        <ChevronLeft size={14} />
        All Projects
      </Link>

      {/* Top section: project name + status */}
      <div style={{ padding: '8px 16px 16px' }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 8,
            wordBreak: 'break-word',
          }}
        >
          {projectName}
        </div>
        <Badge variant="muted">{status}</Badge>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: 'var(--border)', margin: '0 16px' }} />

      {/* Nav links */}
      <div style={{ flex: 1, paddingTop: 8 }}>
        {navItems.map(({ label, page, href }) => {
          const isActive = activePage === page;
          const isHovered = hoveredPage === page;

          return (
            <Link
              key={page}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 40,
                paddingLeft: isActive ? 13 : 16,
                borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: isHovered && !isActive ? 'var(--surface-raised)' : 'transparent',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: isActive ? 500 : 400,
                transition: 'background-color 150ms ease, color 150ms ease',
              }}
              onMouseEnter={() => setHoveredPage(page)}
              onMouseLeave={() => setHoveredPage(null)}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Bottom: wordmark */}
      <div
        style={{
          padding: 16,
          fontSize: 11,
          color: 'var(--text-muted)',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        claude-cut
      </div>
    </nav>
  );
}

export default Sidebar;
