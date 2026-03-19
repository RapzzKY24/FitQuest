"use client";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { TargetIcon } from "lucide-react";

interface Quest {
  id: number;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  target_type: string;
  target_value: number;
}

interface ExpBreakdownProps {
  todaySessions: number;
  activeQuests: Quest[];
}

const ExpBreakdown = ({ todaySessions, activeQuests }: ExpBreakdownProps) => {
  const totalSesi = 3;
  const safeSelesai = todaySessions > totalSesi ? totalSesi : todaySessions;

  return (
    <Card className="h-fit overflow-hidden w-full ">
      <CardContent className="flex flex-col gap-y-7">
        {/* 1. PROGRESS SESI HARI INI */}
        <div className="bg-white/3 border border-white/5 p-4 space-y-4 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
              Sesi Hari Ini
            </span>
            <span className="text-sm font-bold tabular-nums">
              {safeSelesai} <span className="text-white/10">/ 3</span>
            </span>
          </div>

          <ProgressBar
            value={safeSelesai}
            max={3}
            segments={3}
            type="segmented"
            variant="orange"
          />
        </div>

        {/* 2. DAILY QUESTS  */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <TargetIcon size={14} className="text-primary" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">
              Quest Aktif
            </span>
          </div>

          <div className="flex flex-col gap-y-2">
            {activeQuests.map((quest) => {
              const isCompleted = todaySessions >= quest.target_value;

              return (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between p-3 border transition-all ${
                    isCompleted
                      ? "bg-primary/5 border-primary/20"
                      : "bg-white/2 border-white/5 opacity-60"
                  }`}
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{quest.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white">
                        {quest.title}
                      </span>
                      <span className="text-[9px] text-primary/80 font-mono">
                        +{quest.xp_reward} XP
                      </span>
                    </div>
                  </div>

                  {isCompleted ? (
                    <BadgePill color="success">CLAIMED</BadgePill>
                  ) : (
                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">
                      {todaySessions}/{quest.target_value}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpBreakdown;
