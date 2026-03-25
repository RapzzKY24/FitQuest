"use client";
import React from "react";
import { C } from "./Theme";

export interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  showValue?: boolean;
  unit?: string;
  variant?: "default" | "intensity" | "xp";
  hint?: string;
}

const sliderCSS = `
  .fq-slider { -webkit-appearance:none; appearance:none; width:100%; height:6px; background:transparent; outline:none; cursor:pointer; }
  .fq-slider::-webkit-slider-runnable-track { height:6px; background:var(--slider-track,#272727); clip-path:polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px)); }
  .fq-slider::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; margin-top:-7px; background:var(--primary); cursor:pointer; clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px)); transition:transform 0.15s; }
  .fq-slider::-webkit-slider-thumb:hover { transform:scale(1.2); }
`;

export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange,
  showValue = true,
  unit = "",
  variant = "default",
  hint,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  const trackGradient = {
    default: `linear-gradient(90deg, ${C.primary} ${pct}%, ${C.border} ${pct}%)`,
    intensity:
      pct < 34
        ? `linear-gradient(90deg, ${C.info} ${pct}%, ${C.border} ${pct}%)`
        : pct < 67
          ? `linear-gradient(90deg, ${C.accent} ${pct}%, ${C.border} ${pct}%)`
          : `linear-gradient(90deg, ${C.primary} ${pct}%, ${C.border} ${pct}%)`,
    xp: `linear-gradient(90deg, ${C.accent} ${pct}%, ${C.border} ${pct}%)`,
  };

  const intensityLabel =
    pct < 34
      ? { text: "LIGHT", color: C.info }
      : pct < 67
        ? { text: "MODERATE", color: C.accent }
        : { text: "INTENSE", color: C.primary };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <label
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 600,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: C.muted,
            }}
          >
            {label}
          </label>
          {showValue && (
            <span
              className="f-mono"
              style={{
                fontSize: 14,
                fontWeight: 700,
                color:
                  variant === "intensity"
                    ? intensityLabel.color
                    : variant === "xp"
                      ? C.accent
                      : C.primary,
              }}
            >
              {variant === "intensity"
                ? intensityLabel.text
                : `${value}${unit}`}
            </span>
          )}
        </div>
      )}
      <div style={{ position: "relative", padding: "4px 0" }}>
        <style>{sliderCSS}</style>
        <input
          type="range"
          className="fq-slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={
            {
              "--slider-track": trackGradient[variant] || trackGradient.default,
            } as React.CSSProperties
          }
        />
        {variant === "intensity" && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            {["Light", "Moderate", "Intense"].map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 9,
                  color: C.muted,
                  letterSpacing: 1,
                }}
              >
                {t.toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>
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
