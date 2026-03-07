"use client";
import React from "react";
import { C } from "./Theme";

export interface DayRecord {
  date: string; // e.g., "Mon", "Tue"
  day: number; // e.g., 14, 15
  status: "completed" | "missed" | "upcoming" | "today";
}

export interface CalendarProps {
  days: DayRecord[];
}

export function WeeklyCalendar({ days }: CalendarProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "space-between",
        background: C.surface,
        padding: 16,
        border: `1px solid ${C.border}`,
        clipPath:
          "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))",
      }}
    >
      {days.map((d, i) => {
        const isToday = d.status === "today";
        const isDone = d.status === "completed";
        const isMissed = d.status === "missed";

        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                color: isToday ? C.primary : C.muted,
                textTransform: "uppercase",
              }}
            >
              {d.date}
            </span>
            <div
              style={{
                width: 36,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isDone
                  ? "rgba(34,197,94,0.1)"
                  : isMissed
                    ? "rgba(239,68,68,0.1)"
                    : isToday
                      ? "rgba(255,77,0,0.1)"
                      : C.elevated,
                border: `1px solid ${isDone ? C.success : isMissed ? C.danger : isToday ? C.primary : C.border}`,
                clipPath:
                  "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: isToday ? C.primary : C.text,
                }}
              >
                {d.day}
              </span>

              {/* Status Indicator Dot/Icon */}
              {isDone && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -4,
                    right: -4,
                    background: C.success,
                    borderRadius: "50%",
                    width: 14,
                    height: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    color: "white",
                  }}
                >
                  ✓
                </div>
              )}
              {isMissed && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -4,
                    right: -4,
                    background: C.danger,
                    borderRadius: "50%",
                    width: 14,
                    height: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    color: "white",
                  }}
                >
                  ✕
                </div>
              )}
              {isToday && (
                <div
                  style={{
                    position: "absolute",
                    top: -4,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: C.primary,
                    boxShadow: `0 0 6px ${C.primary}`,
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
