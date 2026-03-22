"use client";
import React, { useState } from "react";
import { C } from "./Theme";
import Image from "next/image";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  ringColor?: string;
  className?: string;
}

export function Avatar({
  src,
  alt = "Avatar",
  fallback,
  size = "md",
  ringColor,
  className = "", // Default string kosong
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const sizes = {
    sm: { width: 32, height: 32, fontSize: 12 },
    md: { width: 48, height: 48, fontSize: 16 },
    lg: { width: 64, height: 64, fontSize: 24 },
    xl: { width: 96, height: 96, fontSize: 32 },
  };
  const s = sizes[size];

  return (
    <div
      className={className}
      style={{
        width: s.width,
        height: s.height,
        borderRadius: "50%",
        flexShrink: 0,
        background: C.elevated,
        border: ringColor ? `2px solid ${ringColor}` : `1px solid ${C.border}`,
        boxShadow: ringColor ? `0 0 12px ${ringColor}40` : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontWeight: 700,
            fontSize: s.fontSize,
            color: ringColor || C.text,
            textTransform: "uppercase",
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {typeof fallback === "string" ? fallback.substring(0, 2) : fallback}
        </span>
      )}
    </div>
  );
}
