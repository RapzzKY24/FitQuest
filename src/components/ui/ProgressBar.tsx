"use client";
import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
  variant?: "orange" | "yellow" | "blue";
  type?: "linear" | "segmented";
  segments?: number; // Jumlah kotak untuk tipe segmented
  className?: string;
}

export function ProgressBar({
  value,
  max,
  variant = "orange",
  type = "linear",
  segments = 3,
  className = "",
}: ProgressBarProps) {
  // Mapping warna untuk bagian yang terisi (Glow effect)
  const variants = {
    orange: "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]",
    yellow: "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]",
    blue: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
  };

  // Hitung persentase untuk tipe linear
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      {type === "linear" ? (
        /* --- TIPE LINEAR (Garis Utuh) --- */
        <div className="h-1 w-full bg-white/10 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${variants[variant]}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      ) : (
        /* --- TIPE SEGMENTED (Kotak-kotak) --- */
        <div className="flex gap-1.5 h-1">
          {Array.from({ length: segments }).map((_, i) => {
            // Segmen aktif jika index-nya kurang dari nilai 'value'
            const isActive = i < value;
            return (
              <div
                key={i}
                className={`flex-1 transition-all duration-300 ${
                  isActive ? variants[variant] : "bg-white/10"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
