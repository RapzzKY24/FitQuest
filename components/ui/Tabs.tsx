"use client";
import React from "react";
import { C } from "./Theme";

export interface TabOption {
  value: string;
  label: string;
  icon?: string | React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabOption[];
  value: string;
  onChange: (val: string) => void;
  variant?: "underline" | "pill" | "card";
}

export function Tabs({
  tabs = [],
  value,
  onChange,
  variant = "underline",
}: TabsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: variant === "pill" ? 6 : 0,
        borderBottom:
          variant === "underline" ? `1px solid ${C.border}` : "none",
        background: variant === "card" ? C.elevated : "transparent",
        padding: variant === "card" ? "4px" : "0",
        clipPath:
          variant === "card"
            ? "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))"
            : "none",
        flexWrap: "wrap",
      }}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.value;
        const baseStyle = {
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'Barlow Condensed',sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          textTransform: "uppercase" as const,
          letterSpacing: "1.5px",
          cursor: "pointer",
          border: "none",
          transition: "all 0.18s",
          userSelect: "none" as const,
        };

        if (variant === "underline")
          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              style={{
                ...baseStyle,
                padding: "10px 18px",
                background: "transparent",
                color: isActive ? C.text : C.muted,
                borderBottom: isActive
                  ? `2px solid ${C.primary}`
                  : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {tab.icon && <span style={{ fontSize: 15 }}>{tab.icon}</span>}
              {tab.label}
              {tab.badge && (
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 9,
                    padding: "2px 6px",
                    background: C.primary,
                    color: "white",
                    clipPath:
                      "polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))",
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );

        if (variant === "pill")
          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              style={{
                ...baseStyle,
                padding: "8px 16px",
                background: isActive ? C.primary : "transparent",
                color: isActive ? "white" : C.muted,
                border: `1px solid ${isActive ? C.primary : C.border}`,
                clipPath:
                  "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))",
              }}
            >
              {tab.icon && <span style={{ fontSize: 15 }}>{tab.icon}</span>}
              {tab.label}
              {tab.badge && (
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 9,
                    padding: "2px 6px",
                    background: isActive ? "rgba(255,255,255,0.2)" : C.border,
                    clipPath:
                      "polygon(0 0,calc(100% - 3px) 0,100% 3px,100% 100%,3px 100%,0 calc(100% - 3px))",
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            style={{
              ...baseStyle,
              padding: "9px 16px",
              flex: 1,
              justifyContent: "center",
              background: isActive ? C.surface : "transparent",
              color: isActive ? C.text : C.muted,
              clipPath: isActive
                ? "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))"
                : "none",
              borderBottom: isActive ? `2px solid ${C.primary}` : "none",
            }}
          >
            {tab.icon && <span style={{ fontSize: 15 }}>{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
