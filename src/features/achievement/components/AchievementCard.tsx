"use client";
import React from "react";
import { Check, Lock } from "lucide-react";
import { BadgePill } from "@/src/components/ui/badge-pill";
import { Card } from "@/src/components/ui/Card";

export type AchievementRarity = "legendary" | "epic" | "rare" | "common";
export type AchievementStatus = "unlocked" | "locked" | "in-progress";
type BadgePillColor =
  | "primary"
  | "accent"
  | "success"
  | "muted"
  | "info"
  | "purple";

export interface Achievement {
  id: number;
  title: string;
  desc: string;
  rarity: AchievementRarity;
  icon: React.ReactNode;
  status: AchievementStatus;
  progress?: number;
  max?: number;
  unlockedAt?: string;
}

interface RarityStyle {
  border: string;
  bg: string;
  progress: string;
  pill: BadgePillColor;
}

const rarityConfig: Record<AchievementRarity, RarityStyle> = {
  legendary: {
    border: "border-primary",
    bg: "bg-primary/10",
    progress: "bg-primary",
    pill: "accent",
  },
  epic: {
    border: "border-purple-500/40",
    bg: "bg-purple-500/10",
    progress: "bg-purple-500",
    pill: "purple",
  },
  rare: {
    border: "border-info",
    bg: "bg-info/10",
    progress: "bg-info",
    pill: "info",
  },
  common: {
    border: "border-muted",
    bg: "bg-muted/10",
    progress: "bg-muted",
    pill: "muted",
  },
};

export const AchievementCard = ({
  achievement,
}: {
  achievement: Achievement;
}) => {
  const config = rarityConfig[achievement.rarity];
  const isLocked = achievement.status === "locked";
  const percentage =
    achievement.progress && achievement.max
      ? Math.round((achievement.progress / achievement.max) * 100)
      : 0;

  return (
    <Card
      variant="achievement"
      className={`
        min-h-[280px] p-6 flex flex-col items-center justify-between
        ${config.bg} 
        ${!isLocked ? `!${config.border} hover:border-broken-white/40` : "grayscale opacity-50"}
      `}
    >
      {/* Bagian Atas: Badge, Icon, Title */}
      <div className="flex flex-col items-center gap-y-4">
        <BadgePill
          color={config.pill}
          className="scale-90 group-hover:text-white"
        >
          {achievement.rarity}
        </BadgePill>

        <div className="w-14 h-20 bg-black/40 rounded flex items-center justify-center text-4xl border border-white/5 group-hover:scale-110 transition-transform">
          {achievement.icon}
        </div>

        <div className="text-center">
          <h3 className="text-white font-bold tracking-widest uppercase text-[13px] mb-1">
            {achievement.title}
          </h3>
          <p className="text-zinc-500 text-[10px] font-light leading-relaxed px-2">
            {achievement.desc}
          </p>
        </div>
      </div>

      {/* Bagian Bawah: Progress/Status */}
      <div className="w-full mt-6">
        {achievement.status === "in-progress" ? (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase">
              <span>
                {achievement.progress} / {achievement.max}
              </span>
              <span>{percentage}%</span>
            </div>
            <div className="h-1 w-full bg-white/5">
              <div
                className={`h-full transition-all duration-1000 ${config.progress}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1.5 py-1">
            {achievement.status === "unlocked" ? (
              <>
                <Check size={12} className="text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Unlocked
                </span>
              </>
            ) : (
              <>
                <Lock size={12} className="text-zinc-600" />
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                  Locked
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
