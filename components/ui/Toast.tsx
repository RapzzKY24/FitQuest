"use client";
import React, { useState, useEffect } from "react";
import { C } from "./Theme";

export type ToastType =
  | "xp"
  | "levelup"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "streak"
  | "badge";

export interface ToastData {
  id: string;
  type?: ToastType;
  title?: string;
  message?: string;
}

const toastConfig: Record<
  ToastType,
  { color: string; icon: string; label: string }
> = {
  xp: { color: C.accent, icon: "⚡", label: "XP GAINED" },
  levelup: { color: C.primary, icon: "🔥", label: "LEVEL UP" },
  success: { color: C.success, icon: "✓", label: "SUCCESS" },
  warning: { color: C.warning, icon: "⚠", label: "WARNING" },
  danger: { color: C.danger, icon: "✕", label: "ERROR" },
  info: { color: C.info, icon: "ℹ", label: "INFO" },
  streak: { color: C.primary, icon: "🔥", label: "STREAK" },
  badge: { color: C.accent, icon: "🏅", label: "BADGE UNLOCKED" },
};

function ToastItem({
  id,
  type = "success",
  title,
  message,
  onDismiss,
}: ToastData & { onDismiss: (id: string) => void }) {
  const [leaving, setLeaving] = useState(false);
  const cfg = toastConfig[type] || toastConfig.info;

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(id), 300);
  };

  useEffect(() => {
    const t = setTimeout(dismiss, 4000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 16px",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${cfg.color}`,
        clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)",
        minWidth: 300,
        maxWidth: 360,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        animation: leaving
          ? "fq-toast-out 0.3s ease forwards"
          : "fq-toast-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: cfg.color,
          background: `${cfg.color}15`,
          clipPath:
            "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
        }}
      >
        {cfg.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 2,
            color: cfg.color,
            marginBottom: 3,
          }}
        >
          {cfg.label}
        </p>
        {title && (
          <p
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              textTransform: "uppercase",
              letterSpacing: 1,
              color: C.text,
              marginBottom: 2,
            }}
          >
            {title}
          </p>
        )}
        {message && (
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              color: C.muted,
              lineHeight: 1.4,
            }}
          >
            {message}
          </p>
        )}
      </div>
      <button
        onClick={dismiss}
        style={{
          background: "none",
          border: "none",
          color: C.muted,
          cursor: "pointer",
          fontSize: 15,
          flexShrink: 0,
          padding: 2,
        }}
      >
        ×
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const show = (toast: Omit<ToastData, "id">) =>
    setToasts((p) => [
      ...p,
      { ...toast, id: Date.now() + Math.random().toString() },
    ]);
  const dismiss = (id: string) =>
    setToasts((p) => p.filter((t) => t.id !== id));
  return { toasts, show, dismiss };
}
