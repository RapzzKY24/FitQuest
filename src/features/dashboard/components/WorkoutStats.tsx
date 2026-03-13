"use client";
import React from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill";
import Link from "next/link";

const mockWorkouts = [
  {
    id: 1,
    title: "Lari Pagi",
    icon: "🏃",
    subtitle: "Sedang · 45 mnt · Hari ini 06:30",
    xp: "+90 XP",
  },
  {
    id: 2,
    title: "Gym — Upper Body",
    icon: "🏋️",
    subtitle: "Intens · 60 mnt · Kemarin 18:00",
    xp: "+156 XP",
  },
  {
    id: 3,
    title: "Bersepeda Sore",
    icon: "🚴",
    subtitle: "Ringan · 30 mnt · 2 hari lalu",
    xp: "+48 XP",
  },
];

const WorkoutStats = () => {
  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-6 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
            Workout Terakhir
          </span>
          <div className="flex-1 h-px bg-border mx-4"></div>
          <span className="text-muted tracking-[0.2em] text-[11px] font-semibold uppercase cursor-pointer hover:text-broken-white transition-colors">
            <Link href={"/log"}>Lihat Semua &rarr;</Link>
          </span>
        </div>

        {/* --- LIST WORKOUT --- */}
        <div className="flex flex-col">
          {mockWorkouts.map((workout, index) => (
            <div
              key={workout.id}
              className={`py-4 flex items-center justify-between ${
                index !== mockWorkouts.length - 1
                  ? "border-b border-border/60"
                  : "pt-4 pb-0"
              }`}
            >
              {/* Info Kiri (Icon + Teks) */}
              <div className="flex items-center gap-4">
                {/* Icon Box */}
                <div
                  className="w-12 h-12 flex items-center justify-center bg-elevated/50 border border-border text-2xl shadow-inner"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                  }}
                >
                  {workout.icon}
                </div>

                {/* Text Stack */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-broken-white font-bold text-[15px] tracking-wide">
                    {workout.title}
                  </h3>
                  <p className="text-muted text-[12px] font-medium tracking-wide">
                    {workout.subtitle}
                  </p>
                </div>
              </div>

              {/* XP Badge Kanan */}
              <BadgePill color="primary">{workout.xp}</BadgePill>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutStats;
