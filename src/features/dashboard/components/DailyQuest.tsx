"use client";
import React from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import Link from "next/link";

const mockQuests = [
  {
    id: 1,
    title: "30 Menit Non-Stop",
    icon: "💧",
    iconBg: "bg-green-500/10 border-green-500/20",
    status: "DONE",
    progress: 1,
    max: 1,
    barVariant: "green",
    isMuted: false,
  },
  {
    id: 2,
    title: "First Log Today",
    icon: "⚡",
    iconBg: "bg-green-500/10 border-green-500/20",
    status: "CLAIMED",
    progress: 1,
    max: 1,
    barVariant: "green",
    isMuted: false,
  },
  {
    id: 3,
    title: "Lari 3x Minggu Ini",
    icon: "🏃",
    iconBg: "bg-orange-500/10 border-orange-500/20",
    status: "1/3",
    progress: 1,
    max: 3,
    barVariant: "orange",
    isMuted: false,
  },
  {
    id: 4,
    title: "Streak Terjaga",
    icon: "🔥",
    iconBg: "bg-white/5 border-white/10",
    status: "0/1",
    progress: 0,
    max: 1,
    barVariant: "orange",
    isMuted: true,
  },
] as const;

const DailyQuest = () => {
  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-6 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
            Daily Quest
          </span>
          <div className="flex-1 h-px bg-border mx-4"></div>
          <span className="text-muted tracking-[0.2em] text-[11px] font-semibold uppercase cursor-pointer hover:text-broken-white transition-colors">
            <Link href={"/quest"}>Semua Quest &rarr;</Link>
          </span>
        </div>

        {/* --- TIMER BANNER --- */}
        <div className="bg-[#1a1a1a] border border-border p-3.5 px-5 flex justify-between items-center mb-8 clip-path-sm">
          <div className="flex items-center gap-3 text-muted text-sm tracking-wide">
            <span>⏱️</span>
            <span>
              Reset dalam{" "}
              <span className="text-broken-white font-mono font-bold tracking-widest ml-1">
                21:07:06
              </span>
            </span>
          </div>
          <BadgePill color="primary">2 / 4 DONE</BadgePill>
        </div>

        {/* --- QUEST LIST --- */}
        <div className="flex flex-col">
          {mockQuests.map((quest, index) => (
            <div
              key={quest.id}
              className={`py-5 flex flex-col gap-4 ${
                index !== 0 ? "border-t border-border/60" : "pt-0"
              }`}
            >
              {/* Info Quest */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  {/* Icon Box */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center border ${quest.iconBg} text-xl`}
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                    }}
                  >
                    {quest.icon}
                  </div>
                  {/* Judul Quest */}
                  <span
                    className={`font-bold text-[15px] tracking-wide ${
                      quest.isMuted ? "text-muted" : "text-broken-white"
                    }`}
                  >
                    {quest.title}
                  </span>
                </div>

                {/* Status Kanan (Badge atau Teks) */}
                <div>
                  {quest.status === "DONE" && (
                    <BadgePill color="success">DONE</BadgePill>
                  )}
                  {quest.status === "CLAIMED" && (
                    <BadgePill color="muted">CLAIMED</BadgePill>
                  )}
                  {quest.status !== "DONE" && quest.status !== "CLAIMED" && (
                    <span className="text-muted text-xs font-mono font-bold tracking-widest">
                      {quest.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <ProgressBar
                value={quest.progress}
                max={quest.max}
                variant={quest.barVariant}
                className="mt-1"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyQuest;
