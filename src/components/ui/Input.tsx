"use client";
import React, { useState, forwardRef, useId } from "react";
import { C } from "./Theme";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      success,
      prefixNode,
      suffixNode,
      type = "text",
      placeholder,
      disabled = false,
      required = false,
      value,
      onChange,
      onBlur, // Extract onBlur from props (coming from register)
      onFocus, // Extract onFocus from props
      id,
      ...props
    },
    ref // Receive the ref from react-hook-form
  ) => {
    const [focused, setFocused] = useState(false);
    
    // useId is safer than Math.random() to prevent hydration errors
    const generatedId = useId();
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-") || generatedId;

    const borderColor = error
      ? C.danger
      : success
        ? C.success
        : focused
          ? C.primary
          : C.border;
          
    const shadowColor = focused
      ? error
        ? "rgba(239,68,68,0.12)"
        : "rgba(255,77,0,0.1)"
      : "transparent";

    // Merge local state update with the prop event handler
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      if (onFocus) onFocus(e);
    };

    // Merge local state update with the prop event handler
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      if (onBlur) onBlur(e);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 600,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: error ? C.danger : focused ? C.primary : C.muted,
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {label}
            {required && (
              <span style={{ color: C.primary, fontFamily: "'Space Mono',monospace" }}>
                *
              </span>
            )}
          </label>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: disabled ? "#0f0f0f" : C.elevated,
            border: `1px solid ${borderColor}`,
            boxShadow: `0 0 0 3px ${shadowColor}`,
            clipPath:
              "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
            transition: "border-color 0.2s, box-shadow 0.2s",
            opacity: disabled ? 0.45 : 1,
          }}
        >
          {prefixNode && (
            <span
              style={{
                padding: "0 12px",
                fontFamily: "'Space Mono',monospace",
                fontSize: 13,
                color: C.muted,
                borderRight: `1px solid ${C.border}`,
                height: "100%",
                display: "flex",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              {prefixNode}
            </span>
          )}
          <input
            id={inputId}
            ref={ref} // Attach the ref here
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onFocus={handleFocus} // Use the merged handler
            onBlur={handleBlur}   // Use the merged handler
            style={{
              flex: 1,
              padding: "11px 14px",
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 14,
              color: C.text,
              caretColor: C.primary,
            }}
            {...props} // Spread the rest of the props (name, min, max, etc.)
          />
          {suffixNode && (
            <span
              style={{
                padding: "0 12px",
                fontFamily: "'Space Mono',monospace",
                fontSize: 12,
                color: C.muted,
                borderLeft: `1px solid ${C.border}`,
                height: "100%",
                display: "flex",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              {suffixNode}
            </span>
          )}
          {(error || success) && (
            <span
              style={{
                paddingRight: 12,
                fontSize: 15,
                color: error ? C.danger : C.success,
              }}
            >
              {error ? "✕" : "✓"}
            </span>
          )}
        </div>

        {(hint || error || success) && (
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11,
              lineHeight: 1.5,
              color: error ? C.danger : success ? C.success : C.muted,
              paddingLeft: 2,
            }}
          >
            {error || success || hint}
          </p>
        )}
      </div>
    );
  }
);

// Required when using forwardRef
Input.displayName = "Input";