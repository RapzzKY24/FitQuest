"use client";
import React from "react";
import { C } from "./Theme";

export interface ProgressProps {
  value: number; // 0 - 100
  max?: number;
  variant?: "linear" | "circular";
  color?: string;
  size?: number; // Khusus circular
  label?: string;
}

export function Progress({
  value,
  max = 100,
  variant = "linear",
  color = C.primary,
  size = 120,
  label,
}: ProgressProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  if (variant === "circular") {
    const strokeWidth = size * 0.1;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (pct / 100) * circumference;

    return (
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={C.elevated}
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 800,
              fontSize: size * 0.25,
              color: C.text,
              lineHeight: 1,
            }}
          >
            {Math.round(pct)}%
          </span>
          {label && (
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: size * 0.08,
                color: C.muted,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        width: "100%",
      }}
    >
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 12,
              fontWeight: 700,
              color: color,
            }}
          >
            {Math.round(pct)}%
          </span>
        </div>
      )}
      <div
        style={{
          height: 8,
          background: C.elevated,
          border: `1px solid ${C.border}`,
          clipPath:
            "polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: `0 0 10px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}
