"use client";
import React from "react";
import { C } from "./Theme";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  className?: string;
  circle?: boolean;
}

export function Skeleton({
  width = "100%",
  height = 16,
  style,
  className = "",
  circle = false,
}: SkeletonProps) {
  return (
    <div
      className={`fq-skel ${circle ? "" : "cc-xs"} ${className}`}
      style={{
        width,
        height,
        borderRadius: circle ? "50%" : 0, // Kalau bulat, override cut corner-nya
        ...style,
      }}
    />
  );
}

// Komponen tambahan yang khusus nge-render bentuk "Card"
// (Sering dipakai buat skeleton layout umum, jadi mending sekalian di-export)
export function SkeletonCard() {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        padding: 20,
        clipPath:
          "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton width={48} height={48} style={{ flexShrink: 0 }} />
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
        >
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={11} />
        </div>
        <Skeleton width={60} height={24} style={{ flexShrink: 0 }} />
      </div>

      <Skeleton height={6} />

      <div style={{ display: "flex", gap: 8 }}>
        <Skeleton width="33%" height={56} />
        <Skeleton width="33%" height={56} />
        <Skeleton width="33%" height={56} />
      </div>
    </div>
  );
}
