"use client";
import React from "react";
import { C } from "./Theme";

export interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  size?: "sm" | "md" | "lg";
}

export function Toggle({
  label,
  checked,
  onChange,
  description,
  size = "md",
}: ToggleProps) {
  const sizes = {
    sm: { track: { width: 36, height: 20 }, thumb: { size: 14, offset: 3 } },
    md: { track: { width: 44, height: 24 }, thumb: { size: 18, offset: 3 } },
    lg: { track: { width: 52, height: 28 }, thumb: { size: 22, offset: 3 } },
  };
  const s = sizes[size];

  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: s.track.width,
          height: s.track.height,
          flexShrink: 0,
          marginTop: 1,
          background: checked ? C.primary : C.elevated,
          border: `1px solid ${checked ? C.primary : C.border}`,
          clipPath: checked
            ? `polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))`
            : `polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)`,
          position: "relative",
          transition: "all 0.25s ease",
          boxShadow: checked ? "0 0 12px rgba(255,77,0,0.25)" : "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: s.thumb.offset,
            width: s.thumb.size,
            height: s.thumb.size,
            background: checked ? "white" : C.muted,
            left: checked
              ? s.track.width - s.thumb.size - s.thumb.offset
              : s.thumb.offset,
            transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </div>
      {label && (
        <div>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: checked ? C.text : C.muted,
              transition: "color 0.2s",
            }}
          >
            {label}
          </p>
          {description && (
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 12,
                color: C.muted,
                marginTop: 2,
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </label>
  );
}
