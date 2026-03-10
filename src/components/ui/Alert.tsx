"use client";
import { useState, type ReactNode } from "react";

const alertConfig = {
  info: {
    color: "var(--info)",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.25)",
    icon: "ℹ",
    label: "INFO",
  },
  success: {
    color: "var(--success)",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.25)",
    icon: "✓",
    label: "SUCCESS",
  },
  warning: {
    color: "var(--warning)",
    bg: "rgba(234,179,8,0.08)",
    border: "rgba(234,179,8,0.25)",
    icon: "⚠",
    label: "WARNING",
  },
  danger: {
    color: "var(--danger)",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.25)",
    icon: "✕",
    label: "DANGER",
  },
  xp: {
    color: "var(--accent)",
    bg: "rgba(255,179,71,0.08)",
    border: "rgba(255,179,71,0.25)",
    icon: "⚡",
    label: "XP GAINED",
  },
  streak: {
    color: "var(--primary)",
    bg: "rgba(255,77,0,0.08)",
    border: "rgba(255,77,0,0.25)",
    icon: "🔥",
    label: "STREAK",
  },
} as const;

type AlertVariant = keyof typeof alertConfig;

interface AlertProps {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  dismissible?: boolean;
}

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const cfg = alertConfig[variant as keyof typeof alertConfig];

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => setVisible(false), 250);
  };

  if (!visible) return null;

  return (
    <div
      className="fq-slide-down"
      style={{
        display: "flex",
        gap: 14,
        padding: "14px 16px",
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderLeft: `3px solid ${cfg.color}`,
        clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translateX(12px)" : "none",
        transition: "opacity 0.25s, transform 0.25s",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          flexShrink: 0,
          background: `${cfg.color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: cfg.color,
          clipPath:
            "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
        }}
      >
        {cfg.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 3,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              color: cfg.color,
            }}
          >
            {cfg.label}
          </span>
          {title && (
            <span
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "var(--text)",
              }}
            >
              — {title}
            </span>
          )}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 13,
            color: "var(--muted)",
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={dismiss}
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            cursor: "pointer",
            fontSize: 16,
            padding: 4,
            flexShrink: 0,
            alignSelf: "flex-start",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
