'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const baseStyle: React.CSSProperties = {
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  padding: 16,
};

export function Card({ children, className, style, ...rest }: CardProps) {
  return (
    <div
      className={className}
      style={{ ...baseStyle, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
