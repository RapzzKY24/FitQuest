"use client";
import React from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Dialog } from "@/src/components/ui/Dialog";
import { Button } from "@/src/components/ui/Button";
import { useLevelDetection } from "../../hooks/useLevelDetection";

interface Props {
  currentLevel: number;
  currentTitle: string;
  nextLevel: number;
  nextTitle: string;
  currentXp: number;
  targetXp: number;
  xpLeft: number;
  percentage: number;
}

const LevelProgressClient = ({
  currentLevel,
  currentTitle,
  nextLevel,
  nextTitle,
  currentXp,
  targetXp,
  xpLeft,
  percentage,
}: Props) => {
  const { showLevelUpDialog, closeLevelUpDialog } =
    useLevelDetection(currentLevel);

  return (
    <>
      {/* --- WIDGET UTAMA LU --- */}
      <Card className="w-full bg-surface border-border" variant="default">
        <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
              Level Progress
            </span>
            <div className="flex-1 h-px bg-border ml-4"></div>
          </div>

          {/* LEVEL INFO */}
          <div className="flex items-end gap-4 mb-8">
            <h1 className="text-broken-white font-black text-7xl italic leading-none drop-shadow-md">
              {currentLevel}
            </h1>
            <div className="flex flex-col pb-1.5 gap-1.5">
              <span className="text-primary font-mono text-[13px] font-bold tracking-[0.15em] uppercase leading-none">
                {currentTitle}
              </span>
              <span className="text-muted font-mono text-[10px] tracking-[0.15em] uppercase flex items-center gap-1 leading-none">
                &rarr; LV.{nextLevel} {nextTitle}
              </span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full flex flex-col gap-2.5">
            <div className="flex justify-between items-end w-full">
              <span className="text-muted font-mono text-[10px] tracking-widest uppercase font-semibold">
                {currentXp} <span className="opacity-50">/ {targetXp} XP</span>
              </span>
              <span className="text-muted font-mono text-[10px] tracking-widest uppercase font-semibold">
                {percentage}%
              </span>
            </div>
            <div
              className="h-1.5 w-full bg-[#111] overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
              }}
            >
              <div
                className="h-full bg-primary shadow-[0_0_10px_rgba(255,77,0,0.5)] transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase mt-2 font-medium opacity-80">
              {xpLeft > 0 ? `${xpLeft} XP lagi untuk naik level` : "Level Max!"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* --- DIALOG LEVEL UP (Muncul kalau state true) --- */}
      <Dialog
        open={showLevelUpDialog}
        onClose={closeLevelUpDialog}
        variant="levelup"
        size="sm"
        title="KAMU NAIK LEVEL!"
        footer={
          <Button
            variant="primary"
            className="w-full"
            onClick={closeLevelUpDialog}
          >
            LANJUTKAN PERJALANAN ⚡
          </Button>
        }
      >
        <div className="flex flex-col items-center justify-center text-center py-4 gap-4">
          <div className="text-6xl drop-shadow-[0_0_15px_rgba(255,77,0,0.8)]">
            🔥
          </div>
          <div>
            <p className="text-broken-white text-lg font-bold mb-1">
              Level {currentLevel}: {currentTitle}
            </p>
            <p className="text-muted text-sm">
              Gila! Konsistensi kamu membuahkan hasil. Tetap semangat dan kejar
              gelar <span className="text-primary font-bold">{nextTitle}</span>{" "}
              selanjutnya!
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default LevelProgressClient;
