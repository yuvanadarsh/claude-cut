import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const baseStyle: React.CSSProperties = {
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 4,
  height: 36,
  padding: '0 12px',
  color: 'var(--text-primary)',
  fontSize: 14,
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 150ms ease',
};

export function Input({ className, style, onFocus, onBlur, ...props }: InputProps) {
  const [focused, setFocused] = React.useState(false);

  const combinedStyle: React.CSSProperties = {
    ...baseStyle,
    borderColor: focused ? 'var(--border-active)' : 'var(--border)',
    ...style,
  };

  return (
    <input
      className={className}
      style={combinedStyle}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      {...props}
    />
  );
}

export default Input;
