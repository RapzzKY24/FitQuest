"use client";
import { useState, type ReactNode, type ButtonHTMLAttributes } from "react";

const btnBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "2px",
  cursor: "pointer",
  border: "none",
  transition: "all 0.18s ease",
  position: "relative" as const,
  overflow: "hidden",
  whiteSpace: "nowrap" as const,
};

const btnSizes = {
  xs: { padding: "4px 16px", fontSize: "0.7rem" },
  sm: { padding: "7px 16px", fontSize: "0.85rem" },
  md: { padding: "11px 22px", fontSize: "1rem" },
  lg: { padding: "14px 28px", fontSize: "1.1rem" },
  xl: { padding: "18px 36px", fontSize: "1.25rem" },
};

const btnVariants = {
  primary: {
    background: "var(--primary)",
    color: "white",
    clipPath:
      "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
  },
  secondary: {
    background: "var(--elevated)",
    color: "var(--secondary)",
    border: "1px solid var(--secondary)",
    clipPath:
      "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
  },
  outline: {
    background: "transparent",
    color: "var(--text)",
    border: "1px solid var(--border)",
    clipPath:
      "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
  },
  ghost: {
    background: "transparent",
    color: "var(--muted)",
    border: "none",
    clipPath: "none",
  },
  danger: {
    background: "rgba(239,68,68,0.12)",
    color: "var(--danger)",
    border: "1px solid rgba(239,68,68,0.3)",
    clipPath:
      "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
  },
  success: {
    background: "rgba(34,197,94,0.12)",
    color: "var(--success)",
    border: "1px solid rgba(34,197,94,0.3)",
    clipPath:
      "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
  },
};

const btnHover = {
  primary: {
    background: "var(--primary-hover)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(255,77,0,0.3)",
  },
  secondary: {
    border: "1px solid var(--secondary)",
    transform: "translateY(-2px)",
  },
  outline: {
    border: "1px solid var(--primary)",
    color: "var(--primary)",
    transform: "translateY(-2px)",
  },
  ghost: { color: "var(--text)" },
  danger: { background: "rgba(239,68,68,0.2)", transform: "translateY(-2px)" },
  success: { background: "rgba(34,197,94,0.2)", transform: "translateY(-2px)" },
};

type ButtonSize = keyof typeof btnSizes;
type ButtonVariant = keyof typeof btnVariants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconRight,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const style = {
    ...btnBase,
    ...btnSizes[size as keyof typeof btnSizes],
    ...btnVariants[variant as keyof typeof btnVariants],
    ...(hovered && !disabled && !loading
      ? btnHover[variant as keyof typeof btnHover]
      : {}),
    ...(pressed ? { transform: "scale(0.97)" } : {}),
    opacity: disabled || loading ? 0.45 : 1,
    cursor: disabled || loading ? "not-allowed" : "pointer",
  };

  return (
    <button
      {...rest}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {loading ? (
        <span
          style={{
            width: 14,
            height: 14,
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            display: "inline-block",
            animation: "spin 0.7s linear infinite",
          }}
        />
      ) : (
        icon
      )}
      {children}
      {!loading && iconRight}
    </button>
  );
}
