"use client";
import type { ReactNode } from "react";

const dialogSizes = {
  sm: { maxWidth: 380 },
  md: { maxWidth: 500 },
  lg: { maxWidth: 660 },
} as const;

type DialogSize = keyof typeof dialogSizes;

type DialogVariant = "default" | "danger" | "levelup" | "quest";

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  variant = "default",
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  variant?: DialogVariant;
  size?: DialogSize;
}) {
  if (!open) return null;

  const variantStyles = {
    default: { borderTop: "2px solid var(--border)" },
    danger: { borderTop: "2px solid var(--danger)" },
    levelup: {
      borderTop: "2px solid var(--primary)",
      background: "linear-gradient(160deg, #141414 60%, rgba(255,77,0,0.06))",
    },
    quest: { borderTop: "2px solid var(--accent)" },
  };

  const variantEyebrow = {
    default: null,
    danger: { text: "⚠ DANGER ZONE", color: "var(--danger)" },
    levelup: { text: "⚡ LEVEL UP!", color: "var(--primary)" },
    quest: { text: "🎯 QUEST COMPLETE", color: "var(--accent)" },
  };

  const eyebrow = variantEyebrow[variant as keyof typeof variantEyebrow];

  return (
    <div
      className="fq-overlay-in"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="fq-dialog-in"
        style={{
          width: "100%",
          ...dialogSizes[size as keyof typeof dialogSizes],
          background: "var(--surface)",
          border: "1px solid var(--border)",
          clipPath:
            "polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px))",
          ...variantStyles[variant as keyof typeof variantStyles],
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {eyebrow && (
            <p
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 3,
                color: eyebrow.color,
                marginBottom: 6,
              }}
            >
              {eyebrow.text}
            </p>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                fontSize: "1.6rem",
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "var(--text)",
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "var(--elevated)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
                width: 32,
                height: 32,
                cursor: "pointer",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                clipPath:
                  "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
                transition: "all 0.15s",
              }}
            >
              ×
            </button>
          </div>
        </div>
        <div
          style={{
            padding: "20px 24px",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            color: "var(--muted)",
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>
        {footer && (
          <div
            style={{
              padding: "0 24px 20px",
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              borderTop: "1px solid var(--border)",
              paddingTop: 16,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
