"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { C } from "./Theme";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
}

export function Select({
  label,
  options = [],
  placeholder = "Select...",
  value,
  onChange,
  hint,
  required,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  // 2. STATE UNTUK POSISI
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 3. FUNGSI UNTUK MENGITUNG POSISI SEBELUM BUKA
  const handleToggle = () => {
    if (ref.current && !open) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen(!open);
  };

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative",
      }}
    >
      {label && (
        <label
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 600,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: open ? C.primary : C.muted,
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

      <div
        onClick={handleToggle} // PAKAI handleToggle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 14px",
          cursor: "pointer",
          background: C.elevated,
          border: `1px solid ${open ? C.primary : C.border}`,
          boxShadow: open ? "0 0 0 3px rgba(255,77,0,0.1)" : "none",
          clipPath:
            "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
          transition: "border-color 0.2s, box-shadow 0.2s",
          userSelect: "none",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            color: selected ? C.text : C.muted,
          }}
        >
          {selected?.icon && (
            <span style={{ fontSize: 16 }}>{selected.icon}</span>
          )}
          {selected?.label || placeholder}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 10,
            color: C.muted,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        >
          ▼
        </span>
      </div>

      {/* 4. GUNAKAN PORTAL UNTUK MENU */}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="anim-fade-up"
            style={{
              position: "absolute",
              top: coords.top + 6, // Pakai koordinat top
              left: coords.left, // Pakai koordinat left
              width: coords.width, // Pakai lebar yang sama
              zIndex: 9999, // Super tinggi biar nembus Card
              background: C.surface,
              border: `1px solid ${C.primary}`,
              clipPath:
                "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
              overflow: "hidden",
              maxHeight: 220,
              overflowY: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)", // Tambahin shadow biar melayang
            }}
          >
            {options.map((opt, i) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 14px",
                  cursor: "pointer",
                  background:
                    value === opt.value ? "rgba(255,77,0,0.1)" : "transparent",
                  borderLeft:
                    value === opt.value
                      ? `2px solid ${C.primary}`
                      : "2px solid transparent",
                  transition: "background 0.15s",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 14,
                  color: value === opt.value ? C.text : C.muted,
                  borderBottom:
                    i < options.length - 1 ? `1px solid ${C.border}` : "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    value === opt.value ? "rgba(255,77,0,0.1)" : "transparent")
                }
              >
                {opt.icon && <span style={{ fontSize: 16 }}>{opt.icon}</span>}
                <span style={{ flex: 1 }}>{opt.label}</span>
                {value === opt.value && (
                  <span style={{ color: C.primary, fontSize: 12 }}>✓</span>
                )}
              </div>
            ))}
          </div>,
          document.body, // LEMPAR KE BODY
        )}

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
