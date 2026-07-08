import React from 'react';

interface CardProps {
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

export function Card({ children, className, style }: CardProps) {
  return (
    <div
      className={className}
      style={{ ...baseStyle, ...style }}
    >
      {children}
    </div>
  );
}

export default Card;
