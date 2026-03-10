"use client";
import React, { useState } from "react";
import { C } from "./Theme";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({
  label,
  hint,
  error,
  placeholder,
  rows = 3,
  value,
  onChange,
  required,
  ...props
}: TextareaProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 600,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: focused ? C.primary : C.muted,
            transition: "color 0.2s",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {label}
          {required && <span style={{ color: C.primary }}>*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: C.elevated,
          border: `1px solid ${focused ? C.primary : error ? C.danger : C.border}`,
          color: C.text,
          padding: "11px 14px",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 14,
          outline: "none",
          resize: "vertical",
          clipPath:
            "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
          transition: "border-color 0.2s",
          boxShadow: focused ? "0 0 0 3px rgba(255,77,0,0.1)" : "none",
          caretColor: C.primary,
        }}
        {...props}
      />
      {hint && (
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            color: C.muted,
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
