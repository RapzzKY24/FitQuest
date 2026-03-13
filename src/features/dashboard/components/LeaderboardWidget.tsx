"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/Card";

const mockTopLeaderboard = [
  { rank: 1, name: "WarriorAdi", icon: "😤", xp: "14,200 XP" },
  { rank: 2, name: "FitSari", icon: "🔥", xp: "13,450 XP" },
  { rank: 3, name: "RunnerDewa", icon: "⚡", xp: "12,890 XP" },
];

const currentUserRank = {
  rank: 7,
  name: "Budi (You)",
  icon: "💪",
  xp: "12,450 XP",
};

const LeaderboardWidget = () => {
  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-6 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
            Leaderboard
          </span>
          <div className="flex-1 h-px bg-border mx-4"></div>
          <Link
            href="/social"
            className="text-muted tracking-[0.2em] text-[11px] font-semibold uppercase hover:text-broken-white transition-colors"
          >
            Full &rarr;
          </Link>
        </div>

        {/* --- TOP 3 LIST --- */}
        <div className="flex flex-col">
          {mockTopLeaderboard.map((user, index) => (
            <div
              key={user.rank}
              className={`py-4 flex items-center justify-between ${
                index !== mockTopLeaderboard.length - 1
                  ? "border-b border-border/60"
                  : "pb-6"
              }`}
            >
              <div className="flex items-center gap-5">
                {/* Angka Rank */}
                <span className="text-primary font-black text-lg w-4 text-center">
                  {user.rank}
                </span>

                {/* Icon Box */}
                <div
                  className="w-10 h-10 flex items-center justify-center bg-elevated/50 border border-border text-xl shadow-inner"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                  }}
                >
                  {user.icon}
                </div>

                {/* Nama */}
                <h3 className="text-broken-white font-bold text-[15px] tracking-wide">
                  {user.name}
                </h3>
              </div>

              {/* XP */}
              <span className="text-muted font-mono text-[11px] tracking-widest font-semibold uppercase">
                {user.xp}
              </span>
            </div>
          ))}
        </div>

        {/* --- DIVIDER POSISIMU --- */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-primary font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
            Posisimu
          </span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* --- HIGHLIGHT CURRENT USER --- */}
        <div
          className="mt-4 p-4 flex items-center justify-between bg-primary/5 border border-primary/20"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
          }}
        >
          <div className="flex items-center gap-5">
            {/* Angka Rank */}
            <span className="text-primary font-black text-lg w-4 text-center">
              {currentUserRank.rank}
            </span>

            {/* Icon Box (Border Primary) */}
            <div
              className="w-10 h-10 flex items-center justify-center bg-elevated/50 border border-primary text-xl shadow-inner"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              {currentUserRank.icon}
            </div>

            {/* Nama (Text Primary) */}
            <h3 className="text-primary font-bold text-[15px] tracking-wide">
              {currentUserRank.name}
            </h3>
          </div>

          {/* XP (Text Primary) */}
          <span className="text-primary font-mono text-[11px] tracking-widest font-semibold uppercase">
            {currentUserRank.xp}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardWidget;
