"use client";
import type {ReactNode} from "react";

const badgePillColors = {
  primary: {
    bg: "rgba(255,77,0,0.12)",
    text: "var(--primary)",
    border: "rgba(255,77,0,0.2)",
  },
  accent: {
    bg: "rgba(255,179,71,0.12)",
    text: "var(--accent)",
    border: "rgba(255,179,71,0.2)",
  },
  success: {
    bg: "rgba(34,197,94,0.12)",
    text: "var(--success)",
    border: "rgba(34,197,94,0.2)",
  },
  muted: {
    bg: "var(--elevated)",
    text: "var(--muted)",
    border: "var(--border)",
  },
  info: {
    bg: "rgba(59,130,246,0.12)",
    text: "var(--info)",
    border: "rgba(59,130,246,0.2)",
  },
} as const;

type BadgePillColor = keyof typeof badgePillColors;

interface BadgePillProps {
  children?: ReactNode;
  color?: BadgePillColor;
  className?: string;
}

export function BadgePill({
  children,
  color = "primary",
  className,
}: BadgePillProps) {
  const c = badgePillColors[color];

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "'Space Mono',monospace",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 1,
        textTransform: "uppercase",
        padding: "3px 10px",
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        clipPath:
          "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
      }}>
      {children}
    </span>
  );
}
