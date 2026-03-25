"use client";
import React from "react";
import { C } from "./Theme";

export interface RadioOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface RadioProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (val: string) => void;
}

export function Radio({ options = [], value, onChange }: RadioProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <label
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                flexShrink: 0,
                marginTop: 1,
                borderRadius: "50%",
                background: isSelected ? C.primary : C.elevated,
                border: `2px solid ${isSelected ? C.primary : C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.18s",
                boxShadow: isSelected ? "0 0 10px rgba(255,77,0,0.3)" : "none",
              }}
            >
              {isSelected && (
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "white",
                  }}
                />
              )}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: isSelected ? C.text : C.muted,
                  transition: "color 0.15s",
                }}
              >
                {opt.icon && <span style={{ marginRight: 6 }}>{opt.icon}</span>}
                {opt.label}
              </p>
              {opt.description && (
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 12,
                    color: C.muted,
                    marginTop: 2,
                  }}
                >
                  {opt.description}
                </p>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
