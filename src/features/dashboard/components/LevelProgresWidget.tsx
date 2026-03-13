"use client";
import React from "react";
import { Card, CardContent } from "@/src/components/ui/Card";

const LevelProgressWidget = () => {
  const currentLevel = 7;
  const currentTitle = "Iron Warrior";
  const nextLevel = 8;
  const nextTitle = "Steel Lord";
  const currentXp = 340;
  const targetXp = 600;

  // Kalkulasi otomatis
  const xpLeft = targetXp - currentXp;
  const percentage = Math.floor((currentXp / targetXp) * 100);

  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
            Level Progress
          </span>
          <div className="flex-1 h-px bg-border ml-4"></div>
        </div>

        {/* --- LEVEL INFO (Kiri Angka, Kanan Title) --- */}
        <div className="flex items-end gap-4 mb-8">
          {/* Angka Level (Gede & Miring) */}
          <h1 className="text-broken-white font-black text-7xl italic leading-none tracking-tighter drop-shadow-md">
            {currentLevel}
          </h1>

          {/* Title & Next Level */}
          <div className="flex flex-col pb-1.5 gap-1.5">
            <span className="text-primary font-mono text-[13px] font-bold tracking-[0.15em] uppercase leading-none">
              {currentTitle}
            </span>
            <span className="text-muted font-mono text-[10px] tracking-[0.15em] uppercase flex items-center gap-1 leading-none">
              &rarr; LV.{nextLevel} {nextTitle}
            </span>
          </div>
        </div>

        {/* --- PROGRESS BAR SECTION --- */}
        <div className="w-full flex flex-col gap-2.5">
          {/* Text: XP & Persentase */}
          <div className="flex justify-between items-end w-full">
            <span className="text-muted font-mono text-[10px] tracking-widest uppercase font-semibold">
              {currentXp} <span className="opacity-50">/ {targetXp} XP</span>
            </span>
            <span className="text-muted font-mono text-[10px] tracking-widest uppercase font-semibold">
              {percentage}%
            </span>
          </div>

          {/* Bar Wrapper (Custom Clip-path) */}
          <div
            className="h-1.5 w-full bg-[#111] overflow-hidden"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
            }}
          >
            {/* Bar Fill */}
            <div
              className="h-full bg-primary shadow-[0_0_10px_rgba(255,77,0,0.5)] transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Footer Text */}
          <p className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase mt-2 font-medium opacity-80">
            {xpLeft} XP lagi untuk naik level
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelProgressWidget;
