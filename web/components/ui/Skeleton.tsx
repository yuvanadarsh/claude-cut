'use client';

import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const shimmerKeyframes = `
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
`;

let styleInjected = false;

function injectSkeletonStyles() {
  if (styleInjected || typeof document === 'undefined') return;
  const styleEl = document.createElement('style');
  styleEl.textContent = shimmerKeyframes;
  document.head.appendChild(styleEl);
  styleInjected = true;
}

export function Skeleton({ width, height = 16, className, style }: SkeletonProps) {
  React.useEffect(() => {
    injectSkeletonStyles();
  }, []);

  const baseStyle: React.CSSProperties = {
    backgroundColor: 'var(--border)',
    borderRadius: 4,
    display: 'block',
    animation: 'skeleton-pulse 1.5s ease-in-out infinite',
    width: width !== undefined ? width : '100%',
    height,
    ...style,
  };

  return <span className={className} style={baseStyle} aria-hidden="true" />;
}

export default Skeleton;
