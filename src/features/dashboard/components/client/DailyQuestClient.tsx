"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import Link from "next/link";

// Definisikan tipe data props yang dilempar dari Server
export type MappedQuest = {
  id: number;
  title: string;
  icon: string;
  iconBg: string;
  status: string;
  progress: number;
  max: number;
  barVariant: "green" | "orange" | "blue";
  isMuted: boolean;
};

interface Props {
  quests: MappedQuest[];
}

const DailyQuestClient = ({ quests }: Props) => {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");

  // Hitung berapa quest yang udah kelar
  const completedCount = quests.filter(
    (q) => q.status === "DONE" || q.status === "CLAIMED",
  ).length;

  // Efek Countdown Timer sampai jam 00:00 (Reset harian)
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setUTCHours(24, 0, 0, 0); // Set ke jam 7 malam nanti

      const diff = midnight.getTime() - now.getTime();

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const m = Math.floor((diff / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0");
      const s = Math.floor((diff / 1000) % 60)
        .toString()
        .padStart(2, "0");

      setTimeLeft(`${h}:${m}:${s}`);
    };

    updateTimer(); // Panggil sekali biar gak nunggu 1 detik
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

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
                {timeLeft}
              </span>
            </span>
          </div>
          <BadgePill color="primary">
            {completedCount} / {quests.length} DONE
          </BadgePill>
        </div>

        {/* --- QUEST LIST --- */}
        <div className="flex flex-col">
          {quests.length === 0 && (
            <p className="text-center text-muted text-sm py-4">
              Belum ada quest hari ini.
            </p>
          )}

          {quests.map((quest, index) => (
            <div
              key={quest.id}
              className={`py-5 flex flex-col gap-4 ${
                index !== 0 ? "border-t border-border/60" : "pt-0"
              }`}
            >
              {/* Info Quest */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div
                    className={`w-10 h-10 flex items-center justify-center border ${quest.iconBg} text-xl`}
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                    }}
                  >
                    {quest.icon}
                  </div>
                  <span
                    className={`font-bold text-[15px] tracking-wide ${
                      quest.isMuted ? "text-muted" : "text-broken-white"
                    }`}
                  >
                    {quest.title}
                  </span>
                </div>

                {/* Status Kanan */}
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

export default DailyQuestClient;
