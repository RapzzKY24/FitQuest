"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { ProgressBar } from "@/src/components/ui/ProgressBar";

type DailyStat = { day: string; value: number; isToday: boolean };
type WeeklyData = { xp: DailyStat[]; menit: DailyStat[] };
type WeeklyTotals = { sessions: number; minutes: number; xp: number };

interface Props {
  weeklyData: WeeklyData;
  totals: WeeklyTotals;
}

const WeeklyActivityClient = ({ weeklyData, totals }: Props) => {
  const [activeTab, setActiveTab] = useState<"xp" | "menit">("xp");
  const currentData = weeklyData[activeTab];

  const maxValue = Math.max(...currentData.map((d) => d.value), 1);

  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] font-bold uppercase">
            Aktivitas Minggu Ini
          </span>

          <div className="flex gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab("xp")}
              className={`font-mono text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${
                activeTab === "xp"
                  ? "text-primary"
                  : "text-muted hover:text-broken-white"
              }`}
            >
              XP
            </button>
            <button
              onClick={() => setActiveTab("menit")}
              className={`font-mono text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${
                activeTab === "menit"
                  ? "text-info"
                  : "text-muted hover:text-broken-white"
              }`}
            >
              Menit
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end gap-1 sm:gap-2 w-full mb-6 md:mb-8">
          {currentData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col flex-1 items-center gap-1 md:gap-2"
            >
              <span
                className={`font-mono text-[8px] md:text-[9px] font-bold h-3 ${
                  activeTab === "xp" ? "text-primary" : "text-info"
                }`}
              >
                {item.value > 0 ? item.value : ""}
              </span>

              <ProgressBar
                value={item.value}
                max={maxValue}
                variant={activeTab === "xp" ? "orange" : "blue"}
                className="w-full"
              />

              <span
                className={`font-mono text-[8px] md:text-[10px] tracking-wider mt-1 font-bold ${
                  item.isToday ? "text-broken-white" : "text-muted"
                }`}
              >
                {item.day}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 border-t border-border/60 pt-4 md:pt-6">
          <div className="flex flex-col items-center justify-center border-r border-border/60">
            <h2 className="text-broken-white font-black text-2xl sm:text-3xl md:text-4xl mb-0.5 md:mb-1 drop-shadow-sm">
              {totals.sessions.toLocaleString("id-ID")}
            </h2>
            <p className="text-muted font-mono text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase">
              Sesi
            </p>
          </div>

          <div className="flex flex-col items-center justify-center border-r border-border/60">
            <h2 className="font-black text-2xl sm:text-3xl md:text-4xl mb-0.5 md:mb-1 drop-shadow-sm text-info">
              {totals.minutes.toLocaleString("id-ID")}
            </h2>
            <p className="text-muted font-mono text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase">
              Menit
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-primary font-black text-2xl sm:text-3xl md:text-4xl mb-0.5 md:mb-1 drop-shadow-sm">
              +{totals.xp.toLocaleString("id-ID")}
            </h2>
            <p className="text-muted font-mono text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase">
              XP
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyActivityClient;
