'use client';

import React, { useState } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--accent)',
    color: '#000',
    fontWeight: 600,
    border: 'none',
  },
  secondary: {
    backgroundColor: 'var(--surface-raised)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    border: 'none',
  },
  destructive: {
    backgroundColor: 'var(--destructive)',
    color: '#fff',
    border: 'none',
  },
};

const baseStyle: React.CSSProperties = {
  height: 36,
  padding: '0 16px',
  fontSize: 14,
  borderRadius: 4,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 150ms ease, background-color 150ms ease, color 150ms ease',
  fontFamily: 'inherit',
  lineHeight: 1,
};

export function Button({
  variant = 'secondary',
  children,
  className,
  disabled,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const combinedStyle: React.CSSProperties = {
    ...baseStyle,
    ...variantStyles[variant],
    ...(variant === 'ghost' && isHovered && !disabled
      ? { color: 'var(--text-primary)' }
      : {}),
    ...(disabled ? { opacity: 0.4, cursor: 'not-allowed' } : {}),
    ...style,
  };

  return (
    <button
      className={className}
      disabled={disabled}
      style={combinedStyle}
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        onMouseLeave?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
