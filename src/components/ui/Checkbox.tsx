"use client";
import React, { useState } from "react";
import { C } from "./Theme";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  description,
}: CheckboxProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <label
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        userSelect: "none",
      }}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        className="anim-pop"
        style={{
          width: 20,
          height: 20,
          flexShrink: 0,
          marginTop: 1,
          background: checked ? C.primary : C.elevated,
          border: `1.5px solid ${checked ? C.primary : hovered ? C.secondary : C.border}`,
          clipPath:
            "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.18s ease",
          boxShadow: checked ? "0 0 10px rgba(255,77,0,0.3)" : "none",
        }}
      >
        {checked && (
          <span
            style={{
              color: "white",
              fontSize: 11,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            ✓
          </span>
        )}
      </div>
      <div>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: checked ? C.text : C.muted,
            transition: "color 0.15s",
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
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </label>
  );
}
