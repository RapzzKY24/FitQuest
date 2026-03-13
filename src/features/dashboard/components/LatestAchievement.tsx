"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/Card";
import { BadgePill } from "@/src/components/ui/badge-pill"; // Sesuaikan path

const mockAchievements = [
  {
    id: 1,
    title: "Iron Will",
    icon: "💎",
    subtitle: "Streak 7 hari · 2 hari lalu",
    badgeText: "EPIC",
    badgeColor: "purple", // Pakai warna neon ungu yang lu buat
    iconBg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    id: 2,
    title: "Early Bird",
    icon: "🌅",
    subtitle: "10x pagi hari · 4 hari lalu",
    badgeText: "RARE",
    badgeColor: "blue", // Pakai warna neon biru
    iconBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: 3,
    title: "On Fire",
    icon: "☀️",
    subtitle: "Streak 3 hari · 1 minggu lalu",
    badgeText: "COMMON",
    badgeColor: "muted", // Pakai abu-abu
    iconBg: "bg-elevated border-border",
  },
] as const;

const LatestAchievements = () => {
  return (
    <Card className="w-full bg-surface border-border" variant="default">
      <CardContent className="p-6 md:p-8">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-muted tracking-[0.2em] text-[11px] font-bold uppercase">
            Achievement Terbaru
          </span>
          <div className="flex-1 h-px bg-border mx-4"></div>
          <Link
            href="/achievement"
            className="text-muted tracking-[0.2em] text-[11px] font-semibold uppercase hover:text-broken-white transition-colors"
          >
            Lihat Semua &rarr;
          </Link>
        </div>

        {/* --- LIST ACHIEVEMENT --- */}
        <div className="flex flex-col">
          {mockAchievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`py-4 flex items-center justify-between ${
                index !== mockAchievements.length - 1
                  ? "border-b border-border/60"
                  : "pt-4 pb-0"
              }`}
            >
              {/* Info Kiri (Icon + Teks) */}
              <div className="flex items-center gap-4">
                {/* Icon Box */}
                <div
                  className={`w-12 h-12 flex items-center justify-center border text-2xl shadow-inner ${achievement.iconBg}`}
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                  }}
                >
                  {achievement.icon}
                </div>

                {/* Text Stack */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-broken-white font-bold text-[15px] tracking-wide leading-none">
                    {achievement.title}
                  </h3>
                  {/* Pake font-mono biar persis kayak teks deskripsi di desain lu */}
                  <p className="text-muted font-mono text-[10px] tracking-wider uppercase leading-none mt-1">
                    {achievement.subtitle}
                  </p>
                </div>
              </div>

              {/* Rarity Badge Kanan */}
              <BadgePill color={achievement.badgeColor}>
                {achievement.badgeText}
              </BadgePill>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestAchievements;
