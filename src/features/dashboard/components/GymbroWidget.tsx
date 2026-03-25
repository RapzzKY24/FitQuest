"use client";
import { BadgePill } from "@/src/components/ui/badge-pill";
import React from "react";

const GymbroWidget = () => {
  const progress = 47;
  const stage = 2;
  const sessionsLeft = 53;

  return (
    <BadgePill
      color="muted"
      className="p-6 md:p-8 flex flex-col items-center min-w-[260px] w-full relative"
    >
      {/* --- HEADER --- */}
      <h2 className="text-primary font-mono text-[11px] font-bold tracking-[0.3em] uppercase mb-4 w-full text-center">
        {"//"} GYMBRO
      </h2>

      {/* --- EMOJI / AVATAR --- */}
      <div className="text-6xl mb-3 drop-shadow-[0_0_15px_rgba(255,200,0,0.15)]">
        💪
      </div>

      {/* --- TITLE & SUBTITLE --- */}
      <h1 className="font-black text-2xl text-broken-white mb-1 text-center leading-none">
        Fighter — Stage {stage}
      </h1>
      <p className="text-muted font-mono text-xxs tracking-[0.15em] uppercase mb-8 text-center">
        {sessionsLeft} sesi lagi ke Stage {stage + 1}
      </p>

      {/* --- PROGRESS BAR SECTION --- */}
      <div className="w-full flex flex-col gap-2 mt-auto">
        {/* Label & Percentage */}
        <div className="flex justify-between items-end w-full">
          <span className="text-muted font-mono text-[9px] tracking-[0.2em] uppercase font-bold">
            Stage Progress
          </span>
          <span className="text-primary font-bold text-xxs">{progress}%</span>
        </div>

        {/* Bar */}
        <div
          className="h-1.5 w-full bg-black/40 overflow-hidden"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))",
          }}
        >
          <div
            className="h-full bg-primary shadow-[0_0_10px_rgba(255,77,0,0.5)] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </BadgePill>
  );
};

export default GymbroWidget;
