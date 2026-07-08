import React from 'react';

type BadgeVariant = 'default' | 'accent' | 'success' | 'muted';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--surface-raised)',
    color: 'var(--text-secondary)',
  },
  accent: {
    backgroundColor: 'var(--accent)',
    color: '#000',
  },
  success: {
    backgroundColor: 'var(--success)',
    color: '#000',
  },
  muted: {
    backgroundColor: 'var(--border)',
    color: 'var(--text-muted)',
  },
};

const baseStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  padding: '2px 8px',
  borderRadius: 2,
  display: 'inline-block',
  lineHeight: '18px',
};

export function Badge({ variant = 'default', children, className, style }: BadgeProps) {
  return (
    <span
      className={className}
      style={{ ...baseStyle, ...variantStyles[variant], ...style }}
    >
      {children}
    </span>
  );
}

export default Badge;
