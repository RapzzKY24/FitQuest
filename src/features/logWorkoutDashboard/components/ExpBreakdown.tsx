"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { TargetIcon } from "lucide-react";

const ExpBreakdown = () => {
  const breakdownExpListMockData = [
    { label: "Base XP", value: "+90", color: "text-white/80" },
    { label: "Intensitas *1.0", value: "+0", color: "text-white/40" },
    {
      label: "Streak Bonus *1.5",
      value: "+45",
      color: "text-primary",
    },
  ];
  return (
    <section className="p-4 bg-[#0a0a0a] min-h-screen flex justify-center items-start">
      <Card className="w-full max-w-[350px] bg-black/60 border-none backdrop-blur-xl">
        <CardHeader className="pb-2">
          <h1 className="text-[10px] font-bold tracking-[0.5em] text-primary/70 italic">
            ESTIMASI XP
          </h1>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-7">
          {/* 1. BIG XP SECTION */}
          <div className="flex flex-col gap-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-primary tracking-tighter drop-shadow-[0_0_15px_rgba(255,77,0,0.3)]">
                +135
              </span>
              <span className="text-xl font-bold text-primary opacity-80">
                XP
              </span>
            </div>

            <BadgePill color="primary">x1.5 Streak Bonus</BadgePill>

            <div className="h-px w-full bg-white/10" />
          </div>

          {/* 2. BREAKDOWN LIST */}
          <div className="flex flex-col gap-y-4">
            {breakdownExpListMockData.map((item, index, arr) => (
              <div key={index}>
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-white/40">{item.label}</span>
                  <span className={item.color}>{item.value}</span>
                </div>
                {index !== arr.length - 1 && (
                  <div className="h-px w-full bg-white/5" />
                )}
              </div>
            ))}
          </div>

          {/* 3. LEVEL PROGRESS (Linear) */}
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-4">
              <h2 className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase whitespace-nowrap">
                Level Progress
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-white/40 tabular-nums">
                LV.7 → LV.7
              </span>
              <div className="text-right">
                <span className="text-sm font-bold text-white tabular-nums tracking-wider">
                  470
                </span>
                <span className="text-[10px] text-white/20 ml-1">/ 500</span>
              </div>
            </div>

            <ProgressBar value={470} max={500} variant="orange" type="linear" />
          </div>

          {/* 4. SESI HARI INI (Segmented) */}
          <div className="bg-white/3 border border-white/5 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
                Sesi Hari Ini
              </span>
              <span className="text-sm font-bold  tabular-nums">
                1 <span className="text-white/10">/ 3</span>
              </span>
            </div>

            <ProgressBar
              value={1}
              max={3}
              segments={3}
              type="segmented"
              variant="orange"
            />
          </div>

          {/* 5. QUEST PROGRESS (Yellow Linear) */}
          <Card
            variant="quest"
            className="bg-yellow-500/3 border-yellow-500/10 p-4 space-y-3.5 relative overflow-hidden"
          >
            {/* Header Quest */}
            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-500/10 rounded-full">
                <TargetIcon size={14} className="text-red-500" />
              </div>
              <span className="text-[9px] font-bold tracking-[0.2em] text-yellow-500/60 uppercase font-sans">
                Quest Progress
              </span>
            </div>

            {/* Content Quest */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white/90 tracking-wide font-sans">
                Lari 3x Minggu Ini
              </h3>

              <ProgressBar value={1} max={3} variant="yellow" type="linear" />

              <div className="text-[9px] text-right text-white/20 font-black tracking-widest uppercase tabular-nums">
                Progress: 1/3
              </div>
            </div>
          </Card>
        </CardContent>
      </Card>
    </section>
  );
};

export default ExpBreakdown;
