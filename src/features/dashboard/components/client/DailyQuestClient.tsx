"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import Link from "next/link";

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

  const completedCount = quests.filter(
    (q) => q.status === "DONE" || q.status === "CLAIMED",
  ).length;

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setUTCHours(24, 0, 0, 0);

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

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] font-bold uppercase">
            Daily Quest
          </span>
          <div className="flex-1 h-px bg-border mx-2 md:mx-4"></div>
          <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] font-semibold uppercase cursor-pointer hover:text-broken-white transition-colors">
            <Link href={"/quest"}>Semua Quest &rarr;</Link>
          </span>
        </div>

        <div className="bg-[#1a1a1a] border border-border p-3 md:p-3.5 px-3 md:px-5 flex justify-between items-center mb-6 md:mb-8 clip-path-sm">
          <div className="flex items-center gap-2 md:gap-3 text-muted text-xs md:text-sm tracking-wide">
            <span className="text-base md:text-lg">⏱️</span>
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

        <div className="flex flex-col">
          {quests.length === 0 && (
            <p className="text-center text-muted text-xs md:text-sm py-4">
              Belum ada quest hari ini.
            </p>
          )}

          {quests.map((quest, index) => (
            <div
              key={quest.id}
              className={`py-4 md:py-5 flex flex-col gap-3 md:gap-4 ${
                index !== 0 ? "border-t border-border/60" : "pt-0"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 md:gap-5 min-w-0 pr-2">
                  <div
                    className={`shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border ${quest.iconBg} text-lg md:text-xl`}
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                    }}
                  >
                    {quest.icon}
                  </div>
                  <span
                    className={`font-bold text-sm md:text-[15px] tracking-wide truncate ${
                      quest.isMuted ? "text-muted" : "text-broken-white"
                    }`}
                  >
                    {quest.title}
                  </span>
                </div>

                <div className="shrink-0">
                  {quest.status === "DONE" && (
                    <BadgePill color="success">DONE</BadgePill>
                  )}
                  {quest.status === "CLAIMED" && (
                    <BadgePill color="muted">CLAIMED</BadgePill>
                  )}
                  {quest.status !== "DONE" && quest.status !== "CLAIMED" && (
                    <span className="text-muted text-[10px] md:text-xs font-mono font-bold tracking-widest">
                      {quest.status}
                    </span>
                  )}
                </div>
              </div>

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
