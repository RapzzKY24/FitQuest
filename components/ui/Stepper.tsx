"use client";
import React from "react";
import { C } from "./Theme";

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number; // Dimulai dari 0
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Line Background */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          height: 2,
          background: C.elevated,
          zIndex: 0,
        }}
      />

      {/* Active Line Fill */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          height: 2,
          background: C.primary,
          zIndex: 0,
          width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 32px)`,
          transition: "width 0.4s ease-in-out",
          boxShadow: `0 0 8px ${C.primary}`,
        }}
      />

      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;

        const bgColor = isCompleted
          ? C.primary
          : isActive
            ? C.surface
            : C.elevated;
        const borderColor = isCompleted || isActive ? C.primary : C.border;
        const textColor = isCompleted || isActive ? C.text : C.muted;

        return (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              zIndex: 1,
              width: "100%",
              flex: 1,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: bgColor,
                border: `2px solid ${borderColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
                boxShadow: isActive ? `0 0 12px ${C.primary}60` : "none",
              }}
            >
              {isCompleted ? (
                <span
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  ✓
                </span>
              ) : (
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: isActive ? C.primary : C.muted,
                  }}
                >
                  {idx + 1}
                </span>
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: textColor,
                }}
              >
                {step.label}
              </p>
              {step.description && (
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 10,
                    color: C.muted,
                    marginTop: 2,
                  }}
                >
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
